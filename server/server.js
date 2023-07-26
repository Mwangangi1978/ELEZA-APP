require('dotenv').config()
const express=require('express')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session);
const cors =require('cors')
const User = require ('./models/userSchema')
const Response = require('./models/responseSchema')
const Blog = require('./models/adminBlogSchema')
const Admin = require('./models/adminSchema')
const app=express()


//Middlewares
//To enable Cross-Origin Resource Sharing
app.use(cors())
app.use(express.static('../docs/index.html'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())




//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true}).then(() => console.log("DB Connected"))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

//CITIZEN SIGN_UP AND LOGIN BACKEND
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


//ADMIN LOGIN
app.post('/adminlogin', async (req, res) => {
  try {
    const { county, password } = req.body;

    // Find the user in the database
    const admin = await Admin.findOne({ county: county });

    if (admin) {
      // Compare the provided password with the hashed password
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);

      if (isPasswordCorrect) {
        res.status(200).json({
          status: 'Logged In',
          username: county
        });
      } else {
        res.status(401).json({Error:'Incorrect password'});
      }
    } else {
      res.status(404).json({Error:'Username not found'});
    }
  } catch (error) {
    res.json(error);
  }
});


//ADMIN BLOG ROUTES
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, summary, body, meetingLink, meetingDate, expiryDate } = req.body;
    const loggedInAdminId = /* Get the ObjectId of the currently logged-in admin user here */;

    // Create a new blog with the provided data
    const blog = new Blog({
      title: title,
      summary: summary,
      body: body,
      author: loggedInAdminId, // Populate the author field with the ObjectId of the currently logged-in admin user
      meetingLink: meetingLink,
      meetingDate:meetingdate,
      expiryDate: expiryDate,
    });

    // Save the blog to the DB
    await blog.save();

    res.status(201).json({ status: "Blog created successfully", blog: blog });
  } catch (error) {
    res.status(400).json({ Error: 'Failed to create blog', error: error });
  }
});

// Get all blogs written by the admin
app.get('/api/blogs', async (req, res) => {
  try {
    const loggedInAdminId = /* Get the ObjectId of the currently logged-in admin user here */;

    // Find all blogs where the author is the currently logged-in admin
    const blogs = await Blog.find({ author: loggedInAdminId });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ Error: 'Failed to fetch blogs', error: error });
  }
});
//updating posts by admin
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { title, summary, body, meetingLink, meetingdate, expiryDate } = req.body;
    const blogId = req.params.id;

    // Find the blog post by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ Error: 'Blog not found' });
    }

    // Update the blog post fields
    blog.title = title;
    blog.summary = summary;
    blog.body = body;
    blog.meetingLink = meetingLink;
    blog.meetingDate= meetingDate;
    blog.expiryDate = expiryDate;

    // Save the updated blog post
    await blog.save();

    res.status(200).json({ status: "Blog updated successfully", blog: blog });
  } catch (error) {
    res.status(500).json({ Error: 'Failed to update blog', error: error });
  }
});

//deleting admin posts
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog post by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ Error: 'Blog not found' });
    }

    // Delete the blog post
    await blog.delete();

    res.status(200).json({ status: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ Error: 'Failed to delete blog', error: error });
  }
});


//USER BLOG ROUTES
app.post('/api/blogs/:blogId/responses', async (req, res) => {
  try {
    const { blogId } = req.params;
    const { idNumber, body } = req.body;

    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ Error: 'Blog not found' });
    }

    // Check if the blog has an expiry date and if the current date is after the expiry date
    if (blog.expiryDate && new Date() > new Date(blog.expiryDate)) {
      return res.status(400).json({ Error: 'Blog has expired. Cannot submit response.' });
    }

    // Create a new response
    const response = new Response({
      blog: blogId,
      idNumber,
      body,
    });

    // Save the response to the DB
    await response.save();

    res.status(201).json({ status: 'Response submitted successfully', response });
  } catch (error) {
    res.status(500).json({ Error: 'Failed to submit response', error });
  }
});


app.put('/api/blogs/:blogId/responses/:responseId', async (req, res) => {
  try {
    const { blogId, responseId } = req.params;
    const { body } = req.body;

    // Find the response by ID
    const response = await Response.findById(responseId);

    if (!response) {
      return res.status(404).json({ Error: 'Response not found' });
    }

    // Find the blog associated with the response
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ Error: 'Blog not found' });
    }

    // Check if the blog has an expiry date and if the current date is after the expiry date
    if (blog.expiryDate && new Date() > new Date(blog.expiryDate)) {
      return res.status(400).json({ Error: 'Blog has expired. Cannot resubmit response.' });
    }

    // Update the response body
    response.body = body;

    // Save the updated response to the DB
    await response.save();

    res.status(200).json({ status: 'Response resubmitted successfully', response });
  } catch (error) {
    res.status(500).json({ Error: 'Failed to resubmit response', error });
  }
});


app.get('/api/blogs/:blogId/responses', async (req, res) => {
  try {
    const { blogId } = req.params;

    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ Error: 'Blog not found' });
    }

    // Find all responses associated with the blog
    const responses = await Response.find({ blog: blogId });

    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ Error: 'Failed to fetch responses', error });
  }
});





//Start the server
app.listen(process.env.PORT, ()=>{
  console.log('Server is functional and running on port' , process.env.PORT)
})