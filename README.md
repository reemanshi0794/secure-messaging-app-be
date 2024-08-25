# secure-messaging-app-be
The Secure Messaging Web App provides a secure platform for users to communicate via encrypted messages. The backend of this application is built using Node.js, with PostgreSQL as the database managed through Sequelize ORM. Authentication is handled via JWT, and user passwords are stored in encrypted form.Real-time messaging is supported using WebSocket.


# Technologies Used
Node.js: JavaScript runtime for server-side logic.
PostgreSQL: Relational database system.
Sequelize: ORM for PostgreSQL.
JWT: For authentication and authorization.
bcrypt: For hashing passwords.
WebSocket: For real-time communication.
Nodemon: For automatic server restarts during development.


git clone [\[REPOSITORY_URL\]](https://github.com/reemanshi0794/secure-messaging-app-be.git)
# Run the following command to install the required npm packages:
npm install
npm install -g nodemon
npm start

# Create a .env file in the root directory of the project and add the following environment variables:

PORT=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
JWT_SECRET=
JWT_EXPIRATION=
DATABASE_URL=

# If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

