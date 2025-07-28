# Natours API

This is the back-end API for the Natours project, a fictional tour booking application. It is a full-featured RESTful API built with Node.js, Express, MongoDB, and Mongoose, following modern best practices for building secure and performant web services.

## Features

- **RESTful Architecture:** Clean, logical, and predictable resource-oriented URLs.
- **Authentication & Authorization:** Secure JWT-based authentication and role-based (user, guide, admin) access control.
- **Advanced Filtering/Sorting/Pagination:** Powerful query capabilities for all resources.
- **Geospatial Queries:** Functionality to find tours within a specific radius.
- **Secure Payments:** Integration with Stripe for handling credit card payments.
- **File Uploads:** Support for user profile image uploads with image processing.
- **Robust Security:** Implemented measures against XSS, parameter pollution, and brute-force attacks.
- **Comprehensive Error Handling:** Centralized error handling for clear and consistent error responses.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine. You will also need a local or cloud-based MongoDB instance.

### Installation & Setup

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/QuangVu41/natours.git](https://github.com/QuangVu41/natours.git)
    cd natours
    ```

2.  **Install NPM packages**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `config.env` file in the root of the project and add the necessary environment variables. Use the `config.env.example` file as a template.

    ```env
    NODE_ENV=development
    PORT=3000

    # Database
    DATABASE=mongodb+srv://<USER>:<PASSWORD>@cluster0.yourcluster.mongodb.net/natours?retryWrites=true&w=majority
    DATABASE_LOCAL=mongodb://localhost:27017/natours
    DATABASE_PASSWORD=<DB_PASSWORD>

    # JWT
    JWT_SECRET=your-super-secret-jwt-secret
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90

    # Email (using Mailtrap or similar)
    EMAIL_USERNAME=your_email_username
    EMAIL_PASSWORD=your_email_password
    EMAIL_HOST=smtp.mailtrap.io
    EMAIL_PORT=2525

    # Stripe
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    ```

4.  **Run the server**
    ```sh
    npm start
    ```
    The API will be running at `http://localhost:3000/`.

---

## API Documentation

The base URL for all API endpoints is `/api/v1`.

### Authentication

Authentication is handled via JWT sent in an `httpOnly` cookie named `jwt`. Most `POST`, `PATCH`, and `DELETE` endpoints, as well as some `GET` endpoints, require authentication.

### **Tours**

Endpoints for interacting with tour data.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/tours` | Get all tours with filtering, sorting, and pagination. | Public |
| `GET` | `/tours/:id` | Get a single tour by its ID. | Public |
| `POST` | `/tours` | Create a new tour. | Admin, Lead-Guide |
| `PATCH` | `/tours/:id` | Update a tour's information. | Admin, Lead-Guide |
| `DELETE`| `/tours/:id` | Delete a tour. | Admin, Lead-Guide |

**Query Parameters for `GET /tours`:**
* **Filtering:** `?duration[gte]=10&difficulty=easy`
* **Sorting:** `?sort=price,-ratingsAverage`
* **Field Limiting:** `?fields=name,duration,price`
* **Pagination:** `?page=2&limit=10`

---

### **Users**

Endpoints for user management and authentication.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/signup` | Register a new user. | Public |
| `POST` | `/users/login` | Log in a user and get a JWT. | Public |
| `GET` | `/users/logout` | Log out the current user. | User |
| `POST` | `/users/forgotPassword` | Send a password reset token to user's email. | Public |
| `PATCH` | `/users/resetPassword/:token` | Reset user's password with a valid token. | Public |
| `PATCH` | `/users/updateMyPassword` | Update the logged-in user's password. | User |
| `GET` | `/users/me` | Get the logged-in user's data. | User |
| `PATCH` | `/users/updateMe` | Update the logged-in user's data (name, email). | User |
| `DELETE`| `/users/deleteMe` | "Deactivate" the logged-in user's account. | User |
| `GET` | `/users` | Get all users (for admins). | Admin |
| `GET` | `/users/:id` | Get a single user by ID. | Admin |
| `PATCH` | `/users/:id` | Update a user's data (by admin). | Admin |
| `DELETE`| `/users/:id` | Delete a user (by admin). | Admin |

---

### **Reviews**

Endpoints for creating and managing tour reviews.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/tours/:tourId/reviews` | Get all reviews for a specific tour. | Public |
| `POST` | `/tours/:tourId/reviews` | Create a new review for a tour. | User |
| `GET` | `/reviews/:id` | Get a single review by ID. | Public |
| `PATCH` | `/reviews/:id` | Update a review. | User (Owner), Admin |
| `DELETE`| `/reviews/:id` | Delete a review. | User (Owner), Admin |

---

### **Bookings**

Endpoints for managing tour bookings and payments.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/bookings/checkout-session/:tourId` | Get a Stripe checkout session for a tour. | User |
| `GET` | `/bookings` | Get all bookings. | Admin, Lead-Guide |
| `POST` | `/bookings` | Create a new booking. | Admin, Lead-Guide |
| `GET` | `/bookings/:id` | Get a single booking by ID. | Admin, Lead-Guide |
| `PATCH` | `/bookings/:id` | Update a booking. | Admin, Lead-Guide |
| `DELETE`| `/bookings/:id` | Delete a booking. | Admin, Lead-Guide |
