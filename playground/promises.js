const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("This is my error")
         //resolve("Success") 
    }, 2000)
})

doWorkPromise.then((result) => { 
    console.log('Success!', result)
}).catch((error) => {
    console.log('Error!', error)
})