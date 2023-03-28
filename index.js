require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const cron = require("node-cron");

const YT_API_KEY = process.env.YT_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

let minVidCount = process.env.MIN_VID_COUNT;

const youtube = google.youtube({
  version: "v3",
  auth: YT_API_KEY,
});

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  tls: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

async function getChannelVideosCount(channelId) {
  const res = await youtube.channels.list({
    part: "statistics",
    id: channelId,
  });
  const videoCount = +res.data.items[0].statistics.videoCount;
  return videoCount;
}

async function sendEmail(totalVideos) {
  console.log("Sending Email ...");
  await transporter.sendMail({
    from: "root <info@moonde.ir>",
    to: "aminrezaei@proton.me",
    subject: "Policy has been changed",
    html: `<h1>تعداد ویدو ها: ${totalVideos} </h1>`,
  });
  console.log("Email ✔✔v✔✔");
  return true;
}

async function run() {
  console.log("... Tick ...");
  const totalVideos = await getChannelVideosCount(CHANNEL_ID);
  console.log(`Videos: ${totalVideos}`);
  if (totalVideos > minVidCount) {
    minVidCount++;
    await sendEmail(totalVideos);
  }
}

console.log("Starting ...");

cron.schedule("*/1 * * * * *", run);
