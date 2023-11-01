const Discord = require('discord.js') // version: 14.2.0

/*
Siz Yetki Kontrolü Eklersiniz 

Gerekli Yetki: Kanalları Yönet
*/
 
module.exports = {
    slash: true,
    name: 'lock',
    description: 'Kanalı Kullanıcıların Mesaj Yazamayacak Hale Getirin',
    option: [
        {
            name: 'kanal',
            description: 'Kilitlemek İstediğin Kanalı Seç',
            type: 'channel',
            require: false
        }
    ],
	async run(client, interaction) { 
         if(!interaction.member.permissions.has("ManageChannels")) return interaction.reply("Maalesef yetkin yetmiyor");;

        const channel = interaction.options.getChannel('kanal') || interaction.channel

        let everyone = interaction.guild.roles.cache.find(a => a.name === '@everyone')
        channel.permissionOverwrites.edit(everyone, { 'SendMessages': false }, interaction.user.tag + ' Tarafından Kilitlendi');

        const başarılı = new Discord.EmbedBuilder()
        .setDescription(`
        ✅ Kanal **Kilitlendi**
        
        ${channel} Kanalı <@${interaction.user.id}> Tarafından Kilitlendi`)
        .setColor('Red')
        await interaction.reply({ embeds: [başarılı] })
   
    }
}