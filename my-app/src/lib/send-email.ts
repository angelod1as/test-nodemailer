import * as aws from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";

const fromEmail = process.env.FROM_EMAIL;
const toMail = process.env.TO_MAIL;

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "sa-east-1",
  credentials: defaultProvider(),
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
  sendingRate: 1, // max 1 messages/second
});

export const sendNormalMail = async () => {
  console.log("start");
  console.log("is idle?", transporter.isIdle());

  if (transporter.isIdle()) {
    console.log("sending email");

    transporter.sendMail(
      {
        from: fromEmail,
        to: toMail,
        subject: "Message",
        text: "I hope this message gets sent",
      },
      (err, info) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(info.envelope);
        console.log(info.messageId);
      }
    );
  }
};

export const sendThrottledMail = async () => {
  console.log("start");
  console.log("is idle?", transporter.isIdle());

  transporter.once("idle", () => {
    console.log("inside transporter.once");

    if (transporter.isIdle()) {
      console.log("sending email");

      transporter.sendMail(
        {
          from: fromEmail,
          to: toMail,
          subject: "Message",
          text: "I hope this message gets sent",
        },
        (err, info) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(info.envelope);
          console.log(info.messageId);
        }
      );
    }
  });
};
