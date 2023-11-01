    const { Client, discord, GatewayIntentBits, Partials, Collection, db, EmbedBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});


global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const {  } = require("./config.json");

/* Slash Komutları Yüklüyoruz */

readdirSync('./komutlar').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./komutlar/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});


/* Slash Komutları Yüklüyoruz */

/* Eventleri Yüklüyoruz */

readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
              eve(client, ...args)
        });

console.log(`[EVENT] ${name} eventi yüklendi.`)

});


/* Eventleri Yüklüyoruz */
-
client.login(process.env.token).then(
  function () {
    console.log("[Token-Log] Token doğru bir şekilde çalışıyor.");
  },
  function (err) {
    console.log("[ERROR] Token'de bir hata oluştu: " + err);
    setInterval(function () {
      process.exit(0);
    }, 20000);
  }
);

client.on("ready", () => {

});


const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('')) // sitenize girdiğinde görebilirsiniz.
app.listen(process.env.PORT, () => console.log('Port ayarlandı: ' + process.env.PORT))


client.on("presenceUpdate", async (eski, yeni) => {
  const member = client.guilds.cache.get("").members.cache.get(yeni.user.id);
 const channel = client.channels.cache.get("");
  const text = "";
  const rol = " ";
  const yenia = yeni?.activities[0]?.state;
  const eskia = eski?.activities[0]?.state;

  if (eskia !== yenia && !!member) {
    let msg;
    if (!yenia || !yenia.includes(text)) {
      member.roles.remove(rol).catch(e => {});
      msg = "durumundan sildiği için rolünü aldım.";
    } else if (yenia?.includes(text)) {
      member.roles.add(rol).catch(e => {});
      msg = "durumuna eklediği için rolünü verdim.";
    }

    const color = msg.includes("aldım") ? "Red" : "Green";

    const embed = new EmbedBuilder()
      .setColor(color)
      .setDescription(`${yeni.user.username} **${text}** yazısını ${msg}`);

    channel.send({ embeds: [embed] });
  }
});


client.on("messageCreate", (message) => {
  const db = require("croxydb");
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`);
  if (!reklamlar) return;

  if (reklamlar) {
    const linkler = [
      ".com.tr",
      ".net",
      ".org",
      ".tk",
      ".cf",
      ".gf",
      "https://",
      ".gq",
      "http://",
      ".com",
      ".gg",
      ".porn",
      ".edu",
    ];

    if (linkler.some((alo) => message.content.toLowerCase().includes(alo))) {
      message.delete();
      message.channel.send(
        `<@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktiftir. Reklam İçerikli Mesajların Otomatik Olarak Silinmektedir. `
      );
    }
  }
});



