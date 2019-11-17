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

maxSongID = db.songs.find().sort([("songID", -1)]).limit(1)

@app.route('/api/songs/upload', methods=["POST", "GET"])
@cross_origin()
def uploadSong():
    print("Entered upload api")
    #global maxSongID
    userID = 1
    songName = request.form.get("songName")
    genre = request.form.get("genre")
    songFile = request.files["songFile"]
    imgFile = request.files["imgFile"]
    maxSongID = 1
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

if __name__=="__main__":
    app.run(debug=True)
