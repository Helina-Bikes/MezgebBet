var express = require('express')
var router = express.Router();

const credential={
    email:"helinabikes0@gmail.com",
    password:"helina"
}
router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password==credential.password){
      //res.redirect('Admin.html');
      res.redirect('/admin');
       function myFunction() {
        alert("Hello !");l
      }
   }else{
        res.send("invalid userName and Account")
    }
})

module.exports=router;