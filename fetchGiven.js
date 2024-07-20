const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); 
const app = express();
//const Schema=mongoose.Schema;
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/folderhandler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const givefolderSchema={
       fname:String,
       lname:String,
       phone:{
         type:Number,
         
       },
       department:String,
       RequestedDocumentName:String,
       mezgebkuter:String,
       csoname:String,
       DateRequested:{
        type:Date,
       },
       status:String,
    };
 module.exports=mongoose.model('givefolder',givefolderSchema); 

const givenn=mongoose.model('given',givefolderSchema,'givefolder')
   app.get('/',(req,res)=>{
      givenn.find({})
      .then((givefolder)=>{
         res.render(('give'),{
            givenlist:givefolder
         });
      })
      .catch((err)=>{
            console.error('Error fetching UserRequest data:', err);
          res.send('error');
        });
      });
     
      app.get('/search', async (req, res) => {
        try {
            const searchValue = req.query.value;
            // Define the search criteria to search by "fname" or "mezgebkuter"
            const searchCriteria = {
                $or: [
                    { fname: { $regex: searchValue, $options: 'i' } }, // Case-insensitive search
                    { mezgebkuter: { $regex: searchValue, $options: 'i' } },
                    
                ]
            };


            const results = await givenn.find(searchCriteria);
            res.json(results);
        } catch (error) {
            console.error('Error searching users:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    });

     
         
app.listen(9800, function () {
  console.log('Server is running on port 9800');
});


