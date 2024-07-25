import { createTransport } from "nodemailer";
import { emailTemplete } from "./emailTemplete.js";

export async function sendEmail(options) {
    const transporter = createTransport({
        service:"gmail",
         auth: {
           user: "sohilasalah542@gmail.com",
           pass: "fykb ygnk dnza gmjn",
         },
       });

           // send mail with defined transport object
           const info = await transporter.sendMail({
             from: '"Fred Foo 👻" <sohilasalah542@gmail.com>', // sender address
             to: options.email, // list of receivers
             subject: "Hello ✔", // Subject line
             text: "Hello world?", // plain text body
             html: emailTemplete(options.api), // html body
           });
         
           console.log("Message sent: %s", info.messageId);
}
