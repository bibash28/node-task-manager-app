test("Hello World", () => {

})

// // test("This should Fail", () => {
// //     throw new Error("Failure!")
// // })


// const calculateTip = (total, tipPercent = 0.25) => total + (total * tipPercent)

// test("Should calculate total with tip" , () =>{
//     const total = calculateTip(10, 0.3)
//     expect(total).toBe(13)
// }) 

// // test("Async test demo" , (done) => {
// //    setTimeout(() => {
// //         expect(1).toBe(1)
// //         done()
// //    }, 2000)
// // })

// const add = (a, b) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         if(a < 0 || b < 0)
//           return reject("Numbers must be non-negative")
//         resolve(a + b) 
//     }, 2000)
// })

// test("Should add two numbers" , (done) => {
//   add(2,3).then((sum) => {
//       expect(sum).toBe(5)
//       done()
//   })
// })

// test("Should add two numbers async/await" , async () => {
//     const sum = await add(2,3)
//     expect(sum).toBe(5) 
//   })