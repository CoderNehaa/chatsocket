import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("", {
        useNewUrlParser:true,
        useUnifiedTopology :true
    });
    console.log("MongoDB is connected");
}

