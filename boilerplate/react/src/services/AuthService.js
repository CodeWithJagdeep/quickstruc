import axios from "axios";

// Define the authService class
class authService {
  constructor() {
    // Set up the base API URL here for convenience
    this.api = axios.create({
      baseURL: "/api/auth", // Replace with your API base URL
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Set the Authorization header with Bearer token
   * @param {string} token - The Bearer token to set in the Authorization header.
   */
  setAuthHeader(token) {
    if (token) {
      this.api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers["Authorization"];
    }
  }

  /**
   * User login method
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<Object>} The login response containing the user data or token.
   */
  async userLogin(email, password) {
    try {
      const response = await this.api.post("/login", { email, password });

      // Assuming the response contains a token or user data
      const { data } = response;

      // Save token in localStorage or a secure place
      localStorage.setItem("authToken", data.token);

      // Set the Authorization header after login
      this.setAuthHeader(data.token);

      return data; // Return user data or token if needed
    } catch (error) {
      // Check for error response and handle it
      if (error.response) {
        console.error("Login Error:", error.response.data.message);
        throw new Error(error.response.data.message || "Login failed");
      } else {
        console.error("Login Error:", error.message);
        throw new Error(error.message || "An error occurred");
      }
    }
  }

  /**
   * Register a new user
   * @param {string} name - User's name.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<Object>} The registration response containing a message.
   */
  async userRegistration(name, email, password) {
    try {
      const response = await this.api.post("/register", {
        name,
        email,
        password,
      });

      const { data } = response;
      return data; // Return registration response message
    } catch (error) {
      if (error.response) {
        console.error("Registration Error:", error.response.data.message);
        throw new Error(error.response.data.message || "Registration failed");
      } else {
        console.error("Registration Error:", error.message);
        throw new Error(error.message || "An error occurred");
      }
    }
  }

  /**
   * Logout the user and clear session data
   * This also removes the stored token from localStorage.
   */
  logout() {
    // Remove token from localStorage or clear session data
    localStorage.removeItem("authToken");

    // Optionally, you can make a request to the server to logout (invalidate session)
    // this.api.post('/logout'); // Uncomment if needed

    // You could also redirect to the login page after logging out
    window.location.href = "/login";
  }

  /**
   * Helper method to get the currently authenticated user
   * @returns {Promise<Object|null>} The current user data or null if not authenticated.
   */
  async getCurrentUser() {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return null; // No token, user is not authenticated
    }

    try {
      this.setAuthHeader(token);

      // Assuming there's an endpoint to verify if the user is logged in
      const response = await this.api.get("/isloggedin");

      const { data } = response;
      return data; // Return user data or token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
}

export default new authService();
