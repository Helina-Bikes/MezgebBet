const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/folderhandler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', () => console.log('error connecting to database'));
db.once('open', () => console.log("connected to database"));
app.use(express.static('public'));
app.post('/return',(req,res)=>{
    var fname= req.body.fname;
    var lname=req.body.lname;
    var ReturnedDocumentName=req.body.ReturnedDocumentName;
    var mezgebkuter=req.body.mezgebkuter;
    var csoname=req.body.csoname;
    var DateReturned=req.body.DateReturned;
    var status=req.body.status;

    var data={
        "fname":fname,
        "lname":lname,
        "ReturnedDocumentName":ReturnedDocumentName,
        "mezgebkuter":mezgebkuter,
        "csoname":csoname,
        "DateReturned":DateReturned,
        "status":status,

    }
    db.collection('Returnfolder').insertOne(data,(err,collection)=>{
          if(err){
           throw err
          }
          console.log("folder returned succesfully");
    });
    
        res.send('<script>alert("Document Returned successfully!"); window.history.back();</script>');
    });

app.get('/',(req,res)=>{
    return res.redirect('ReturnFolder.html');
})
app.listen(9550,function(){
    console.log('server is running on port 9550')
})