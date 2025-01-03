import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
} from "../config/env";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface MailOptions extends SendMailOptions {
  // Any additional custom properties for mail options can go here
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    // Configure the SMTP transporter using environment variables
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: MAIL_PORT == 465, // Use SSL if port is 465
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    // Check if the transporter configuration is working correctly
    // uncomment this for verify email Credential
    // this.transporter.verify((error: any, success: any) => {
    //   if (error) {
    //     console.error("Error setting up email transporter:", error);
    //   } else {
    //     console.log("Email service is ready to send messages.");
    //   }
    // });
  }

  /**
   * Send email function
   * @param {MailOptions} mailOptions - The mail options (to, subject, text, html)
   * @returns {Promise<any>}
   */
  public async sendEmail(mailOptions: MailOptions): Promise<any> {
    try {
      // Send the email using the transporter
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      return info; // Return the email info in case you want to log or use it
    } catch (error: unknown) {
      // Type guard to ensure error is an instance of Error
      if (error instanceof Error) {
        console.error("Error sending email:", error.message);
        throw new Error("Error sending email: " + error.message);
      } else {
        // In case error is not an instance of Error (e.g., if it's a string or something else)
        console.error("An unknown error occurred:", error);
        throw new Error("An unknown error occurred while sending email.");
      }
    }
  }

  /**
   * Send a welcome email
   * @param {string} to - The recipient's email address
   * @param {string} name - The name of the user
   */
  public async sendWelcomeEmail(to: string, name: string): Promise<any> {
    const mailOptions: MailOptions = {
      from: process.env.MAIL_FROM_ADDRESS as string,
      to: to,
      subject: "Welcome to MyApp!",
      text: `Hello ${name},\n\nWelcome to QuickStruc! We're excited to have you on board.\n\nBest regards,\nThe MyApp Team`,
      html: `<p>Hello ${name},</p><p>Welcome to QuickStruc! We're excited to have you on board.</p><p>Best regards,<br>QuickStruc Team</p>`,
    };

    return this.sendEmail(mailOptions);
  }
}

export default new EmailService(); // Export an instance of the service to be used in controllers
