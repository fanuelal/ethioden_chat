import React from 'react';
import { RecentChat } from '../components/recentChat';

function About(props) {
  return (
    <div>
        <RecentChat name={props.name}/>
      <h1 >Welcome to our chat app!</h1>
      <p>We're excited to have you here and we hope you'll enjoy using our app to stay connected with your friends,
         family, and colleagues.</p>
      <p>Our chat app is designed to be intuitive, user-friendly, and secure. You can easily create an account, 
        add your contacts, and start chatting right away.
         You can also create groups for group chats and share photos, videos, and other files with your friends.</p>
      <p>We take your privacy and security seriously. Our app uses end-to-end encryption to ensure that your 
        messages are protected and only visible to you and your recipients. We also don't store any of your 
        messages on our servers, so you can have peace of mind knowing that your conversations are private.</p>
      <p>Our team is dedicated to providing you with the best chat experience possible. We're constantly 
        working on improving our app and adding new features to make it even better. If you have any feedback,
         suggestions, or issues, please don't hesitate to contact us.</p>
      <p>Thank you for choosing our chat app. We hope you'll enjoy using it as much as we do!</p>
    </div>
  );
}

export default About;