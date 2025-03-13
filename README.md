
# Project Kanban

Kanban Board is a web-based project management tool designed to help teams and individuals visualize and manage tasks efficiently. With a user-friendly interface, it allows seamless task tracking, collaboration, and progress monitoring.


## Project Structure
The Project is divided into -

1)Frontend: Built with Vite and React.\
2)Backend: Built with Node.js and MongoDB(locally).

## Project Prerequistes
Ensure you have the following installed on your system:

1)Node.js ([Link]( https://nodejs.org/en))\
2)MongoDB ([Community Edition]( 
https://www.mongodb.com/products/self-managed/community-edition ))

If you face problem to set up mongodb locally, refer ([Link]( 
https://www.youtube.com/watch?v=1LiZRYzgM2o ))

## Run Locally

Clone the project

```bash
  git clone https://github.com/subhadeep-2004/Kanban_Board.git
```

Go to the project directory

```bash
  cd Kanban_Board
  cd frontend
```

Install dependencies for frontend

```bash
  npm install
```

Start the frontend

```bash
  npm run dev
```
To move to the backend folder after starting the frontend, follow these steps:

1)Open a new **terminal window or tab** while the frontend server is running. This allows the frontend to keep running without interruption.

2)Navigate to the backend folder:

```bash
  cd backend
```
3)Install backend dependencies (if not done already):

```bash
 npm install

```

4)Start the backend server with Nodemon:

```bash
 node index.js

```
**Note - Make sure your mongodb is running locally at 127.0.0.1:27017, for clear view use mongodb compass.**

