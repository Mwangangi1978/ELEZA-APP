import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';

const UserHomePage = ({ userCounty, userNumber }) => {
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  const fetchAuthorBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/blogs'/* /api/blogs?authorCounty=${userCounty} */);
      setAuthorBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };


  useEffect(() => {
    fetchAuthorBlogs();
  }, [userCounty]);

  const handleResponseSubmit = async (blogId, responseBody) => {
    try {
      // Check if the current user has already responded to this blog
      const userResponses = authorBlogs.find((blog) => blog._id === blogId)?.responses;
      if (userResponses && userResponses.some((response) => response.idNumber === userNumber)) {
        toast.error("You can only submit one response per blog.");
        return;
      }

      // Check if the blog has an expiry date and if the current date is after the expiry date
      const blog = authorBlogs.find((blog) => blog._id === blogId);
      if (blog?.expiryDate && new Date() > new Date(blog.expiryDate)) {
        toast.error("Blog has expired. Cannot submit response.");
        return;
      }

      await axios.post(`/api/blogs/${blogId}/responses`, {
        idNumber: userNumber,
        body: responseBody,
      });
      // Refresh the blog list after submitting a response
      fetchAuthorBlogs();
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };


  const handleViewMore = (blogId) => {
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
  };
  

  const handleFormResubmission = async (blogId, responseId, responseBody) => {
    try {
      // Check if the blog has an expiry date and if the current date is after the expiry date
      const blog = authorBlogs.find((blog) => blog._id === blogId);
      if (blog?.expiryDate && new Date() > new Date(blog.expiryDate)) {
        toast.error("Blog has expired. Cannot resubmit response.");
        return;
      }

      await axios.put(`/api/blogs/${blogId}/responses/${responseId}`, {
        body: responseBody,
      });
      toast.success("Response resubmitted successfully!");
      // Refresh the blog list after resubmitting the response
      fetchAuthorBlogs();
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

      await axios.delete(`/api/blogs/${blogId}/responses/${responseId}`);
      toast.success("Response deleted successfully!");
      // Refresh the blog list after deleting the response
      fetchAuthorBlogs();
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Welcome :{userNumber} !</h1>
      <h2 className="text-2xl font-bold mb-4 text-center">Forum Posts by Your County</h2>
      {authorBlogs.map((blog) => (
        <div key={blog._id} className="mb-4 border rounded p-4">
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-600 mb-4">{blog.summary}</p>
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
          {blog.showFullBody && <p className="text-gray-600 mb-4">{blog.body}</p>}
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
                const responseBody = e.target.elements.response.value;
                handleResponseSubmit(blog._id, responseBody);
              }}
            >
              <input
                type="text"
                name="response"
                className="w-full px-3 py-2 border rounded"
                placeholder="Your response..."
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
              >
                Submit Response
              </button>
            </form>
            {/* User Responses */}
            <h2 className="text-2xl font-bold mb-4 ">Your response to this post:</h2>
            {blog.responses && blog.responses.map(
              (response) =>
                response.idNumber === userNumber && (
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

      <ToastContainer />
    </div>
  );
};

export default UserHomePage;