
conn = new Mongo()
db = conn.getDB("music_db")

userArr = [{userID: 1, userName: "raj", password: "raj", firstName: "Raj", LastName: "Subramanian", imgURL: "/uploads/raj.jpg"},
        {userID: 2, userName: "shubham", password: "shubham", firstName: "Shubham", LastName: "Mathur", imgURL: "/uploads/shubham.jpg"},
        {userID: 3, userName: "srikumar", password: "srikumar", firstName: "Srikumar", LastName: "Subramanian", imgURL: "/uploads/srikumar.jpg"},
        {userID: 4, userName: "shreyas", password: "shreyas", firstName: "Shreyas", LastName: "Sridhar", imgURL: "/uploads/shreyas.jpg"}
]

db.users.insertMany(userArr)