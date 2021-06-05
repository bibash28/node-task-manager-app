const {MongoClient, ObjectID, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const userCollection = 'users'
const taskCollection = 'tasks'

const id = ObjectID()
//console.log(id)
//console.log(id.id)
//console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) =>{
    if(error) return console.log("Unable to connect to database")

    const db = client.db(databaseName) 

    deleteOneTask(db) 
})


insertOne = (db) => {
    db.collection(userCollection).insertOne({
        _id: id,
        name: "Bibash",
        age: 26
    }, (error, result) => {
        if(error) console.log("Unable to insert user")
        console.log(result.ops)
    }) 
}

insertMany = (db) => {
    db.collection(userCollection).insertMany([
        {
            name: "Bishwas",
            age: 23
        },
        {
            name: "Sneha",
            age: 25 
        }
    ], (error, result) => {
        if(error) console.log("Unable to insert user")
        console.log(result.ops)
    })
}

insertManyTasks = (db) => {
    db.collection(taskCollection).insertMany([
        {
            description: "Clean the house",
            completed: true
        },
        {
            description: "Renew inspection",
            completed: false
        },
        {
            description: "Pot plans",
            completed: false
        }
    ], (error, result) => {
        if(error) console.log("Unable to insert user")
        console.log(result.ops)
    })
}

findOneUser = (db) =>{
    db.collection(userCollection).findOne({name: "Sneha"}, (error , user) =>{ 
        if(error) console.log("Unable to fetch user")
        console.log(user)
    })
}

findUserById = (db) =>{
    db.collection(userCollection).findOne({_id: ObjectId("60b9ce926efeec50f41b4874")}, (error , user) =>{ 
        if(error) console.log("Unable to fetch user")
        console.log(user)
    })
}
 
findManyUser = (db) =>{
    db.collection(userCollection).find({name: "Sneha"}).toArray((error , user) =>{ 
        if(error) console.log("Unable to fetch user")
        console.log(user)
    })
}

findTaks = (db) => {
    db.collection(taskCollection).find({completed: false}).toArray((error , tasks) =>{ 
        if(error) console.log("Unable to fetch data")
        console.log(tasks)
    }) 
}

countUser = (db) => { 
    db.collection(userCollection).find({name: "Sneha"}).count((error , user) =>{ 
        if(error) console.log("Unable to fetch user")
        console.log(user)
    })
}

updateUserName= (db) => {
    var id = {_id : new ObjectID("60b9ce926efeec50f41b4874")}
    var query = {$set : {name: "Undertaker"}}
    // db.collection(userCollection).updateOne(id, query, (error, user) => {
    //     if(error) console.log("Unable to update")
    //     console.log(user)
    // })
    db.collection(userCollection).updateOne(id, query).then((user)=>{
        console.log(user)
    }).catch((error) => {
        console.log("Unable to update")
    })
}

incrementUserAge = (db) => {
    var id = {_id : new ObjectID("60b9ce926efeec50f41b4874")}
    var query = {$inc : {age: 1}} 
    db.collection(userCollection).updateOne(id, query).then((user)=>{
        console.log(user)
    }).catch((error) => {
        console.log("Unable to update")
    })
}

completeTask = (db) => { 
    db.collection(taskCollection).updateMany({completed:  false}, {$set: {completed:  true}
    }).then((user)=>{
        console.log(user)
    }).catch((error) => {
        console.log("Unable to update")
    })
}

deleteManyUser = (db) => {
    db.collection(userCollection).deleteMany({
        age:  26
    }).then((user)=>{
        console.log(user)
    }).catch((error) => {
        console.log(error)
    })
}

deleteOneTask = (db) => {
    db.collection(taskCollection).deleteMany({
        description : "Clean the house"
    }).then((user)=>{
        console.log(user)
    }).catch((error) => {
        console.log(error)
    })
}