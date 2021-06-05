const pet = {
    name : "Hal"
}

pet.toJSON = function(){ 
    return this
}

console.log(JSON.stringify(pet))