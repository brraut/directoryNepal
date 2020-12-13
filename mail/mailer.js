const nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function({toUser, hash}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD
      }
    })

    const message = {
      from: process.env.GOOGLE_USER,
      // to: toUser.email // in production uncomment this
      to: 'bishowraut@gmail.com',
      subject: 'Catalog Nepal App - Activate Account',
      html: `
        <h3> Hello ${toUser.name} </h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
        <p>Cheers</p>
        <p>Your Application Team</p>
      `
    }

    transporter.sendMail(message, function(err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}