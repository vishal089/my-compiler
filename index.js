const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('node:fs');

const { exec } = require('node:child_process');

require('dotenv').config();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });
const port = process.env.PORT || 8001 ;

app.use('/',express.static('public'));
app.use(cors());


app.post('/submitfile', upload.single('file'), (req, res) => {
    // console.log("file",req.file,req.body.language)
    const fileData = req.file;
    const lan = req.body.language ;
    let compiler;

    // console.log("Test")
    if(lan == 'java'){
        compiler = "java"
    }else if(lan == 'js'){
        compiler = "node"
    }else if(lan == 'py'){
        compiler = "python"
    }


    exec(`${compiler} ./uploads/${fileData.filename}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.send(error.message);
        }

        if (stderr) {
            console.error(`Compilation or runtime error: ${stderr}`);
            return res.send(stderr);
        }

        // console.log(`Java file output:\n${stdout}`);
        // fs.unlinkSync(`./uploads/${fileData.filename}`);
        return res.send(stdout);
    });

    // Send a response to the client
    // res.send('File data submitted and saved successfully!');
});


app.listen(port,()=>{
    console.log('App listening to port',port)
})