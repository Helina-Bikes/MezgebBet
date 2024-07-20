const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/folderhandler', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const MezgebBetSchema={
     FolderName:String,
     mezgebkuter:String,
     csoname:String,
     NoOfPage:{
        type:Number,
     },
     YearOfFolder:{
        type:Date,
     },
     Owner:String,
  }
  module.exports=mongoose.model('MezgebBet',MezgebBetSchema)
  const folderr=mongoose.model('folderrr',MezgebBetSchema,'MezgebBet')
 app.get('/',(req,res)=>{
        folderr.find({})
        .then((MezgebBet)=>{
            res.render(('folder'),{
                folderlist:MezgebBet
            });
        });
    })
        .patch((err)=>{
            console.error('Error fetching UserRequest data:', err);
          res.send('error');
        })
        app.get('/search', async (req, res) => {
          try {
              const searchValue = req.query.value;
      
              // Define the search criteria to search by "fname" or "mezgebkuter"
              const searchCriteria = {
                  $or: [
                      { FolderName: { $regex: searchValue, $options: 'i' } }, // Case-insensitive search
                      { mezgebkuter: { $regex: searchValue, $options: 'i' } }
                      
                  ]
              };

              const results = await folderr.find(searchCriteria);
              res.json(results);
          } catch (error) {
              console.error('Error searching users:', error);
              res.status(500).json({ error: 'An error occurred' });
          }
      });
      app.listen(7084, function () {
      console.log('Server is running on port 7084');
      });
      