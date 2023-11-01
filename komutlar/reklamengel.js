const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
  name: "reklam-engel",
  description: "Reklam Engelleme Sistemini Ayarlayan Komuttur.",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Bu Komutu Kullanabilmek İçin `\Yönetici`\ Yetkisine Sahip Olman Gerek.", ephemeral: true})
    const embed = new EmbedBuilder()
    .setColor("#000000")
    .setDescription("✅ **Sistem Kapatıldı** \n Artık Reklam Yapıldığında Bot Herhangi Bir Tepki Göstermeyecektir.")
    const embed2 = new EmbedBuilder()
    .setColor("#000000")
   .setDescription("✅ **Sistem Açıldı** \n Artık Reklam Yapıldığında Bot Reklam İçerikli Mesajlara Tepki Gösterecektir.")
 
 let reklam = db.fetch(`reklamengel_${interaction.guild.id}`);
 
 if (reklam)  {
 
     db.delete(`reklamengel_${interaction.guild.id}`);
     interaction.reply({embeds: [embed], allowedMentions: { repliedUser: false }})
 
     return
 }
 
 if (!reklam)  {
 
     db.set(`reklamengel_${interaction.guild.id}`, true);
    interaction.reply({embeds: [embed2], allowedMentions: { repliedUser: false }})
 
     return
 }
 
 

  }

};
