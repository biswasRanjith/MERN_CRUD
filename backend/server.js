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
//const Student = require('../backend/model/student.js')
var port = 5000;


const Schema = mongoose.Schema;

const Student = new Schema({
  
    id: 
    {
     type:Number,
     unique: true
    },
    name: String,
    dob: String,
    email:
    {
        type:String,
        unique:true
    },
    password: String,
    address: String,
    mobileno: Number,
    role: String
});
var Students = mongoose.model('Student', Student);


//mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true});
mongoose.connect(db.url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true  })
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
                  console.log("emailID already exits");
                  res.send("email ID already exits");

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
                        // res.status().send("data entered", result);
                        res.write("data received :", result) 
                         console.log(result); 
                         res.end();
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

  
// view user:

app.get('/students', (req,res) => {

  Students.find().then(result => {
    console.log(result);
    //res.write(JSON.stringify(result));
   res.send(result);
   res.end();
  }).catch(err =>
    {
      console.log(err);
    })
})


//get single student
app.get('/', (req, res) => {

 // var name = req.param.name;
  // Students.findOne({email:req.query.email}).then(result => {
  //   console.log(result);
  //   res.send(result);
  //   res.end();
  // }).catch(err =>
  //   {
  //     res.send(err);
  //     console.log(err);
  //   })
  var query  = Students.where({ name: req.query.name });
  query.findOne(function (err, result) {
    if (err) return handleError(err);
    if (result) {

      console.log(result);
      res.send(result);
     
    }
  });
  

})



// delete students

app.delete('/deletestudent',(req,res)=>
{
    //  Students.findOneAndRemove({name:req.query.name}).then(data=>
    //     {
    //       res.status(200).send(data);
    //       console.log("deleted");
    //     }).catch(err=>
    //         {
    //           console.log(err);
    //           res.status(404).send("not found");
    //         });


    Students.deleteOne({ email:req.query.email }).then(data =>{
      console.log(req.query.email)
      res.status(200).send(data);
          console.log("deleted"); // check the docs to fix it "https://mongoosejs.com/docs/api/query.html"
                                                           //https://docs.mongodb.com/manual/tutorial/query-arrays/
        }).catch(err=>
            {
              console.log(err);
              res.status(404).send("not found");
            });

    });



    app.put('/update', (req,res) => {

      Students.findOneAndUpdate(
        { name: req.query.name },
        { $set: { dob: req.query.dob } },
        {new: true, passRawResult: true}
        ).then (result => {
          res.status(200).send(result);
          console.log("updated"); // check the docs to fix it for errors " https://mongoosejs.com/docs/api/query.html"
        }).catch(err=>
            {
              console.log(err);
              res.status(404).send("not found");
            });
        
    })



// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })
  

app.listen(port, () => console.log("server started on port" + port));

module.exports = app;
