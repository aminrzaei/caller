const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.MAIL_FROM = process.env.MAIL_FROM;
    this.MAIL_TO = process.env.MAIL_TO;
    this.MAIL_SUBJECT = process.env.MAIL_SUBJECT;
    this.MAIL_HTML_MESSAGE = process.env.MAIL_HTML_MESSAGE;
    this.MAIL_HOST = process.env.MAIL_HOST;
    this.MAIL_PORT = process.env.MAIL_PORT;
    this.MAIL_USER = process.env.MAIL_USER;
    this.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
    this.transporter = nodemailer.createTransport({
      host: this.MAIL_HOST,
      port: this.MAIL_PORT,
      tls: true,
      auth: {
        user: this.MAIL_USER,
        pass: this.MAIL_PASSWORD,
      },
    });
  }

  sendEmail() {
    console.log("Sending Email ...");
    this.transporter.sendMail({
      from: this.MAIL_FROM,
      to: this.MAIL_TO,
      subject: this.MAIL_SUBJECT,
      html: this.MAIL_HTML_MESSAGE,
    });
    console.log("------------- Email    ✔✔✔✔ -------------");
  }
}

module.exports = EmailService;
