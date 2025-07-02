import mongoose from "mongoose";

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/customer_support')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const fileSchema=new mongoose.Schema({
    filename:String,
    pathname:String,
});

// Define Ticket schema
const ticketSchema = new mongoose.Schema({
    userId:{
        type:Number,
        unique:true,
        required:true
    },
    ticketId:{
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    policyId: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    issueType: {
        type:String,
        required: true
    },
    issue: {
        type:String,
        required: true
    },
    file: [fileSchema],
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved'], 
        default: 'open'
    },
    resolvedDate: {
        type: Date,
        default: null
    },
    message: {
        type: String,
        default: 'Yet to be resolved'
    }
}, { timestamps: true });

// Create Ticket model
export const Ticket = mongoose.model('Ticket', ticketSchema);