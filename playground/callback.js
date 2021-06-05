const doWorkCallback = (callBack) => {
    setTimeout(() => {
        //callBack("This is my error", undefined)
        callBack(undefined, "Success")

    }, 2000)
}

doWorkCallback((error, result) => {
    if(error) return console.log(error)
    console.log(result)
})