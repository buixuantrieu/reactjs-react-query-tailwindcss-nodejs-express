import nodemailer from "nodemailer";
const randomNumber = () => {
  return Math.floor(Math.random() * 899) + 1000;
};

const sendMail = async (email: string, htmlContent: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mingsuhomestay@gmail.com",
        pass: process.env.PASSWORD_APP,
      },
    });

    const mailOptions = {
      from: "mingsuhomestay@gmail.com",
      to: email,
      subject: "MingSu HomeStay",
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};


export { sendMail, randomNumber };
