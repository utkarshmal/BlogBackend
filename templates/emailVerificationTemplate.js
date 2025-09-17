// Backened/templates/emailVerificationTemplate.js
const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="UTF-8">
    <title>OTP Verification Email</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      .logo {
        max-width: 150px;
        margin-bottom: 20px;
      }

      .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .body {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .cta {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
      }

      .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
      }

      .highlight {
        font-weight: bold;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <a href="http://yourblogapp.com">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Blog App Logo">
      </a>
      <div class="message">OTP Verification for Blog App</div>
      <div class="body">
        <p>Hello Blogger,</p>
        <p>Thank you for registering on Blog App. To complete your registration, please use the following OTP
          (One-Time Password) to verify your account:</p>
        <h2 class="highlight">${otp}</h2>
        <p>This OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.
          Once verified, you can start creating and managing your blog posts!</p>
      </div>
      <div class="support">
        For any support, contact us at <a href="mailto:support@blogapp.com">support@blogapp.com</a>.
      </div>
    </div>
  </body>
  
  </html>`;
};

module.exports = otpTemplate;
