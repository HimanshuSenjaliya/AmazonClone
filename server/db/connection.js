const mongoose = require("mongoose")

const DB = process.env.MONGO_URL

mongoose.connect(DB).then(()=>{
    console.log("Database Connected!!😊😊")
}).catch((error) => {
    console.log("Error Occured While Connecting Database" + error.message)
})