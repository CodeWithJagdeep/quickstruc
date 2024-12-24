import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define types for the response data and user
interface LoginResponse {
  token: string;
  user?: any; // Adjust according to the actual user data structure
}

interface RegistrationResponse {
  message: string;
}

interface GoogleAuthResponse {
  token: string;
}

class authService {
  private api: AxiosInstance;

  constructor() {
    // Set up your base API URL here for convenience
    this.api = axios.create({
      baseURL: "/api/auth", // Replace with your API base URL
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Set the Authorization header with Bearer token
   * @param token - The Bearer token to set in the Authorization header.
   */
  private setAuthHeader(token: string): void {
    if (token) {
      this.api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers["Authorization"];
    }
  }

  /**
   * User login method
   * @param email - User's email address.
   * @param password - User's password.
   * @returns The login response containing the user data or token.
   */
  async userLogin(email: string, password: string): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post(
        "/login",
        { email, password }
      );

      // Assuming the response contains a token or user data
      const { data } = response;

      // Save token in localStorage or a secure place
      localStorage.setItem("authToken", data.token);

      // Set the Authorization header after login
      this.setAuthHeader(data.token);

      return data; // Return user data or token if needed
    } catch (error: any) {
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
   * @param name - User's name.
   * @param email - User's email address.
   * @param password - User's password.
   * @returns The registration response containing a message.
   */
  async userRegistration(
    name: string,
    email: string,
    password: string
  ): Promise<RegistrationResponse> {
    try {
      const response: AxiosResponse<RegistrationResponse> = await this.api.post(
        "/register",
        { name, email, password }
      );

      const { data } = response;
      return data; // Return registration response message
    } catch (error: any) {
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
  logout(): void {
    // Remove token from localStorage or clear session data
    localStorage.removeItem("authToken");

    // Optionally, you can make a request to the server to logout (invalidate session)
    // this.api.post('/logout'); // Uncomment if needed

    // You could also redirect to the login page after logging out
    window.location.href = "/login";
  }

  /**
   * Helper method to get the currently authenticated user
   * @returns The current user data or null if not authenticated.
   */
  async getCurrentUser(): Promise<LoginResponse | null> {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return null; // No token, user is not authenticated
    }

    try {
      this.setAuthHeader(token);

      // Assuming there's an endpoint to verify if the user is logged in
      const response: AxiosResponse<LoginResponse> = await this.api.get(
        "/isloggedin"
      );

      const { data } = response;
      return data; // Return user data or token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
}

export default new authService();
