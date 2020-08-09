const express = require('express');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

//Upload endpoint
app.post('/upload',(req,res) => {
    if(req.files === null){
        return res.status(400).json({msg:'No file uploaded'});
    }
    const file = req.files.file;
    file.mv(`${__dirname}/../frontend/public/uploads/${file.name}`, err=>{
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName:file.name,filePath:`/uploads/${file.name}`});
    });
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection establish successfully")
})

const userRouter = require('./routes/users');
app.use('/users',userRouter);

app.listen(port, ()=> {
    console.log(`Server is listening on ${port}`);
})