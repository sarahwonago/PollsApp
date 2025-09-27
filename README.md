# Polling App

A simple full-stack polling application built with Django REST Framework (backend in Docker) and React + Material UI (frontend via npm).
Users can register, log in, create polls, vote, and view real-time results.

# Features

- User Authentication (JWT-based)

- Create Polls with multiple options and expiry date

- Vote Once Per Poll (unique per user)

- View Results live with vote counts

- Modern UI with Material UI

- Protected Routes for logged-in users

# Tech Stack

## Backend (Dockerized)

- Django

- Django REST Framework (DRF)

- JWT Authentication (djangorestframework-simplejwt)

- Postgresql db

## Frontend

- React

- Material UI (MUI v5)

- React Router v6

- Axios

# Getting Started

1. Clone the Repository
   `git clone https://github.com/sarahwonago/PollsApp`
   `cd PollsApp/Backend`

2. Start the Backend (Django in Docker)

Make sure you have Docker & Docker Compose installed.

`docker-compose up --build`

This will:

- Build the Django backend image

- Run migrations automatically

- Start the backend on http://localhost:8000

- You can view backend logs with:

`docker-compose logs -f backend`

3. Start the Frontend (React with npm)

Open a new terminal:

`cd Frontend`
`npm install`
`npm start`

Frontend will run at: http://localhost:3000

It will communicate with the backend running in Docker.

# API Endpoints

Method Endpoint Description Auth Required
POST /api/register/ Register a new user ❌
POST /api/token/ Obtain JWT tokens ❌
POST /api/token/refresh/ Refresh JWT access token ❌
GET /api/polls/ List all polls ✅
POST /api/polls/ Create a new poll ✅
GET /api/polls/:id/ Poll details + options ✅
POST /api/options/ Add option to a poll ✅
POST /api/votes/ Vote on an option ✅
