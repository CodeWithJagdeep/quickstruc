
<p align="center">
  <img src="https://github.com/user-attachments/assets/cd7f22da-f77d-497f-ad39-07d9d9315cf6" alt="Quickstruc Logo"/>
</p>

**Quickstruc** is a powerful npm module designed to help developers quickly set up professional React projects. It automatically generates well-organized folder structures, boilerplate code, and configurations for TypeScript and JavaScript projects, ensuring scalability and best practices.

---

## Features

- **Dynamic Folder Structure**: Automatically generates a clean, professional folder structure for your React projects.
- **Boilerplate Code**: Pre-written boilerplate for Redux setup, reusable components, API services, and more.
- **TypeScript and JavaScript Support**: Choose between TypeScript or JavaScript during project setup.
- **Tailwind CSS Integration**: Pre-configured Tailwind CSS setup out of the box.
- **Interactive CLI**: Easy-to-follow command-line interface for an intuitive setup process.
- **Performance Monitoring**: Built-in Web Vitals for tracking and improving performance.
- **Lightweight and Focused**: Perfect for small-to-medium-sized projects or quick development setups.

---

## Installation

To install **Quickstruc** globally, run the following command:

```bash
npm install -g quickstruc
```

---

## Usage

1. Create a new React project by running:

   ```bash
   npx quickstruc init
   ```

2. Follow the CLI prompts to:
   - Provide your project name.
   - Choose between TypeScript or JavaScript.

3. **Quickstruc** will:
   - Set up a professional folder structure.
   - Install all required dependencies.
   - Generate necessary boilerplate code.

4. Navigate to your project folder and start developing:

   ```bash
   cd <project-name>
   npm start
   ```

---

## Built-in Boilerplate Code

**Quickstruc** includes the following boilerplate code:

- **Redux Setup**:
  - `store.js`
  - Sample reducers and actions.
- **Reusable Components**:
  - Button and Input components in the `common` folder.
- **API Service**:
  - Pre-configured Axios instance in `ApiService.js`.
- **Routing**:
  - React Router integrated with basic routes.
- **Tailwind CSS**:
  - Pre-configured `tailwind.config.js` and `postcss.config.js`.

---

## Dependencies

The following dependencies are installed by **Quickstruc**:

- `react`, `react-dom`
- `react-router-dom`
- `redux`, `react-redux`
- `axios`
- `tailwindcss`, `postcss`
- `typescript` (if TypeScript is selected)

---

## Example Workflow

1. **Initialize the Project**:
   ```bash
   npx quickstruc init
   ```

2. **Output Folder Structure**:
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

3. **Start the Development Server**:
   ```bash
   npm start
   ```

---

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests to improve **Quickstruc**.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Feedback

We’d love to hear from you! Share your feedback on new features or improvements for **Quickstruc**. Let us know how we can make it better!

---

This version is updated to reflect your chosen project name "Quickstruc" and includes all relevant details. Let me know if you need any further adjustments!
