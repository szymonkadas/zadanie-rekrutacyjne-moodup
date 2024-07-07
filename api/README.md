# Chuck Norris Jokes Service
This Nest.js service provides an API for user authentication and retrieving Chuck Norris jokes, utilizing JWT for secure access. Users can fetch random jokes, jokes from specific categories, and replace Chuck Norris's name in jokes with any text.

### It has been made for MoodUp.academy by Szymon Kadaś in recruitment process.
## Features
- User registration and login using email and password (lasting as long as the server runs, in order to save some 
  time i've decided to not implement db connection)
- JWT-based authentication
- Fetching random Chuck Norris jokes
- Fetching Chuck Norris jokes by category
- Fetching joke categories
## Installation
Make sure you have [Node.js](http://nodejs.org/) installed. Then, clone this repository and install its dependencies.
sh
git clone https://link_do_repo
cd backend
npm install
## Environment Setup
Env is already provided for convenience.

## Running the App
After the installation, you can start the service locally using:
sh
npm run start
For development, you can watch for changes to your files and automatically restart the server using:
sh
npm run start:dev
## API Usage
### Endpoints:
- **POST** /auth/register - Register a new user and receive a JWT
    - Body: { email: string, password: string }
- **POST** /auth/login - Login a user and receive a JWT
    - Body: { email: string, password: string }
- **GET** /jokes/random - Fetch a random Chuck Norris joke (JWT required)
- **GET** /jokes/category - Fetch a random Chuck Norris joke from a specific category (JWT required)
    - Query: ?category=category_name
- **GET** /jokes/categories - Fetch all available Chuck Norris joke categories (JWT required)
## Security
This application uses JWT (JSON Web Tokens) for managing the authentication of API requests. The secret key used for signing the tokens is specified as an environment variable (JWT_SECRET).
Ensure that you keep your .env file secure and never commit it to your version control system.
## Testing
Well there is little to no but basic starter tests included so... But if you want to feel free to run tests by 
executing:
sh
npm test