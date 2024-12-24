
![Reactify Logo](https://github.com/user-attachments/assets/beb04aa0-7158-4fae-b952-55e8718fab67)

Reactify is a powerful npm module designed to help developers streamline the setup of professional React projects. It dynamically generates folder structures, boilerplate code, and configurations for TypeScript and JavaScript projects, ensuring best practices and scalability.

---

## Features

- **Dynamic Folder Structure**: Automatically creates a professional and well-organized folder structure for your React projects.
- **Boilerplate Code**: Includes pre-written code for Redux setup, reusable components, API services, and more.
- **TypeScript and JavaScript Support**: Allows you to choose between TypeScript or JavaScript during setup.
- **Tailwind CSS Integration**: Comes with pre-configured Tailwind CSS setup.
- **Interactive CLI**: Guides you through project setup using an intuitive command-line interface.
- **Performance Metrics**: Includes Web Vitals for performance monitoring.
- **Lightweight and Focused**: Ideal for small-to-medium-scale projects or developers looking for quick setups.

---

## Installation

To install Reactify globally, run:

```bash
npm install -g reactify
```

---

## Usage

1. Run the following command to create a new React project:

   ```bash
   npx reactify init
   ```

2. Follow the CLI prompts to:
   - Enter your project name.
   - Choose between TypeScript or JavaScript.

3. Reactify will:
   - Set up a professional folder structure.
   - Install necessary dependencies.
   - Generate boilerplate code.

4. Navigate to your project folder and start coding:

   ```bash
   cd <project-name>
   npm start
   ```

---

---

## Built-in Boilerplate Code

Reactify provides:

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

Reactify installs the following dependencies:

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
   npx reactify init
   ```

2. **Output Structure**:
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

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Feedback

We'd love to hear your feedback! Let us know what features you'd like to see next or how we can improve Reactify.
