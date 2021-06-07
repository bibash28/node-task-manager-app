const request = require("supertest")
const app = require("../src/app")
const Task = require("../src/models/task.js")
const {userOne, userTwo, taskOne, setupDatabse } = require('./fixtures/db')

beforeEach(setupDatabse)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            "description" : "from my test"
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()  
    expect(task.completed).toEqual(false)    
}) 

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)  
    expect(response.body.length).toBe(2)    
}) 

test('Should not delete other user task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)  
    const task = Task.findById(taskOne._id)    
    expect(task).not.toBeNull()  
}) 

