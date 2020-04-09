var express = require('express');
var app = express();
var mongoose = require('mongoose');
const router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser')
var db = require('../backend/config/database.js');
app.use(cors());
app.use(express.json());
const bcrypt = require('bcryptjs');
const Students = require('../backend/model/student.js')
var port = 5000;


mongoose.connect(db.url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  })
.then(() => {
    console.log("Database connected");    
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });


//Register users
app.post('/register', (req,res) => {

  if(!(req.body.name||req.body.dob||req.body.email||req.body.password||req.body.address||req.body.mobileno||req.body.role)) {
    res.json("some fileds are empty");
  }else{
  
    Students.findOne({email: req.body.email}).then(Student=>{
     
                if (Student) {
                  console.log("emailID already exits")
                  }else{
                    const detail = new Students({
                      name: req.body.name,
                      dob: req.body.dob,
                      email: req.body.email,
                      password: req.body.password,
                      address: req.body.address,
                      mobileno: req.body.mobileno,
                      role: req.body.role
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(detail.password, salt, (err, hash) => {
                        if (err) throw err;
                        detail.password = hash;

                    detail.save()
                       .then(result => {
                         res.status(200).send("data entered", result); 
                         console.log(result); 
                       })                    
                       .catch(err => {
                         res.json(err);
                         console.log(err);
                       });
                  })
                
                })
              
              


                  }
})
}
});


app.listen(port, () => console.log("server started on port" + port));

module.exports = app;
