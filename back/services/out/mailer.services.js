import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'atareadosapp@gmail.com',
      pass: 'xnacjviwefnvvoon'
    }
  });

  transporter.verify().then(() => {
    console.log('Ready for send emails');
  }
    ).catch((error) => {
      console.log('Error: ', error);
    }   
);

    