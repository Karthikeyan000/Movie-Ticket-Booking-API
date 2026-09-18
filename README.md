# Movie Ticket Booking API

A REST API for managing movies, theatres, locations, showtimes, users, and ticket bookings. The application is built with Node.js, Express, Sequelize, and PostgreSQL, and uses JWT bearer tokens for protected resources.

## Features

- User registration and login
- JWT-based authentication
- Movie and theatre management
- Location and showtime management
- Movie show scheduling
- Ticket booking
- PostgreSQL persistence through Sequelize

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL

## Installation

Clone the repository, install dependencies, and create a local environment file:

```bash
npm install
```

The application loads `.env.local` when `NODE_ENV=local`. Use the following variables as a template and replace the placeholder values with your own credentials:

```env
NODE_ENV=local
PORT=3002

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=ticketBooking
DB_DIALECT=postgres

ACCESS_TOKEN_SECRET=replace-with-a-long-random-secret
ACCESS_TOKEN_EXPIRATION=7d
```

Do not commit real database passwords or token secrets to source control.

## Running Locally

```bash
npm run local
```

The server listens on port `3002` by default when `PORT=3002` is configured. The local script starts the server with Nodemon and reloads it when source files change.

## API

The base URL is:

```text
http://localhost:3002/api/v1
```

### Authentication

These endpoints do not require a token:

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/signUp` | Register a user |
| `POST` | `/login` | Authenticate a user and receive a JWT |

Send the token returned by `/login` with protected endpoints:

```http
Authorization: Bearer <access-token>
```

### Protected endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/movies` | Add a movie |
| `GET` | `/movies` | List movies |
| `POST` | `/theatres` | Add a theatre |
| `GET` | `/theatres` | List theatres |
| `POST` | `/locations` | Add a location |
| `GET` | `/locations` | List locations |
| `POST` | `/showTime` | Add a showtime |
| `GET` | `/showTime` | List showtimes |
| `GET` | `/upComingMovies` | List upcoming movies |
| `POST` | `/addMovieShowToTheatre/:movieId` | Schedule a movie at a theatre |
| `GET` | `/getAllMovieShows` | List movie shows |
| `POST` | `/bookTicket/:movieId` | Book a ticket for a movie |

Request bodies are JSON. Include this header when sending JSON payloads:

```http
Content-Type: application/json
```

## Database Migrations

If Sequelize CLI is not installed globally, use `npx`:

```bash
npx sequelize-cli init
npx sequelize-cli migration:generate --name add-column
npx sequelize-cli db:migrate
```

Review generated migrations before applying them, and ensure the Sequelize CLI configuration uses the same environment-specific database settings as the application.

## Response Status Codes

| Status | Meaning |
| --- | --- |
| `200` | Request completed successfully |
| `400` | Bad request or unexpected request error |
| `401` | Unauthorized credentials |
| `403` | Missing, invalid, or expired access token |
| `404` | Requested resource was not found |
| `409` | Resource already exists or conflicts with existing data |
| `422` | Required input is missing or invalid |
| `500` | Internal server error |

## Available Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run local` | Run the API with Nodemon in local mode |
| `npm test` | Run the test suite |

## Project Structure

```text
app/
  config/          Database configuration
  controllers/     Request handlers
  middleware/      Authentication middleware
  models/          Sequelize models
  routes/          API route definitions
  utils/           Shared helpers and token utilities
server.js          Application entry point
```