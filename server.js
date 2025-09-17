import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import  connectDB  from './configs/mongodb.js';
import { clerkwebhooks } from './controllers/webhooks.js';

// initialize Express
const app = express();
// connect database

await connectDB();

// middlewares
app.use(cors());

// routes
app.get('/', (req, res) => res.send('Api Working'))
app.post('/clerk', express.json(), clerkwebhooks)  

// port number
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`sever is running on PORT ${PORT}`);
} )