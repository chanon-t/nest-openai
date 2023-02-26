export const generalConfig = () => ({
  port: process.env.PORT || 3000,
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  line: {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  },
});
