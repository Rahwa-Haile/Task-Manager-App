//Here we import the class rather than than the function because we have to check whether the error is instance of the custom error inorder to give 404 response. If not then we give internal server error(500).
const {CustomAPIError} = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next)=>{

    if(err instanceof CustomAPIError){
        res.status(err.statusCode).json({msg: err.message})
    }
    
    res.status(500).json({msg: 'Something went wrong, try again later.'})
}

module.exports = errorHandlerMiddleware 