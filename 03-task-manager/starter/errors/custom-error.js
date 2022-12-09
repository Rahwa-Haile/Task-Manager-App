
class CustomAPIError extends Error{
    constructor(message, statusCode){
    super(message)//Since we are extending we need this super. This calls the constructor of the parent class and as a result we will have access to the methods of the parent class
    this.statusCode = statusCode//therfore we have two properties in this class. message(from the parent class) ans status code(which we are setting in this line)
    }
}

const createCustomError = (msg, statusCode)=>{
    return new CustomAPIError(msg, statusCode)
}

module.exports = {createCustomError, CustomAPIError}