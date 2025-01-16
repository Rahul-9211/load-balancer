# Node.js Load Balancer

This project is a simple Node.js load balancer that distributes incoming HTTP requests across multiple server instances. It uses the `express` framework for handling HTTP requests and `axios` for forwarding requests to backend servers. The load balancer supports both round-robin and least-connections algorithms.

## Project Structure

- **loadbalancer.js**: The main file for the load balancer. It handles incoming requests and forwards them to the backend servers.
- **server.js, server2.js, server3.js**: Example server instances that the load balancer can distribute requests to.
- **index.js**: Demonstrates vertical scaling using Node.js's `cluster` module.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Contains project metadata and dependencies.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/node-loadbalancer.git
   cd node-loadbalancer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   LOAD_BALANCER_PORT=3000
   SERVER_1_URL=http://localhost:3001
   SERVER_2_URL=http://localhost:3002
   SERVER_3_URL=http://localhost:3003
   SERVER_1_PORT=3001
   SERVER_2_PORT=3002
   SERVER_3_PORT=3003
   ```

## Usage

1. Start the load balancer:
   ```bash
   npm run start-lb
   ```

2. Start the server instances:
   ```bash
   npm run server1
   npm run server2
   npm run server3
   ```

3. Access the load balancer at `http://localhost:3000`. It will distribute requests to the available servers.

## Load Balancing Algorithms

- **Round Robin**: Distributes requests evenly across all servers.
- **Least Connections**: Directs requests to the server with the fewest active connections (uncomment the relevant code in `loadbalancer.js` to use this algorithm).

## Health Check

Each server has a basic health check endpoint at `/health` that returns the server's status and process ID.

## Error Handling

The load balancer and servers include basic error handling to log errors and return a 500 status code for internal server errors.

## License

This project is licensed under the ISC License.

## Author

Rahul Rawat [@rahul-rawat](https://hackrest.com/)