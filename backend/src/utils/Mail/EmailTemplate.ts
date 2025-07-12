export function getVerificationEmailTemplate(userName: string, verificationLink: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>
<body style="font-family: Poppins, Arial, sans-serif; background-color: #DFFFE4; color: #013237; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <!-- Optional logo -->
    <div style="text-align: center; margin-bottom: 16px;">
    <img  src="https://res.cloudinary.com/dkonchtzn/image/upload/v1752355035/bingwa_ybl78m.png" alt="Bingwa Shambani Logo" width="80" />
    </div>

    <!-- Header -->
    <div style="background-color: #43A047; color: white; padding: 20px; border-radius: 6px 6px 0 0; text-align: center;">
      <h2 style="margin: 0;">Verify Your Email</h2>
    </div>

    <!-- Body -->
    <div style="background-color: white; padding: 24px; border-radius: 0 0 6px 6px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);">
      <p>Hello <strong>${userName}</strong>,</p>
      <p>Thank you for signing up with <strong>Bingwa Shambani 🌿</strong>!</p>
      <p>Please verify your email by clicking the button below:</p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${verificationLink}" style="
          background-color: #43A047;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-size: 16px;
        ">Verify Email</a>
      </div>

      <p>This link will expire in <strong>9 hours</strong> for your security.</p>
      <p>If you didn’t sign up, you can safely ignore this message.</p>

      <p style="margin-top: 32px;">Regards,<br><strong>Bingwa Shambani 🌿</strong></p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; font-size: 0.75em; color: #888; margin-top: 16px;">
      <p>This is an automated message — please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;
}
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Bingwa Shambani</title>
</head>
<body style="background-color: #DFFFE4; font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://res.cloudinary.com/dkonchtzn/image/upload/v1752355035/bingwa_ybl78m.png" alt="Bingwa Shambani Logo" width="80" />
    <h1 style="color: #013237;">Karibu Bingwa Shambani!</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <p>Hello {name},</p>
    <p>We're excited to have you on board. Your journey to healthier, more productive crops begins now!</p>
    <p>From disease detection to expert advice, we're here to help you grow smarter 🌾</p>
    <p>Best regards,<br>The Bingwa Shambani Team</p>
  </div>
  <footer style="text-align: center; font-size: 0.8em; color: #888; margin-top: 20px;">
    <p>This is an automated message, please do not reply.</p>
  </footer>
</body>
</html>
`;
export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="background-color: #DFFFE4; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://res.cloudinary.com/dkonchtzn/image/upload/v1752355035/bingwa_ybl78m.png" alt="Bingwa Shambani Logo" width="80" />
    <h1 style="color: #013237;">Reset Your Password</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 6px;">
    <p>Hello {name},</p>
    <p>We received a request to reset your password. If this wasn't you, feel free to ignore it.</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="{resetURL}" style="background-color: #43A047; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour.</p>
    <p>Stay safe,<br>The Bingwa Shambani Team</p>
  </div>
  <footer style="text-align: center; font-size: 0.8em; color: #888; margin-top: 20px;">
    <p>This is an automated message, please do not reply.</p>
  </footer>
</body>
</html>
`;
export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset Successful</title>
</head>
<body style="background-color: #DFFFE4; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://res.cloudinary.com/dkonchtzn/image/upload/v1752355035/bingwa_ybl78m.png" alt="Bingwa Shambani Logo" width="80" />
    <h1 style="color: #013237;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 6px;">
    <p>Hello {name},</p>
    <p>Your password has been reset successfully. If this wasn't you, please contact support immediately.</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Never reuse passwords across different sites</li>
    </ul>
    <p>Thanks for helping us keep your account secure!</p>
    <p>Best regards,<br>Bingwa Shambani Team</p>
  </div>
  <footer style="text-align: center; font-size: 0.8em; color: #888; margin-top: 20px;">
    <p>This is an automated message, please do not reply.</p>
  </footer>
</body>
</html>
`;
