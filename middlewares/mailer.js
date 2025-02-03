const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')

async function mail(mailAddress){
    // const tracker = await bcrypt.hash(mailAddress, 1)
    tracker = Buffer.from(mailAddress).toString('base64')
    // console.log(tracker)
    const html = `<h1>Verify that it's you</h1><br/><a href="http://localhost:5000/confirmRegister/${tracker}">Verify</a>`
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "98190barup@gmail.com",
        pass: "nntdafytqfmcibiw",
      }
    })
    const messages = {
      from: "98190barup@gmail.com",
      to: mailAddress,
      subject: "YourLoginDetails",
      text: 'this is success',
      html: html
    }
    try {
      const info = await transporter.sendMail(messages);
      console.log('Email sent successfully');
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
    
  }

  module.exports = mail
