
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

app.post('/given', (req, res) => {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var phone = req.body.phone;
  var department = req.body.department;
  var RequestedDocumentName = req.body.RequestedDocumentName;
  var mezgebkuter=req.body.mezgebkuter;
  var csoname=req.body.csoname;
  var DateRequested = req.body.DateRequested;
  var status= req.body.status;


  var data={
    "fname":fname,
    "lname":lname,
    "phone":phone,
    "department":department,
    "RequestedDocumentName":RequestedDocumentName,
    "mezgebkuter":mezgebkuter,
    "csoname":csoname,
    "DateRequested":DateRequested,
    "status":status,
  }
   db.collection('givefolder').insertOne(data,(err,collection)=>{
       if(err){
        throw err
       }
       console.log("folder given succesfully");
   });
  res.send('<script>alert("Document Given succesfully"); window.history.back();</script>')
})
app.get('/',(req,res)=>{
  return res.redirect('GiveFolder.html');
  
})
app.listen(9979,function(){
    console.log(' server is running on port 9979 '); 
  } ) 
  

