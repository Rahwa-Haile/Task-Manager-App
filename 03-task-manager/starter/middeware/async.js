const asyncWrapper = (fn)=>{
    return async(req, res, next)=>{
        try{
            await fn(req, res, next)
        }
        catch (error){
            next(error)//we pass the error to the next middleware
        }
    }
}

module.exports = asyncWrapper