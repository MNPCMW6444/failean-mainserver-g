export const signupreq = (url: string) => ({
    subject: "Activate your Failean Account",
    body: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a.activate-button {
            background-color: #ff6600;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Welcome to Failean!</h2>
    </div>

    <div class="content">
        <p>At Failean, we celebrate the learning journey inherent in failures. Our platform empowers entrepreneurs to fail fast, learn faster, and move closer to success. We're delighted that you've joined our community of innovative thinkers and doers.</p>
        
        <p>Activate your account by clicking on the button below:</p>

        <a href="${url}" class="activate-button">Activate My Account</a>

        <p>If you did not sign up for our platform, please disregard this email.</p>

        <p>Best regards,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
  `,
});

export const passreset = (url: string) => ({
    subject: "Failean Password Reset Request",
    body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Failean Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a.button {
            background-color: #32CD32;
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Reset Your Password</h2>
    </div>

    <div class="content">
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${url}" class="button">Reset My Password</a>

        <p>If you did not request a password reset, please ignore this email.</p>

        <p>Best regards,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
    `,
});

export const websiteSignup = (url: string) => ({
    subject: "Activate your Failean Account",
    body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Failean Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a {
            color: blue;
        }
        a.button {
            background-color: #ff6600;
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Welcome to Failean!</h2>
    </div>

    <div class="content">
        <p>At Failean, we celebrate the learning journey inherent in failures. Our platform empowers entrepreneurs to fail fast, learn faster, and move closer to success. We're delighted that you've joined our community of innovative thinkers and doers.</p>

        <p>Activate your account by clicking on the button below:</p>
        <a href="${url}" class="button">Activate My Account</a>

        <p>If you did not sign up for our platform, please disregard this email.</p>

        <p>Best regards,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
  `,
});

export const waitListReady = (name: string) => ({
    subject: "Early Access Activation: Start Exploring Now",
    body: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Early Access Activation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a {
            color: blue;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h2>Start Your Early Access Journey Today</h2>
    </div>

    <div class="content">
        <p>Hello ${name === "Unknown" ? "there" : name},</p>

        <p>We hope this message finds you in good spirits. This is Michael, CEO of Failean LLC, and we're thrilled to announce your early access activation to our anticipated new offering.</p>

        <p>You can begin your journey by signing up at <a href="https://failean.com">failean.com</a>.</p>

        <h3>Complimentary User Credits</h3>
        <p>As a token of appreciation, you will start with 10,000 credits, offering you an extended experience.</p>

        <h3>Feedback Guidelines</h3>
        <ol>
            <li>Discover the features step-by-step.</li>
            <li>Opt for individual prompts for optimal results.</li>
            <li>Share your thoughts on the overall experience.</li>
            <li>If you have any feedback or questions, reply to this email.</li>
        </ol>

        <p>Your input is essential to us, and we're eager to hear from you.</p>

        <p>Best wishes,<br>Michael<br>CEO, Failean LLC</p>
    </div>

    <div class="footer">
        <p>Unsubscribe | &copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>
</body>
</html>
  `,
});
