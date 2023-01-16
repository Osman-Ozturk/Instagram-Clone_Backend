import Discord from "discord.js";
import InstagramScraper from "instagram-scraper";

const DISCORD_TOKEN = "MTA2MzA3Mzk0NTAxMzcyNzI0Mg.Gb4s_J.oQQ5stxOYLStxUsEqVLzGRmNjrxlkffL2D6LTY";
const WEBHOOK_ID = "1064451144878936164";
const WEBHOOK_TOKEN = "LmvjnCG7nQg0dB1QwY0A05O04Je7bt3W7kRFTuvIsXjsnid06K6AnJh3tiWBSEqabrpT";
const USERNAME = "lavarssraval";
const INTERVAL_TIME_IN_MILLISECONDS = 60000; //60 seconds

const client = new Discord.Client({
    intents: new Discord.Intents().add(Discord.Intents.ALL),
});

client.login(DISCORD_TOKEN);

client.on("ready", async () => {
  const webhook = new Discord.WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN);
  setInterval(async () => {
    try {
      const posts = await InstagramScraper.scrapeUserPage(USERNAME);
      posts.forEach(post => {
        if (post.is_video === false) {
          webhook.send(post.display_url, {
            caption: post.edge_media_to_caption.edges[0].node.text,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, INTERVAL_TIME_IN_MILLISECONDS);
});