require('dotenv').config()
const express=require('express')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const cors =require('cors')
const User = require ('./models/userSchema')
const app=express()


//Middlewares
//To enable Cross-Origin Resource Sharing
app.use(cors())
app.use(express.static('../docs/index.html'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


/* //Defining Mongoose Schema
const userSchema = new mongoose.Schema(schema);
//Defining Mongoose model
const User = mongoose.model('User', userSchema); */


//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true}).then(() => console.log("DB Connected"))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})


//Signup route
app.post('/signup', async(req,res)=>{
 try{
    const {idNumber, county, password}=req.body;
    const hashedPass= await bcrypt.hash(password,10)
    //Create a new user with hashed password
    const user = new User({
      idNumber:idNumber,
      countyOfResidence: county,
      password: hashedPass
    })
    //Save user to DB
    await user.save()

    res.status(201).json({
        status:"registered",
        idNumber:idNumber,
        countyOfResidence:county,
        password:hashedPass
    })
 }
 catch(error){
 res.status(401).json(error)
 }
} )

//Login route
app.post('/login', async (req, res) => {
  try {
    const { idNumber, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ idNumber: idNumber });

    if (user) {
      // Compare the provided password with the hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        res.status(200).json({
          status: 'Logged In',
          idNumber: idNumber
        });
      } else {
        res.status(401).json({Error:'Incorrect password'});
      }
    } else {
      res.status(404).json({Error:'User-Id not found'});
    }
  } catch (error) {
    res.json(error);
  }
});


//Start the server
app.listen(process.env.PORT, ()=>{
  console.log('Server is functional and running on port' , process.env.PORT)
})