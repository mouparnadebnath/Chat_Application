import  mongoose  from "mongoose";
export const connectDatabase=async()=>{
try {
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("database connected successfully")
} catch (error) {
    console.log('error while connecting to database',error.message)
}
}