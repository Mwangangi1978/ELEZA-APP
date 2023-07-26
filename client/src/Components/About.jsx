import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image section */}
      <div className="md:w-1/2 flex items-center justify-center md:justify-end">
        <img
          src="/public/images/ELEZA.png"
          alt="About Page"
          className="h-full w-full md:h-auto md:w-full object-cover"
        />
      </div>

      {/* About info section */}
      <div className="md:w-1/2 flex flex-col justify-center px-4 md:px-8 py-16 md:py-0">
        <div className="md:mb-8">
          <h2 className="text-3xl font-bold mb-4">Reason for Launch</h2>
          <p className="text-lg">
            Add your content about the reason for launching the app here.
          </p>
        </div>

        <div className="md:mb-8">
          <h2 className="text-3xl font-bold mb-4">About the Author</h2>
          <p className="text-lg">
            Add your content about the author of the app here.
          </p>
        </div>

        <div className="md:mb-8">
          <h2 className="text-3xl font-bold mb-4">How to Use as an Admin</h2>
          <p className="text-lg">
            Add your content about how to use the app as an admin here.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">How to Use as a User</h2>
          <p className="text-lg">
            Add your content about how to use the app as a user here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;