const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 8000;
dotenv.config({ path: "./config.env" });

app.post("/sendMail", async (req, res) => {
  const { name, contact, email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let data = {
    from: process.env.USER,
    to: email,
    subject: "Test Maill",
    html: `<h1 style='color:red'>Sky Codes</h1>
    Name: ${name}<br/>
    <span style='font-size:22px'>Contact Number: ${contact}</span>

    `,
    attachments: [
      {
        fileName: "RDF.pdf",
        path: "assets/RDF.pdf",
      },
    ],
    // text: `Name :${name}, Contact Number: ${contact}`,
  };

  await transporter.sendMail(data, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail sent", data);
    }
  });
});

app.listen(PORT, (req, res) => console.log(`server running on port ${PORT}`));
