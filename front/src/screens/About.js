import React, { useState } from "react";
import { RecentChat } from "../components/recentChat";

function About(props) {
  const [showFullText, setShowFullText] = useState(false);

  const handleReadMoreClick = () => {
    setShowFullText(!showFullText);
  };

  const text = `
    We're excited to have you here and we hope you'll enjoy using our app to stay connected with your friends,
    family, and colleagues. Our chat app is designed to be intuitive, user-friendly, and secure. 
   You can easily create an account, add your contacts, and start chatting right away. 
 You can also create groups for group chats and add your own status.. 
 Our team is dedicated to providing you with the best chat experience possible. 
       We're constantly working on improving our app and adding new features to make it even better.
        If you have any feedback, suggestions, or issues, please don't hesitate to contact us. 
      Thank you for choosing our chat app. We hope you'll enjoy using it as much as we do!
        
  `;

  const truncatedText = text.slice(0, 365) + "...";
  const fullText = text.slice(365);

  const renderedText = showFullText ? (
    <React.Fragment>
      {truncatedText}
      {fullText}
    </React.Fragment>
  ) : (
    truncatedText
  );

  return (
    <div className="max-h-full overflow-auto no-scrollbar">
    <div class="font-bold text-base md:text-sm shadow-md ">
      <div class="flex justify-around items-center h-14 w-full bg-profile">
        <div class="text-white lg:text-xl">{props.name}</div>
      </div>
    </div>
    <div class="about-section ">
      <h1 class="text-2xl font-bold mb-4">Welcome to our chat app!</h1>
      
      <div class="border border-gray-100 rounded-lg p-4 box-decoration-slice bg-gradient-to-r from-indigo-100 to-white-500 text-white px-5">
        <p class="text-gray-700 mb-4 indent-8 text-sm items-start text-justify">{renderedText}</p>
        {text.length > 200 && (
          <button class="px-4 py-2 bg-gradient-to-r from-indigo-300 to-white-500 text-white rounded hover:bg-blue-500" onClick={handleReadMoreClick}>
            {showFullText ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
    <div>
      <ul class="mt-4 list-none text-sm truncate">
        <li class="mb-2 text-base">Developed By</li>
        <li class="mb-2 text-sky-500"><a href="mailto:ademecheklie78@gmail.com">ademecheklie78@gmail.com</a></li>
        <li class="mb-2 text-sky-500"><a href="mailto:asamenewhermela@gmail.com">asamenewhermela@gmail.com</a></li>
        <li class="mb-2 text-sky-500"><a href="mailto:fanuelalmawstop@gmail.com">fanuelalmawstop@gmail.com</a></li>
        <li class="mb-2 text-sky-500"><a href="mailto:kidistmamaye2002@gmail.com">kidistmamaye2002@gmail.com</a></li>
      </ul>
    </div>
  </div>
  );
}

export default About;
