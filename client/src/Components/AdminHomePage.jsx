import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import NavBar from './NavBar'


const AdminHomePage = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    summary: '',
    body: '',
    meetingLink: '',
    meetingDate:'',
    expiryDate: '',

  });

  const [blogs, setBlogs] = useState([]);
  const [expiryDate, setExpiryDate] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [reloadPage, setReloadPage] = useState(false);

  // State variable to track whether the form is in "Create" or "Update" mode
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  //this will handle view more button
  const handleViewMore = (blogId) => {
    setExpandedBlogId(blogId);
  };

  // State variable to track the blog post ID being edited
  const [editBlogId, setEditBlogId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleMeetingDateChange = (date) => {
    setMeetingDate(date);
    setBlogData((prevData) => ({
      ...prevData,
      meetingDate: date,
    }));
  };
  
  
  const handleExpiryDateChange = (date) => {
    setExpiryDate(date);
    setBlogData((prevData) => ({
      ...prevData,
      expiryDate: date,
    }));
  };
  const handleEdit = (blogId) => {
    const blogToEdit = blogs.find((blog) => blog._id === blogId);
    if (blogToEdit) {
      setBlogData({
        _id: blogToEdit._id,
        title: blogToEdit.title,
        summary: blogToEdit.summary,
        body: blogToEdit.body,
        meetingLink: blogToEdit.meetingLink,
        expiryDate: new Date(blogToEdit.expiryDate),
      });
      setIsUpdateMode(true);
      setEditBlogId(blogId);
    }
  };

  const cancelEdit = () => {
    setIsUpdateMode(false);
    setEditBlogId(null);
    // Find the original blog post being edited in the current state of blogs
    const originalBlog = blogs.find((blog) => blog._id === editBlogId);
    if (originalBlog) {
      setBlogData({
        ...originalBlog,
        meetingDate: new Date(originalBlog.meetingDate), // Convert string to Date object
        expiryDate: new Date(originalBlog.expiryDate), // Convert string to Date object
      });
    } else {
      // If the original blog post cannot be found, reset the form fields to empty strings
      setBlogData({
        title: '',
        summary: '',
        body: '',
        meetingLink: '',
        meetingDate: '',
        expiryDate: '',
      });
    }
  };


  

  //function to submit or update my form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isUpdateMode && editBlogId) {
        // Send a PUT request to update the existing blog post
        await axios.put(`http://localhost:4000/api/blogs/${editBlogId}`, blogData);
        // Clear the form after successful update
        toast.success("Succesfully updated forum")
        cancelEdit();
      } else {
        // Send a POST request to your backend server to save the blog
        await axios.post('http://localhost:4000/api/blogs', blogData);
        // Clear the form after successful submission
        toast.success("Forum postedsuccesfully!")
        setBlogData({
          title: '',
          summary: '',
          body: '',
          meetingLink: '',
          meetingdate: '',
          expiryDate: '',
        });
        // Refresh the list of blogs after adding a new one
        fetchBlogs();
      }
      setReloadPage(true);
    } catch (error) {
      console.error(error)
      console.error('Error saving/updating blog:', error);
      toast.error("An error occured in saving/updating forum");
    }
  };

  const fetchBlogs = async () => {
    try {
      // Fetch all blogs written by the admin
      const response = await axios.get('http://localhost:4000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error("Could not get responses.")
    }
  };
  const confirmDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      handleDelete(blogId);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      // Send a DELETE request to your backend server to delete the blog
      console.log('deleting blog with the id;' , blogId)
      await axios.delete(`http://localhost:4000/api/blogs/${blogId}`);
      
      // Refresh the list of blogs after deleting one
      toast.success("Post deleted successfully!")
      fetchBlogs();
      setReloadPage(true);
    } catch (error) {
      console.error('Error deleting blog:', error);

      toast.error("Could not delete post")
    }
  };

  useEffect(() => {
    // Fetch blogs when the component mounts
    fetchBlogs();
  }, [reloadPage]);

  return (
    <>
      <NavBar />
      <div className="max-w-lg mx-auto">
        
        <h1 className="text-3xl font-bold mb-4">Start Forum</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-[grey]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="block font-bold mb-1">
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={blogData.summary}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-[grey]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block font-bold mb-1">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={blogData.body}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-[grey]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="meetingLink" className="block font-bold mb-1">
              Meeting Link (optional)
            </label>
            <input
              type="text"
              id="meetingLink"
              name="meetingLink"
              value={blogData.meetingLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-[grey]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="meetingDate" className="block font-bold mb-1">
              Virtual Meeting Date and Time
            </label>
            <DatePicker
              id="meetingDate"
              name="meetingDate"
              selected={meetingDate}
              onChange={handleMeetingDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full px-3 py-2 border rounded dark:bg-[grey]"
              placeholderText="YYYY-MM-DD HH:mm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block font-bold mb-1">
              Expiry Date
            </label>
            <DatePicker
              id="expiryDate"
              name="expiryDate"
              selected={expiryDate}
              onChange={handleExpiryDateChange}
              dateFormat="yyyy-MM-dd"
              className="w-full px-3 py-2 border rounded dark:bg-[grey]"
              placeholderText="YYYY-MM-DD"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Forums:</h2>
          {blogs.map((blog) => (
            <div key={blog._id} className="mb-4 border rounded p-4">
              <h3 className="text-xl font-bold mb-2">Title; {blog.title}</h3>
              <p className="text-gray-600 mb-4">Summary;{blog.summary}</p>
              <a
                href={blog.meetingLink}
                className="text-blue-500 hover:underline hover:cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meeting Link
              </a>
              <p className=" mb-4">Virtual meeting on:{moment(blog.meetingDate).format("YYYY-MM-DD HH:mm")}</p>
              <p>Users to respond to this forum by:{moment(blog.expiryDate).format("YYYY-MM-DD")}</p>
              {expandedBlogId === blog._id ? (
                <div>
                  <p className="text-gray-600 mb-4">Forum Body;{blog.body}</p>
                  {/* Additional blog content, if any */}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                    onClick={() => setExpandedBlogId(null)}
                  >
                    View Less
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">{blog.summary}</p>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                    onClick={() => handleViewMore(blog._id)}
                  >
                    View More
                  </button>
                </>
              )}
              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
                  onClick={() =>handleEdit(blog._id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => cancelEdit()}
                  >
                    Cancel Updating
                </button>
              </div>
              {isUpdateMode && editBlogId && (
                <div className="mb-4 border rounded p-4 mt-3">
                  <h2 className="text-2xl font-bold mb-4">Edit Blog Form</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Render the form fields with the populated data */}
                    <div className="mb-4">
                      <label htmlFor="title" className="block font-bold mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={blogData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded dark:bg-[grey]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="summary" className="block font-bold mb-1">
                        Summary
                      </label>
                      <textarea
                        id="summary"
                        name="summary"
                        value={blogData.summary}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded dark:bg-[grey]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="body" className="block font-bold mb-1">
                        Body
                      </label>
                      <textarea
                        id="body"
                        name="body"
                        value={blogData.body}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded dark:bg-[grey]"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="meetingLink" className="block font-bold mb-1">
                        Virtual Meeting Link (optional)
                      </label>
                      <input
                        type="text"
                        id="meetingLink"
                        name="meetingLink"
                        value={blogData.meetingLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded dark:bg-[grey]"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="meetingDate" className="block font-bold mb-1">
                        Virtual Meeting Date and Time
                      </label>
                      <DatePicker
                        id="meetingDate"
                        name="meetingDate"
                        selected={meetingDate}
                        onChange={(date) => setMeetingDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="w-full px-3 py-2 border rounded dark:bg-[grey]"
                        placeholderText="YYYY-MM-DD HH:mm"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="expiryDate" className="block font-bold mb-1">
                        Expiry Date
                      </label>
                      <DatePicker
                        id="expiryDate"
                        name="expiryDate"
                        selected={blogData.expiryDate}
                        onChange={(date) => handleExpiryDateChange(date)}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-3 py-2 border rounded dark:bg-[grey]"
                        placeholderText="YYYY-MM-DD"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Submit Updated form
                    </button>
                  </form>
                </div>
              )}    
              <div className="mt-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                  onClick={() => confirmDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
              
            </div>
          ))};

        </div>
        <div className="max-w-md mx-auto">
          <ToastContainer />
        </div>
      </ div>
    </>
  );
};

export default AdminHomePage;
