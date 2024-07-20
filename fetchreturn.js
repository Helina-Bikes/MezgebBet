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
const ReturnfolderSchema = {
  fname: String,
  lname: String,
  ReturnedDocumentName: String,
  mezgebkuter: String,
  csoname: String,
  DateReturned: {
    type: Date,
  },
  status: String,
};
module.exports=mongoose.model('Returnfolder',ReturnfolderSchema); 
const returnnn = mongoose.model('returnn', ReturnfolderSchema,'Returnfolder');
app.get('/',(req,res)=>{
 returnnn.find({})
    .then((Returnfolder) => {
      console.log('Data found:', Returnfolder);
      res.render('return', {
        returnlist: Returnfolder,
      });
    })
    .catch((err) => {
      console.error('Error fetching UserRequest data:', err);
      res.send('error');
    });
});

app.get('/search', async (req, res) => {
  try {
    const searchValue = req.query.value;
    // Define the search criteria to search by "fname," "mezgebkuter," and partial "DateReturned"
    const searchCriteria = {
      $or: [
        { fname: { $regex: searchValue, $options: 'i' } }, // Case-insensitive search
        { mezgebkuter: { $regex: searchValue, $options: 'i' } },
        
      
      ],
    };

    const results = await returnnn.find(searchCriteria);
    res.json(results);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(9492, function () {
  console.log('Server is running on port 9492');
});
