import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { Ticket } from './ticketSchema.js'; 
import { Signup } from './signupSchema.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext= path.extname(file.originalname);
        const fileName = `${timestamp}-${file.originalname}`;
        cb(null, fileName); // Append timestamp to the original file name
    }
});

const upload = multer({ storage });

// Route to create a new ticket
app.post('/api/ticket', upload.array('files',10), async (req, res) => {
    const { userId,ticketId,name, policyId, email, issueType, issue } = req.body;
    const filesPath = req.files.map((file)=>(
        {
        filename: file.filename,
        path: file.path
        }
    )
    ); 

    console.log("Files Path",filesPath)
    const newTicket = new Ticket({
        userId,
        ticketId,
        name,
        policyId,
        email,
        issueType,
        issue,
        file: filesPath, 
    });

    newTicket.save()
        .then(() => res.status(201).json({ message: 'Ticket created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/api/ticket', (req, res) => {
    const { userId } = req.query;
    Ticket.find({ userId }) 
        .then(tickets => res.status(200).json(tickets))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.get('/api/tickets', (req, res) => {
    Ticket.find() 
        .then(tickets => res.status(200).json(tickets))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/api/close/:id', (req, res) => {
    const { ticketId,status,resolvedDate,message } = req.body;

    Ticket.updateOne({ ticketId }, { $set: { status: status, resolvedDate: resolvedDate, message:message } })
        .then(() => res.status(200).json({ message: 'Ticket updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
})

app.post('/api/signup', async (req, res) => {
    const { userId, password, email } = req.body;

    const existingUser = await Signup.findOne({ userId });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new Signup({ userId, password, email });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
});

app.post('/api/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
       
        const user = await Signup.findOne({ userId, password });
        if (user) {
            res.status(200).json({ userId: userId });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});