const mongoose = require('mongoose')

// mongoose.connect(connectionString,
//         {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false,z
//             useUnifiedTopology: true
//         }
//     )
// .then(()=>console.log('connected to db...'))
// .catch((err)=>console.log(err))// While this method works, however we have to make sure database is connected before spinning up the server


const connectDB = (url)=>{
    mongoose.connect(url, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true
                }
            ) 
}
module.exports = {connectDB}

