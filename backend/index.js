// index.js
// bh3matYeLXsN0OYh (password)
// bhadrasubhadeep2004 (username)
// mongodb+srv://bhadrasubhadeep2004:<db_password>@cluster0.slqrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


// krScu9gZc8WwJWZV
//mongodb+srv://bhadrasubhadeep2004:krScu9gZc8WwJWZV@cluster0.m11uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


















// HpyLmp7QDLSc7bJu

const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const createRoute = require('./routes/route');

const connectionString = "mongodb://127.0.0.1:27017/kanban_task";

async function connectDB() {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

connectDB();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Worldd");    
});

app.use("/task", createRoute);


app.listen(port,()=>{
    console.log("The server is running in the port " + port);
})