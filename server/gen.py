import random
for i in range(1, 49):
    print("{songID:" + str(i) + ", songName: name[" + str(i) + "], genre: genre[" + (str(i%4)) + "], ownerID:" + str(random.randint(1, 4)) + ", songURL: '/uploads/' + name[" + str(i) + "] + '.mp3', imgURL: '/uploads/' + name[" + str(i) + "] + '.jpg'},")
