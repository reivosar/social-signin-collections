## Social Sign-In Collections

This project integrates multiple social login options, including Google, Facebook, and Twitter, using the OAuth 2.0 protocol to authenticate users in a simple and secure way.

## Features

- Integration of multiple social login providers.
- Secure user authentication and session management.
- Utilizes OAuth 2.0 protocol for secure delegated access.
- Backend API to manage user sessions and retrieve user information.

## Prerequisites

- [Docker](https://www.docker.com/) for running MongoDB and Mongo Express containers.
- [Node.js](https://nodejs.org/en/) (version 14 or higher recommended).

## Setup

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start MongoDB and Mongo Express using Docker:

    Ensure Docker is running, then execute:

    ```bash
    docker-compose up -d
    ```

4. Set up environment variables:

    Copy the environment variables listed at the end of this README into a `.env` file in the backend directory.

5. Start the backend server:

    For development:

    ```bash
    npm run dev
    ```

    For production:

    ```bash
    npm run build
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Copy the environment variables listed at the end of this README into a `.env.local` file in the frontend directory.

4. Start the frontend application:

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:5173](http://localhost:5173).

## OAuth 2.0 Login Flow

The application uses the OAuth 2.0 protocol for authentication with various social login providers. The flow is as follows:

1. **User initiates login** via the frontend, selecting their preferred social login provider.
2. **Frontend redirects** the user to the provider's OAuth 2.0 authorization endpoint.
3. **User consents** to grant the application access to their information.
4. **Provider redirects** back to the frontend with an authorization code.
5. **Frontend sends** the authorization code to the backend.
6. **Backend exchanges** the authorization code for an access token.
7. **Backend retrieves** user information using the access token and creates a session.
8. **User is logged in**, with session information stored in an HttpOnly cookie for security.

## Environment Variables
Below is what you need to change.

### Backend

```env
COOKIE_SECRET=cookie_secret_here
JWT_SECRET=jwt_secret_here

GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### Frontend

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

---

Adjust the paths, environment variables, and other configurations as necessary for your project. This README provides a comprehensive guide to setting up and running both the backend and frontend parts of your project, along with a brief overview of the OAuth 2.0 login flow.
