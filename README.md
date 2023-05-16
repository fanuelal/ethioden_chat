# Chat App
The Chat App is a web application that allows users to communicate with each other in real-time through chat rooms. It consists of both front-end and back-end components.

## Features
User registration and authentication
Create, join, and leave chat rooms
Real-time messaging within chat rooms
Delete and edit messages
User profile management
Technologies Used
Front-end
HTML, CSS, JavaScript
React.js
WebSocket for real-time messaging
Back-end
Node.js
Express.js
WebSocket for real-time messaging
Database using MySQL, for storing user and chat room information
## Installation
Clone the repository: git clone <repository-url>
Navigate to the project directory: cd chat-app
Install the required dependencies:
For the front-end: cd frontend && npm install
For the back-end: cd backend && npm install
Set up the database and configure the connection settings in the back-end application.
Start the front-end development server: cd frontend && npm start
Start the back-end server: cd backend && npm start
Access the application at http://localhost:3000 in your web browser.
Configuration
### Front-end
The front-end configuration file is located at frontend/src/config.js. Update the necessary variables such as the API endpoint URLs.
### Back-end
The back-end configuration file is located at backend/config.js. Update the necessary variables such as the database connection details and WebSocket server configuration.
## Usage
Register a new user account or log in with existing credentials.
Create a new chat room or join an existing one.
Send and receive real-time messages within the chat room.
Customize your user profile settings.
Delete or edit your messages if necessary.
Leave the chat room when you're done.
Contributing
If you'd like to contribute to this project, you can follow these steps:

## Fork the repository on GitHub.
Clone your forked repository to your local machine.
Create a new branch: git checkout -b my-new-feature
Make your changes and commit them: git commit -am 'Add some feature'
Push the changes to your forked repository: git push origin my-new-feature
Submit a pull request to the original repository.
## License
This project is licensed under the MIT License.

# Acknowledgements
React documentation
Node.js documentation
Express.js documentation
WebSocket documentation