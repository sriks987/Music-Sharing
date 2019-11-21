from pymongo import MongoClient
import json
import re
import os
from flask import Flask, request, Response, session, abort, send_from_directory, url_for
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

client = MongoClient()
db = client['music_db']

# SONGS_UPLOAD_FOLDER = './songs'
# SONG_IMAGES_UPLOAD_FOLDER = './song_images'
# USER_IMAGES_UPLOAD_FOLDER = './user_images'

# app.config['SONGS_UPLOAD_FOLDER'] = SONGS_UPLOAD_FOLDER
# app.config['SONG_IMAGES_UPLOAD_FOLDER'] = SONG_IMAGES_UPLOAD_FOLDER
# app.config['USER_IMAGES_UPLOAD_FOLDER'] = USER_IMAGES_UPLOAD_FOLDER

UPLOAD_FOLDER = '../../uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

maxSong = db.songs.find().sort([("songID", -1)]).limit(1)
if maxSong!=None:
    maxSongID = list(maxSong)[0]["songID"]

maxUser = db.users.find().sort([("userID", -1)]).limit(1)
if maxUser!=None:
    maxUserID = list(maxUser)[0]["userID"]

def common_entries(*dcts):
    for i in set(dcts[0]).intersection(*dcts[1:]):
        yield (i,) + tuple(d[i] for d in dcts)

@app.route('/api/songs/upload', methods=["POST", "GET"])
@cross_origin()
def uploadSong():
    print("Entered upload api")
    global maxSongID
    userID = request.form.get("userID")
    songName = request.form.get("songName")
    genre = request.form.get("genre")
    songFile = request.files["songFile"]
    imgFile = request.files["imgFile"]
    maxSongID += 1
    if songFile.filename == '':
        return json.dumps({'success': 0})
    else:
        songFilename = secure_filename(songFile.filename)
        songFile.save(os.path.join(app.config['UPLOAD_FOLDER'], songFilename))
        songURL = url_for('uploaded_file', filename = songFilename)
    if imgFile.filename == '':
        imgURL = '' 
    else:
        imgFilename = secure_filename(imgFile.filename)
        imgFile.save(os.path.join(app.config['UPLOAD_FOLDER'], imgFilename))
        imgURL = url_for('uploaded_file', filename = imgFilename)   
    db_record = {'songID': maxSongID, 'name': songName, 'genre': genre, 'ownerID': userID, 'songURL': songURL, 'imgURL': imgURL}
    db.songs.insert_one(db_record)
    return json.dumps({'success': 1})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/songs/getlist/<name>', methods=['GET'])
def getSongList(name):
    print("Entered get list")
    start = '^'
    end = '.*'
    searchTerm = start + name + end
    if(name != ''):
        print(searchTerm)
        cursor = db.songs.find({'name': {'$regex': searchTerm}}, {'_id': 0})
    respList = list(cursor)
    return json.dumps(respList), 200

@app.route('/api/songs/recommend', methods=['POST'])
def recommendSongs():
    print("Entered recommended songs")
    historyList = request.json["history"]
    userID = request.json["userID"]
    # Getting the history of every other user
    cursor = list(db.history.find({"userID": { "$not": userID } }))

    # Getting the history of that user
    userHistory = db.history.find_one({"userID": userID})
    
    # Updating the history 
    for key, value in historyList.items():
        if key in userHistory.keys():
            userHistory[key] += value
        else:
            userHistory[key] = value

    #db.history.replace_one({"userID": userID}, userHistory)

    max_sum = 0
    max_dict = {}
    for pref in cursor:
        sum_list = list(common_entries(userHistory, pref))
        sum_ele = 0
        for i in sum_list:
            sum_ele += i[1] * i[2]
        if sum_ele > max_sum:
            max_sum = sum_ele
            max_dict = pref
    max_ele = ""
    max_value = 0
    for key, value in max_dict.items():
        if value > max_value:
            max_ele = key
    resp = list(db.songs.find({'genre': max_ele}, {'_id': 0}))
    return json.dumps(resp), 200

@app.route('/api/user/valLogin', methods=['POST'])
def valLogin():
    print("Entered valLogin")
    userName = request.json["username"]
    password = request.json["password"]
    expectedRecord = db.users.find_one({"userName": userName})
    if(expectedRecord == None):
        return json.dumps({'val': 0}), 200
    elif(expectedRecord.password != password):
        return json.dumps({'val': 0}), 200
    return json.dumps({'val': 1, 'userDetails': expectedRecord}), 200

@app.route('/api/user/signup', methods =['POST'])
def signup():
    print("Enterd signup")
    if request.method == "POST":
        global maxUserID
        maxUserID += 1
        username = request.json["username"]
        password = request.json["password"]
        firstName = request.json["firstName"]
        lastName = request.json["lastName"]
        res = db.users.find_one({'name': username})
        if res == None:
            db.users.insert_one({'name': username, 'password': password, 'firstName': firstName, 'lastName': lastName})
        return json.dumps({}), 200

@app.route('/api/user/upload', methods = ['POST'])
def changeUserDetails():
    print("Entered change Details")
    if request.method == "POST":
        userID = request.get("userID")
        userName = request.get("userName")
        password = request.get("password")
        firstName = request.get("firstName")
        lastName = request.get("lastName")
        imgFile = request.files['imgFile']
        if imgFile.filename == '':
            imgURL = ''
            existingRecord = db.users.find({"userID": userID})
            imgURL = existingRecord['imgURL'] 
        else:
            imgFilename = secure_filename(imgFile.filename)
            imgFile.save(os.path.join(app.config['UPLOAD_FOLDER'], imgFilename))
            imgURL = url_for('uploaded_file', filename = imgFilename)
        db_record = {"userID": userID, "userName": userName, "password": password, 
            "firstName": firstName, "lastName": lastName, "imgURL": imgURL}
        db.users.replace_one({"userID": userID}, db_record)
        return json.dumps({'success': 1}), 200

@app.route('/api/user/logout', methods = ['GET'])
def logout():
    return json.dumps({}), 200

if __name__=="__main__":
    app.run(debug=True)
