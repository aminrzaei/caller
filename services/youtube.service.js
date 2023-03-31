const { google } = require("googleapis");

class YoutubeService {
  constructor() {
    this.YT_API_KEY = process.env.YT_API_KEY;
    this.CHANNEL_ID = process.env.CHANNEL_ID;
    this.youtube = google.youtube({
      version: "v3",
      auth: this.YT_API_KEY,
    });
  }

  async getChannelVideosCount() {
    const res = await this.youtube.channels.list({
      part: "statistics",
      id: this.CHANNEL_ID,
    });
    const videoCount = +res.data.items[0].statistics.videoCount;
    return videoCount;
  }
}

module.exports = YoutubeService;
