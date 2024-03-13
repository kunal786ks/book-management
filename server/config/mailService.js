// var nodemailer = require("nodemailer");
// const sendMail = (receiver) => {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "ks445kunalsharma@gmail.com",
//       pass: "pwew poyo zryo sigu",
//     },
//   });
//   const randomNumber = Math.floor(100000 + Math.random() * 900000);
//   const otp = randomNumber.toString();
//   const html = `
//     <html>
//     <body>
//         <p>Enter this otp get back to our account or update password : - ${otp}</p>
//     </body>
//     </html>
// `;
//   var mailOptions = {
//     from: "ks445kunalsharma@gmail.com",
//     to: receiver,
//     subject: "Sending Email using Node.js",
//     html: html,
//     attachments: [
//       {
//         filename: "textisg file",
//         path: "./public/this.jpg",
//       },
//     ],
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };
// module.exports={sendMail}
//  const {sendMail}=require('./index')
// sendMail('kunal0405.be20@chitkara.edu.in')