import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image section */}
      <div className="md:w-1/2 flex items-center justify-center md:justify-end">
        <img
          src="/images/ELEZA.png"
          alt="About Page"
          className="h-full w-full md:h-auto md:w-full object-cover"
        />
      </div>

      {/* About info section */}
      <div className="md:w-1/2 flex flex-col justify-center px-4 md:px-8 py-16 md:py-0">
        <div className="md:mb-8">
          <h2 className="text-3xl font-bold mb-4">Reason for Launch</h2>
          <p className="text-lg">
          In Kenya and many parts of sub-saharan Africa many we have witness a growing resentment towards governments and how they are perceived to behave towards its citizen.Many are with the thought that the government holds no regard to their welfare ,they see that they are left out in the decision making and only those with deep pockets can chip in to the process of decision making.In Kenya there have emerged ways to counter this issue through public participation forums but with little success.This is due to the fact that the forums are inflexible.More often than not the forums are in person which discourages attendance .People are much too busy to attend in person.The forums therefore do not add value but are instead used by cunning politicians as a means of looting finances by claiming to spend outrageous amounts in “planning” these forums.Due to this the will of the public is rarely heard and hence never considered .No wonder there are frequent protests.Eleza offers an alternative for these in person forums.Eleza provides an online platform for citizens to involve themselves in the decision making process through interacting with the arms of government .
          </p>
        </div>

        <div className="md:mb-8">
          <h2 className="text-3xl font-bold mb-4">About the Author</h2>
          <p className="text-lg">
            Eleza was compiled by;<span className=""> Denis Kabuga Mwangangi</span>.
          </p>
          <p>Learn more about the author by following the link below to his github page</p>
          <a href="https://github.com/Mwangangi1978">Denis' Github Page</a>
        </div>

        <div className="md:mb-8">
          <h2 className="text-3xl font-bold mb-4">How to Use as an Admin</h2>
          <p className="text-lg">
            Follow the following steps
          </p>
          <ol>
            <li>Sign in with provided password</li>
            <li>Start a forum and post it to public</li>
            <li>Wait for responses to make an informed decision and if necessary attend virtual meetings,</li>
          </ol>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">How to Use as a User</h2>
          <p className="text-lg">
            Add your content about how to use the app as a user here.
          </p>
          <ol>
            <li>Create an account and/or Sign in </li>
            <li>read forum posts by various county</li>
            <li>Submit a response to the forum post.</li>
            <li>Attend virtual meeting if provided.</li>
          </ol>
          <p>Note you can only submit a response if expiry date for the post has not reached!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;