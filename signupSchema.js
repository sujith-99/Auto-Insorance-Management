import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Signup = mongoose.model('Signup', signupSchema);

export { Signup };