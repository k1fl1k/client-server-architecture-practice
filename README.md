# Fastify Client-Server Architecture Project

## Description

This project is a simple Node.js application using Fastify for the server-side framework. It serves various endpoints for managing resources and includes Docker for containerization and Nginx as a reverse proxy.

## Installation

### Prerequisites

- Docker
- Docker Compose

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/k1fl1k/fastify-client-service.git
    cd fastify-client-service
    ```

2. Build and start the Docker containers:
    ```bash
    docker-compose up --build
    ```

## Usage

Once the containers are up and running, you can access the application at `http://localhost`.

### Endpoints

- `POST /api/echo`: Echoes the received data.
- `GET /resources`: Fetches all resources.
- `GET /resources/:id`: Fetches a resource by ID.
- `POST /resources`: Creates a new resource.
- `PUT /resources/:id`: Updates a resource by ID.
- `DELETE /resources/:id`: Deletes a resource by ID.

### Static Files

- `http://localhost`: Serves static files from the `./html` directory.
- Custom 404 page for non-existent routes.

## Project Structure

- `Dockerfile`: Defines the Docker image for the Node.js application.
- `docker-compose.yml`: Configures the services and networks for Docker Compose.
- `nginx/nginx.conf`: Nginx configuration file.
- `app.js`: The main Node.js application file.
- `server.js`: The entry point for the Fastify server.
- `config.js`: Configuration file for environment variables.
- `routes/`: Directory containing route handlers.
- `repositories/`: Directory containing the resource repository.
- `html/`: Directory containing static HTML files.
- `static/`: Directory for static assets served by Nginx.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

All contributing are welcomed.

## License

This project is licensed under the MIT License.
