const request = require("supertest")
const app = require("../src/app")
const User = require('../src/models/user')
const bcrypt = require('bcryptjs')
const { userOneId, userOne, setupDatabse } = require('./fixtures/db')

beforeEach(setupDatabse)

// afterEach(() => {
//     console.log('afterEach')
// })


test("Should signup new user", async () => {
    const response = await request(app).post('/users').send({
        name: "Sneha",
        email: "sneha@gmail.com",
        password: "2332332432"
    }).expect(201)

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assert about the response
    expect(response.body).toMatchObject({
        user: {
            name: "Sneha",
            email: "sneha@gmail.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('2332332432')
    const isMatch = await bcrypt.compare('2332332432', user.password)
    expect(isMatch).not.toBeNull()
})


test("Should login existing user", async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[0].token)
})

test("Should not login non-existing user", async () => {
    await request(app).post('/users/login').send({
        email: "bibashshresthsa@gmail.com",
        password: "2332332432"
    }).expect(400)
})


test("Should get profile for user", async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("Should not get profile for unauthenticated user", async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test("Should delete account for user", async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("Should not delete account for unauthenticated user", async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test("Should upload avatar image", async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    //expect({}).toEqual({}) 
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user fields", async () => {
    const response = await request(app)
        .patch('/users/me')
        .send({
            name: "Bibash"
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    //assert that the database was changed correctly
    const user = await User.findById(userOneId)
    expect(user.name).toEqual("Bibash")
})

test("Should not update invalid user fields", async () => {
    const response = await request(app)
        .patch('/users/me')
        .send({
            location: "Boston"
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(400)
})

 