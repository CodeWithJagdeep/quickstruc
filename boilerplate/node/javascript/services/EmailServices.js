const nodemailer = require("nodemailer");
const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
} = require("../config/env");
require("dotenv").config(); // Load environment variables from .env

class EmailService {
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
   * @param {Object} mailOptions - The mail options (to, subject, text, html)
   * @returns {Promise}
   */
  async sendEmail(mailOptions) {
    try {
      // Send the email using the transporter
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      return info; // Return the email info in case you want to log or use it
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Error sending email: " + error.message);
    }
  }

  /**
   * Send a welcome email
   * @param {string} to - The recipient's email address
   * @param {string} name - The name of the user
   */
  async sendWelcomeEmail(to, name) {
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: to,
      subject: "Welcome to MyApp!",
      text: `Hello ${name},\n\nWelcome to QuickStruc ! We're excited to have you on board.\n\nBest regards,\nThe MyApp Team`,
      html: `<p>Hello ${name},</p><p>Welcome to QuickStruc! We're excited to have you on board.</p><p>Best regards,<br>QuickStruc Team</p>`,
    };

    return this.sendEmail(mailOptions);
  }
}

module.exports = new EmailService(); // Export an instance of the service to be used in controllers
