# Flask + React Project

This project is an e-commerce web application that uses Flask as its backend framework and React with Vite for the frontend. It demonstrates how to integrate a Flask backend with a React frontend for full-stack web development.

## Technologies used:

### Backend

- Python/Flask
- MySQL
- sqlite (for testing)
- SQLAlchemy (ORM)
- JWT Tokens for auth
- Unittest

### Frontend

- React+vite
- Tailwind css

### External services

- Google auth (Oauth)
- Paypal payment (payment method)

## Prerequisites

Before you begin, ensure you have installed the following on your development machine:

- Python 3.8 or later
- Node.js 14 or later
- npm (usually comes with Node.js)

## Setup

To get started with this project, follow these steps:

### Backend Setup

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Abdelhay1212/E-comerce_web_app_flask_react.git
```

2. Navigate to the repository

```bash
cd E-comerce_web_app_flask_react/
```

3. Navigate to the backend directory

```bash
cd backend
```

4. Create a virtual environment and activate it

```bash
# For Unix/macOS
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
.\venv\Scripts\activate
```

5. Install the required Python packages

```bash
pip install -r requirements.txt
```

6. Start the Flask application

When the app runs it uses sqlite so you don't need to install and create MySQL database.

```bash
python -m api.v1.app
```

Your Flask backend should now be running on http://localhost:5000.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory from the project root

```bash
cd frontend
```

2. Install the required npm packages

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

Your React application will be running on http://localhost:5173, and it should be connected to the Flask backend.
