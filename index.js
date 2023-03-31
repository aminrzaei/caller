require("dotenv").config();
const cron = require("node-cron");
const {
  EmailService,
  TelegramServeice,
  YoutubeService,
} = require("./services");

const email = new EmailService();
const telegram = new TelegramServeice();
const youtube = new YoutubeService();

telegram.startPolling();

let minVidCount = process.env.MIN_VID_COUNT;

async function run() {
  const totalVideos = await youtube.getChannelVideosCount();
  console.log(`.... Videos: ${totalVideos} ....`);
  if (totalVideos > minVidCount) {
    minVidCount++;
    email.sendEmail();
    telegram.sendMessage();
  }
}

console.log("########## Starting ... ##########");
cron.schedule("*/5 * * * * *", run);
