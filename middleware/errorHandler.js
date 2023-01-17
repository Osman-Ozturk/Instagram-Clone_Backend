
const errorHandler = (err,req,res,next)=>{
        console.log(err);
        const statusCode = err.statusCode ?? 500;
        res.status(statusCode).send({
                error :{
                        status : statusCode,
                        message :err.message
                }
        })
}
export default errorHandler