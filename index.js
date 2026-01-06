import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);

const REACTIONS = ["👍", "🥳", "😶‍🌫️", "😈", "🔥", "💨", "🎉"];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

bot.on("message", async (ctx) => {
  if (!ctx.from || ctx.from.is_bot) return;

  await sleep(1200 + Math.random() * 2400);

  try {
    await ctx.react(
      REACTIONS[Math.floor(Math.random() * REACTIONS.length)]
    );
  } catch (e) {
    // silently ignore rate limits / permission errors
  }
});

bot.start();
console.log("Siggy Plut reaction bot is running 🔥");
