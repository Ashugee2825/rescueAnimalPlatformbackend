# Rescue Animal Platform – Backend

## Project Description

The **Rescue Animal Platform Backend** is a Node.js–based REST API designed to support a complete animal rescue and adoption ecosystem. The platform enables shelters, volunteers, and adopters to interact through a centralized system that manages pets, adoption requests, meetings, communication, and donations.

This backend service provides secure authentication, role-based access control, payment processing, and real-time interaction features required to manage animal rescue operations efficiently.

The goal of the project is to create a **scalable and modular backend architecture** that supports animal shelters in managing rescue operations while helping users adopt pets easily and transparently.

---

## Key Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control (Admin, Shelter, Volunteer, User)

### Pet Management

* Add, update, and delete pets
* Manage pet adoption status
* Upload pet images

### Adoption System

* Submit adoption requests
* Track adoption application status
* Shelter approval workflow

### Shelter Management

* Register and manage animal shelters
* Assign volunteers
* Manage rescued animals

### Volunteer Management

* Volunteer registration
* Shelter volunteer assignment
* Activity tracking

### Chat & Communication

* Real-time chat between adopters and shelters
* Messaging system for support

### Meetings

* Schedule meetings between adopters and shelters
* Manage adoption interviews

### Payment Integration

* Stripe payment gateway integration
* Wallet management
* Donation support

### Reviews & Feedback

* Users can review shelters
* Ratings system

### Support System

* Support ticket creation
* Admin response management

### Automation

* Cron jobs for automated system tasks
* Perk allocation system

---

## Project Architecture

```
rescue-platform-backend
│
├── server.js
├── package.json
│
├── src
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   ├── services
│   ├── utils
│   └── cron
```

### Layer Responsibilities

**Controllers**
Handle API request logic.

**Routes**
Define application API endpoints.

**Models**
Database schema definitions.

**Services**
Business logic and external integrations.

**Middlewares**
Authentication, authorization, logging, and error handling.

**Config**
Application configuration files such as database, AWS, JWT, and Stripe.

---

## Technologies Used

* Node.js
* Express.js
* Sequelize ORM
* MySQL / PostgreSQL
* JWT Authentication
* Stripe Payment API
* AWS S3 (file storage)
* Cron Jobs
* REST API Architecture

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/Ashugee2825/rescueAnimalPlatformbackend.git
```

### 2. Navigate to project directory

```
cd rescueAnimalPlatformbackend
```

### 3. Install dependencies

```
npm install
```

### 4. Configure environment variables

Create a `.env` file and configure:

```
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
```

### 5. Run the server

```
npm start
```

Server will start on:

```
http://localhost:5000
```

---

## API Modules

* Authentication
* Pets
* Adoption
* Shelter
* Volunteer
* Chat
* Meeting
* Wallet
* Payments
* Reviews
* Support Tickets
* Admin

---

## Future Improvements

* WebSocket real-time chat
* AI-based pet recommendation
* Image recognition for pets
* Mobile application integration
* Analytics dashboard for shelters

---

## Author

**Ashutosh Kumar**

Full Stack Developer (MERN / Node.js / DevOps)

---

## License

This project is licensed under the MIT License.
