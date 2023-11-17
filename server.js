const express = require('express');
const app = express();
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path')
require('dotenv').config();


app.set('view engine', 'ejs');
app.set('views',  'views');




app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home');
   
});

app.post('/home', (req, res) => {
  const { name, email, message } = req.body;

  // Create a nodemailer transporter
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, 
      secure: true, 
      auth: {
        user: process.env.email,
        pass: 'bncs dwgd hbks fslk'
      },
    });

    // Setup email data
    const mailOptions = {
      from: req.body.email,
      to: process.env.email,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  } catch(err) { 
    console.log(err)
  }

});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});