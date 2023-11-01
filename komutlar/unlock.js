const Discord = require('discord.js') // version: 14.2.0

/*
Siz Yetki Kontrolü Eklersiniz 

Gerekli Yetki: Kanalları Yönet
*/

module.exports = {
    slash: true,
    name: 'unlock',
    description: 'Kilitlediğiniz Kanalı Kullanıma Tekrar Açın',
    option: [
        {
            name: 'kanal',
            description: 'Kilidini Açmak İstediğin Kanalı Seç',
            type: 'channel',
            require: false
        }
    ],
	async run(client, interaction) { 
     if(!interaction.member.permissions.has("ManageChannels")) return interaction.reply("Maalesef yetkin yetmiyor");;

        const channel = interaction.options.getChannel('kanal') || interaction.channel

        let everyone = interaction.guild.roles.cache.find(a => a.name === '@everyone')
        channel.permissionOverwrites.edit(everyone, { 'SendMessages': true }, interaction.user.tag + ' Tarafından Açıldı');

        const başarılı = new Discord.EmbedBuilder()
        .setDescription(`
        ✅ Kanalın Kilidi **Açıldı**
        
        ${channel} Kanalı <@${interaction.user.id}> Tarafından Açıldı`)
        .setColor('Green')
        await interaction.reply({ embeds: [başarılı] })
   
    }
}