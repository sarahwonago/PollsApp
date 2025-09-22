# Online Poll System Backend

## Real-World Application

This project simulates backend development for applications requiring real-time data processing. Developers gain experience with:

- Building scalable APIs for real-time voting systems.
- Optimizing database schemas for frequent operations.
- Documenting and deploying APIs for public access.

---

## Overview

This case study focuses on creating a backend for an online poll system.  
The backend provides APIs for **poll creation**, **voting**, and **real-time result computation**.  
The project emphasizes **efficient database design** and **detailed API documentation**.

---

## Project Goals

The primary objectives of the poll system backend are:

- **API Development**: Build APIs for creating polls, voting, and fetching results.
- **Database Efficiency**: Design schemas optimized for real-time result computation.
- **Documentation**: Provide detailed API documentation using Swagger.

---

## Technologies Used

- **Django**: High-level Python framework for rapid development.
- **PostgreSQL**: Relational database for poll and vote storage.
- **Swagger**: For API documentation.

---

## Key Features

### 1. Poll Management

- APIs to create polls with multiple options.
- Include metadata such as creation date and expiry.

### 2. Voting System

- APIs for users to cast votes.
- Implement validations to prevent duplicate voting.

### 3. Result Computation

- Real-time calculation of vote counts for each option.
- Efficient query design for scalability.

### 4. API Documentation

- Use Swagger to document all endpoints.
- Host documentation at `/api/docs` for easy access.

## Authentication & Security

- Implements JWT-based authentication for user actions.
- Validates all inputs and applies rate limiting to prevent abuse.

## Testing & Quality Assurance

- Automated tests using Django’s test framework.
- Code linting with flake8 and formatting with black.

## Deployment

- Dockerized for easy deployment.
- Hosted on [Heroku](https://heroku.com/) (link to be added).

## Caching & Performance

- Uses Redis to cache poll results for real-time performance.
- Database queries optimized with proper indexing.

## API Documentation

- Swagger/OpenAPI docs available at `/api/docs`.

## Professional Practices

- Follows GitHub Flow for version control.
- [ERD Diagram](link) | [Slides](link)
