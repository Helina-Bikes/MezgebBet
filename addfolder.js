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
// Add this line before defining any routes
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.post('/add',(req,res)=>{
    var FolderName= req.body.FolderName;
    var mezgebkuter= req.body.mezgebkuter;
    var csoname= req.body.csoname;
    var NoOfPage= req.body.NoOfPage;
    var YearOfFolder= req.body.YearOfFolder;
    var Owner= req.body.Owner;



    var data={
        "FolderName": FolderName,
        "mezgebkuter":mezgebkuter,
        "csoname":csoname,
        "NoOfPage":NoOfPage,
        "YearOfFolder":YearOfFolder,
        "Owner":Owner,
    }
    db.collection('MezgebBet').insertOne(data,(err,collection)=>{
        if(err){
         throw err
        }
        console.log("folder Added succesfully");
    });
  
   res.send('<script> alert("Document Added Succesfully"); window.history.back();</script>')
 })
 app.get('/',(req,res)=>{
     return res.redirect('NewFolder.html');
 })
 app.listen(9650,function(){
     console.log('server is running on port 9650')
 })

