


# Full Stack Web Application with DevOps Automation

This project is a complete full-stack web application that demonstrates the integration of a Spring Boot backend, a React frontend, and a PostgreSQL database. The primary focus of this repository is to showcase modern DevOps practices, including containerization with Docker and automated CI/CD pipelines.

## Project Overview

The application is a User Management System that allows for user registration and listing. It is built using a microservices architecture approach:

- **Frontend:** A React.js application that provides the user interface.
- **Backend:** A Spring Boot (Java 17) REST API that handles business logic and security.
- **Database:** A PostgreSQL instance for persistent data storage.
- **Infrastructure:** The entire stack is containerized. In the production environment, a GitLab CI/CD pipeline automatically builds and deploys these services to an AWS EC2 instance.

## Repository Structure

The project is organized as a monorepo with the following directories:

- **auth-frontend:** Contains the React source code and its Dockerfile.
- **auth-backend:** Contains the Spring Boot source code and its Dockerfile.
- **auth-infra:** Contains the Docker Compose configuration for the database infrastructure.

## Prerequisites

To run this project locally, ensure you have the following installed:

- Docker and Docker Desktop
- Java 17 (Optional, if running natively)
- Node.js (Optional, if running natively)

## How to Run Locally

Follow these steps to bring up the application on your local machine.

### 1. Start the Database
Navigate to the infrastructure directory and start the PostgreSQL container using Docker Compose:

```bash
cd auth-infra
docker-compose up -d

```

### 2. Start the Backend

Navigate to the backend directory and run the application. The Maven wrapper is included, so you do not need to install Maven manually.

```bash
cd ../auth-backend
./mvnw spring-boot:run

```

The backend API will start on port 8080.

### 3. Start the Frontend

Navigate to the frontend directory. Since the application uses environment variables for the API connection, you need to define the backend URL before starting.

**Install Dependencies:**

```bash
cd ../auth-frontend
npm install

```

**Run Application (Mac/Linux):**

```bash
export REACT_APP_API_URL=http://localhost:8080/auth
npm start

```

**Run Application (Windows PowerShell):**

```powershell
$env:REACT_APP_API_URL="http://localhost:8080/auth"
npm start

```

The frontend application will start on port 3000.

## Deployment Architecture

The production deployment is fully automated using GitLab CI/CD. The pipeline performs the following operations on an AWS Ubuntu server:

1. **Connection:** Authenticates with the remote server via SSH.
2. **Cleanup:** Removes outdated containers and images to optimize disk usage.
3. **Build:** Builds Docker images for the frontend and backend services directly on the server. The frontend build process injects the API URL as a build argument.
4. **Deploy:** Runs the new containers on a dedicated Docker network, ensuring secure communication between the API and the database.



