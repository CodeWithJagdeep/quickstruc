<p align="center">
  <img src="https://github.com/user-attachments/assets/cd7f22da-f77d-497f-ad39-07d9d9315cf6" alt="QuickStruc Logo"/>
</p>

# QuickStruc

QuickStruc is an open-source tool that helps developers generate professional folder structures and boilerplate code for React.js and Node.js projects. With QuickStruc, you can set up a backend or frontend project with essential configurations in minutes, saving time and ensuring best practices.

---

## Installation

To install QuickStruc, use npm:

```bash
npm install -g quickstruc
```

---

## Features

### React

- **Dynamic Folder Structure**: Automatically generates a clean, professional folder structure for your React projects.
- **Boilerplate Code**: Pre-written boilerplate for Redux setup, reusable components, API services, and more.
- **TypeScript and JavaScript Support**: Choose between TypeScript or JavaScript during project setup.
- **Tailwind CSS Integration**: Pre-configured Tailwind CSS setup out of the box.
- **Interactive CLI**: Easy-to-follow command-line interface for an intuitive setup process.
- **Performance Monitoring**: Built-in Web Vitals for tracking and improving performance.

### Node.js

- **Tech Stack Flexibility**: Generate boilerplate code for Node.js projects.
- **Database Support**: Supports MongoDB, MySQL, and PostgreSQL with dynamic configuration options.
- **TypeScript and JavaScript Support**: Generate folder structures and boilerplate for both JavaScript and TypeScript.
- **Built-in Security**: Includes configurations for XSS protection, HPP prevention, rate limiting, and more.
- **Authentication**: Pre-configured JWT authentication service.
- **Docker Support**: Docker files are auto-generated for containerized setups, including database configurations.
- **Email Service**: Pre-configured email service for user notifications.
- **Dynamic Folder Structures**: Automatically generates professional folder structures based on selected options.

---

## Usage

### React Project

1. Create a new React project by running:

   ```bash
   npx quickstruc init
   ```

2. Follow the CLI prompts to:

   - Provide your project name.
   - Choose between TypeScript or JavaScript.

3. QuickStruc will:

   - Set up a professional folder structure.
   - Install all required dependencies.
   - Generate necessary boilerplate code.

4. Navigate to your project folder and start developing:

   ```bash
   cd <project-name>
   npm start
   ```

### Node.js Project

1. Initialize a new Node.js project:

   ```bash
   quickstruc init
   ```

2. Follow the CLI prompts to:

   - Choose between JavaScript and TypeScript.
   - Select a database (MongoDB, MySQL, or PostgreSQL).
   - Enable or disable Docker configuration.

3. QuickStruc will:
   - Generate a professional folder structure.
   - Configure your project with security features.
   - Set up a database connection and authentication.

---

## Example Outputs

### React Folder Structure

```
Project initialized successfully!
Folder structure:
├── assets/
├── component/
├── container/
├── hooks/
├── service/
├── config/
├── util/
└── src/
```

### Node.js Folder Structure

```
my-nodejs-project/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── services/
│   ├── models/
│   └── utils/
├── .env
├── Dockerfile
├── docker-compose.yml
├── README.md
└── package.json
```

---

## Security Features

QuickStruc includes the following security features by default:

1. **Cross-Site Scripting (XSS) Protection**: Prevents malicious scripts from being executed in the user's browser.
2. **HTTP Parameter Pollution (HPP) Prevention**: Ensures HTTP requests are sanitized to prevent attackers from tampering with request parameters.
3. **NoSQL Injection (NAF) Mitigation**: Guards against injection attacks targeting NoSQL databases.
4. **Rate Limiting**: Limits the number of API requests to prevent abuse and DoS attacks.
5. **CORS Settings**: Configures Cross-Origin Resource Sharing to control which origins can access your API.
6. **Secure Environment Variable Management**: Ensures sensitive data like API keys and secrets are not hardcoded but managed securely using environment variables.

---

## .env Configuration

Below is the detailed `.env` configuration for a Node.js project:

```env
# ------------------------------
# Server Configuration
# ------------------------------
PORT=8000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000

# ------------------------------
# Database Configuration
# ------------------------------
DB_NAME=mydb
DB_USER=root
DB_PASSWORD=yourpassword
DATABASE_URL="mysql://root:yourpassword@db:3306/mydb"

# ------------------------------
# JWT Configuration
# ------------------------------
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h

# ------------------------------
# Email Server Configuration
# ------------------------------
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your_email@example.com
MAIL_PASSWORD=your_email_password
MAIL_FROM_NAME=YourAppName
MAIL_FROM_ADDRESS=no-reply@example.com

# ------------------------------
# Docker Configuration
# ------------------------------
DOCKER_ENV=development
```

> **Note**: Update the `DATABASE_URL` host to `db` when using Docker networking for database connectivity.

---

## Contributions

We welcome contributions to QuickStruc! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push the branch and submit a pull request.

---

## License

QuickStruc is licensed under the MIT License. See `LICENSE` for more details.

---

## Contact

For support or questions, please reach out via [GitHub Issues](https://github.com/your-repo/issues).
