conn = new Mongo()
db = conn.getDB("music_db")

historyArr = [{userID: 1, rock: 3, pop: 4},
            {userID: 2, rock: 1, edm: 5},
            {userID: 3, country: 3, edm: 6, pop: 1},
            {userID: 4, pop: 4, country: 2}
]

db.history.insertMany(historyArr)