import { createTransport } from 'nodemailer';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config';
import { Logger } from '../shared/logger';

type messageInfoType = {
    from: string,
    email: string,
    subject: string,
    message: string,
}

const sendEmail = async (messageInfo: messageInfoType) => {
    try {
        const transporter = createTransport({
            service: 'gmail',
            auth: {
              user: ADMIN_EMAIL,
              pass: ADMIN_PASSWORD,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
        
          const mailOptions = {
            from: `"${messageInfo.from}"<${ADMIN_EMAIL}>`,
            to: ADMIN_EMAIL,
            subject: messageInfo.subject,
            text: messageInfo.message,
            html: `<b>${messageInfo.message}</b>`,
            replyTo: messageInfo.email,
          };
        
          await transporter.sendMail(mailOptions);
    } catch (err) {
        Logger.error(err);
    }
  
};

export default sendEmail;
export {sendEmail};
