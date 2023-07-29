import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import BASE_URL from '../../src/config';

const UserHomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const[idNumber,setIdNumber]= useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Use the idNumber state variable for further processing
    console.log("User's idNumber:", idNumber);
    // Reset the input field after processing if needed
    setIdNumber("");
  };


  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blogs/users?page=${currentPage}`);
      setBlogs((prevBlogs) => [...prevBlogs, ...response.data]);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error("data was not fetched ")
    }
  };

  const handleSeeMoreBlogs = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleResponseSubmit = async (blogId, idNumber, responseBody) => {
    try {
      // Check if the current user has already responded to this blog
      const userResponses = blogs.find((blog) => blog._id === blogId)?.responses;
      if (userResponses && userResponses.some((response) => response.idNumber === idNumber)) {
        toast.error("You can only submit one response per blog.");
        return;
      }

      // Check if the blog has an expiry date and if the current date is after the expiry date
      const blog = blogs.find((blog) => blog._id === blogId);
      if (blog?.expiryDate && new Date() > new Date(blog.expiryDate)) {
        toast.error("Blog has expired. Cannot submit response.");
        return;
      }

      await axios.post(`${BASE_URL}/api/blogs/${blogId}/responses`, {
        
        idNumber: idNumber,
        body: responseBody,
      });
      // Refresh the blog list after submitting a response
      fetchBlogs();
      toast.success("submitted response.")
    } catch (error) {
      toast.error("Could not submit response:", error);
      console.error("Error submitting response:", error);
    }
  };


  /* const handleViewMore = (blogId) => {
    // Toggle the expanded state of the blog when "View More" is clicked
    setAuthorBlogs((prevBlogs) =>
      prevBlogs.map((blog) => {
        if (blog._id === blogId) {
          return {
            ...blog,
            showFullBody: !blog.showFullBody,
          };
        }
        return blog;
      })
    );
  }; */
  const handleViewMore = (blogId) => {
    // Toggle the expanded state of the blog when "View More" is clicked
    setExpandedBlogId((prevId) => (prevId === blogId ? null : blogId));
  };
  

  const handleFormResubmission = async (blogId, responseId, responseBody) => {
    try {
      // Check if the blog has an expiry date and if the current date is after the expiry date
      const blog = blogs.find((blog) => blog._id === blogId);
      if (blog?.expiryDate && new Date() > new Date(blog.expiryDate)) {
        toast.error("Blog has expired. Cannot resubmit response.");
        return;
      }

      await axios.put(`${BASE_URL}/api/blogs/${blogId}/responses/${responseId}`, {
        body: responseBody,
      });
      toast.success("Response resubmitted successfully!");
      // Refresh the blog list after resubmitting the response
      fetchBlogs();
    } catch (error) {
      console.error("Error resubmitting response:", error);
    }
  };

  const handleDeleteClick = async (blogId, responseId) => {
    try {
      // Check if the blog has an expiry date and if the current date is after the expiry date
      const blog = authorBlogs.find((blog) => blog._id === blogId);
      if (blog?.expiryDate && new Date() > new Date(blog.expiryDate)) {
        toast.error("Blog has expired. Cannot delete response.");
        return;
      }

      await axios.delete(`${BASE_URL}/api/blogs/${blogId}/responses/${responseId}`);
      toast.success("Response deleted successfully!");
      // Refresh the blog list after deleting the response
      fetchAuthorBlogs();
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Welcome!</h1>
      {idNumber === "" && ( // Render the input field only when idNumber is an empty string
        <div>
          <h2>User ID Number:</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={idNumber}
              onChange={handleIdNumberChange}
              placeholder="Enter your ID Number"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-center">Forum Posts:</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="mb-4 border rounded p-4">
          <h3 className="text-xl font-bold mb-2">Title:{blog.title}</h3>
          <h3 className="text-xl mb-2">Forum by:{blog.author}</h3>
          <p className=" mb-4">Summary:{blog.summary}</p>
          <a
            href={blog.meetingLink}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.meetingLink}
          </a>
          <p className="mb-4">virtual meeting on: {moment(blog.meetingDate).format("YYYY-MM-DD HH:mm")}</p>
          <p className="mb-4">Respond to this post by: {moment(blog.expiryDate).format("YYYY-MM-DD")}</p>


          {/* Display the blog body only when "showFullBody" is true */}
          {/* {blog.showFullBody && <p className="text-gray-600 mb-4">{blog.body}</p>} */}
          {expandedBlogId === blog._id && <p className="text-gray-600 mb-4">{blog.body}</p>}
          {blog.showFullBody ? (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
              onClick={() => handleViewMore(blog._id)}
            >
              View Less
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
              onClick={() => handleViewMore(blog._id)}
            >
              View More
            </button>
          )}
          <div className="mt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const idNumber = e.target.elements.idNumber.value; // Get the value of idNumber from the form
                const responseBody = e.target.elements.response.value; // Get the value of responseBody from the form
                handleResponseSubmit(blog._id, idNumber, responseBody); // Call handleResponseSubmit with idNumber and responseBody
              }}
            >
              <div>
                <label htmlFor="idNumber">Your ID Number:</label>
                <input
                  type="text"
                  name="idNumber"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your ID Number..."
                  required 
                />
              </div>
              <div>
                <label htmlFor="response">Response:</label>
                <input
                  type="text"
                  name="response"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your response..."
                  required 
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
              >
                Submit Response
              </button>
            </form>
            {/* User Responses */}
            <h2 className="text-2xl font-bold mb-4 ">Your response to this post:</h2>
            {blog.responses && blog.responses.map((response) =>(
                  <div key={response._id} className="mt-4 border rounded p-4">
                    <h4 className="text-lg font-bold mb-2">Response for: {blog.title}</h4>
                    {blog.showFullBody ? (
                      <p className="mb-2">{response.body}</p>
                    ) : (
                      <p className="mb-2">{response.body.slice(0, 100)}...</p>
                    )}

                    {/* Show the "Resubmit Response" button */}
                    {!showResubmitForm && (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                        onClick={() => setShowResubmitForm(true)}
                      >
                        Resubmit Response
                      </button>
                    )}

                    {/* Show the form for resubmitting the response if the button is clicked */}
                    {showResubmitForm && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const responseBody = e.target.elements['resubmit-response'].value;
                          handleFormResubmission(blog._id, response._id, responseBody);
                          setShowResubmitForm(false); // Hide the form after submission
                        }}
                      >
                        <input
                          type="text"
                          name="resubmit-response"
                          className="w-full px-3 py-2 border rounded"
                          placeholder="Your response..."
                          defaultValue={response.body}
                        />
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                        >
                          Resubmit Response
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() => handleDeleteClick(blog._id, response._id)}
                        >
                          Delete Response
                        </button>
                      </form>
                    )}

                  </div>
                )
              )}
            {/* Display the placeholder text when there are no responses */}
          {blog.responses && blog.responses.length === 0 && (
            <p>No response yet.</p>
          )}
          </div>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        onClick={handleSeeMoreBlogs}
      >
        See More Blogs
      </button>


      <ToastContainer />
    </div>
  );
};

export default UserHomePage;