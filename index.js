require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const cron = require("node-cron");
const Slimbot = require("slimbot");

const YT_API_KEY = process.env.YT_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const TELEGRAM_BOT_API = process.env.TELEGRAM_BOT_API;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

let minVidCount = process.env.MIN_VID_COUNT;

const telegramMessage = "https://www.youtube.com/@bitpin/shorts";
const emailMessage = `<div>
<a href="https://www.youtube.com/@bitpin/shorts" target="_blank">ویدو جدید از کانال آپلود شد</a>
</div>`;

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

const slimbot = new Slimbot(TELEGRAM_BOT_API);

async function getChannelVideosCount(channelId) {
  const res = await youtube.channels.list({
    part: "statistics",
    id: channelId,
  });
  const videoCount = +res.data.items[0].statistics.videoCount;
  return videoCount;
}

function sendTelegram() {
  console.log("Sending Telegram Message ...");
  slimbot.sendMessage(TELEGRAM_CHAT_ID, telegramMessage);
  console.log("------------- Telegram ✔✔✔✔ -------------");
}

function sendEmail() {
  console.log("Sending Email ...");
  transporter.sendMail({
    from: "Amin Rezaei <info@moonde.ir>",
    to: "aminrezaei@proton.me",
    subject: "ویدو جدید بیت پین آپلود شد",
    html: emailMessage,
  });
  console.log("------------- Email    ✔✔✔✔ -------------");
}

async function run() {
  const totalVideos = await getChannelVideosCount(CHANNEL_ID);
  console.log(`.... Videos: ${totalVideos} ....`);
  if (totalVideos > minVidCount) {
    minVidCount++;
    sendEmail();
    sendTelegram();
  }
}

console.log("########## Starting ... ##########");
slimbot.startPolling();
cron.schedule("*/1 * * * * *", run);
