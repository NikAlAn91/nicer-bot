import { Bot, webhookCallback } from "grammy";
import express from "express";

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
  } catch {}
});

// --------------------
// WEBHOOK SERVER
// --------------------
const app = express();
app.use(express.json());

app.post("/webhook", webhookCallback(bot, "express"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  const WEBHOOK_URL = `${process.env.RENDER_EXTERNAL_URL}/webhook`;

  // 🔥 Clean old webhooks & set new one
  await bot.api.deleteWebhook({ drop_pending_updates: true });
  await bot.api.setWebhook(WEBHOOK_URL);

  console.log("Siggy Plut webhook bot is running 🔥");
  console.log("Webhook set to:", WEBHOOK_URL);
});
