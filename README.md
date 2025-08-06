# MERN Stack Student Exam Portal

This is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to register, log in, and take a timed exam. The application securely authenticates users using JWT and stores user data, questions, and results in a MongoDB Atlas database.

## Features

-   **User Authentication**: Secure user registration and login with JWT (JSON Web Tokens).
-   **Timed Exam**: A timed exam session that auto-submits when the timer runs out.
-   **Dynamic Questions**: Questions are fetched dynamically from the MongoDB database.
-   **Score Calculation**: The backend calculates the user's score upon submission.
-   **Responsive UI**: A clean user interface built with React and styled with Tailwind CSS.

## Tech Stack

-   **Frontend**: React, React Router, Axios, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose and MongoDB Atlas)
-   **Authentication**: JSON Web Token (JWT), bcryptjs

---

## Setup and Installation

### Prerequisites

-   Node.js and npm (or yarn) installed.
-   A free MongoDB Atlas account for the database.

### Backend Setup

1.  **Clone the repository and navigate to the backend folder:**
    ```
    git clone <your-github-repo-link>
    cd StudentExamHub/backend
    ```

2.  **Install dependencies:**
    ```
    npm install
    ```

3.  **Create the environment file:**
    Create a file named `.env` in the `backend` directory and add the following variables.

    ```
    # Your MongoDB Atlas connection string
    MONGODB_URI="mongodb+srv://..."

    # Your secret key for signing JWTs
    JWT_SECRET="your-super-secret-string"
    ```

4.  **Start the server:**
    
    npm start
   
    The server will start on `http://localhost:5001`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    Open a new terminal and navigate to the `frontend` folder.
   
    cd ../frontend
 

2.  **Install dependencies:**
    
    npm install
  

3.  **Start the React application:**
    ```
    npm start
    ```
    The application will open in your browser at `http://localhost:3000` (or another port like 5173 if you are using Vite).

---

## API Endpoints Testing (curl Commands)

You can use the following `curl` commands to test the API endpoints.

### 1. Register a New User
 curl -X POST http://localhost:5001/api/auth/register
-H "Content-Type: application/json"
-d '{
"name": "Test User",
"email": "pppp@gmail.com",
"password": "pppp@gmail.com"
}'

### 2. Login as a User

This will return a JWT token that you need for protected routes.
curl -X POST http://localhost:5001/api/auth/login
-H "Content-Type: application/json"
-d '{
"email": "pppp@gmail.com",
"password": "pppp@gmail.com"
}'

### 3. Start the Exam (Protected Route)

Replace `YOUR_JWT_TOKEN` with the token you received from the login endpoint.

curl -X GET http://localhost:5001/api/exam/start
-H "Authorization: Bearer YOUR_JWT_TOKEN"

### 4. Submit Exam Answers (Protected Route)

Replace `YOUR_JWT_TOKEN` with your token and update the `questionId` values to match those in your database.

curl -X POST http://localhost:5001/api/exam/submit
-H "Content-Type: application/json"
-H "Authorization: Bearer YOUR_JWT_TOKEN"
-d '{
"answers": [
{
"questionId": "your_question_id_from_db",
"selected": 2
},
{
"questionId": "another_question_id_from_db",
"selected": 1
}
]
}'