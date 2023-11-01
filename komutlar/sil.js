const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"sil",
    description: 'Herhangi Bir Sunucu Chatinde Bulunan Mesajları Kolayca Silmeye Yarayan Komuttur.',
    type:1,
    options: [
        {
            name:"sayı",
            description:"Silinecek Olan Mesaj Sayısını Giriniz.",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: "Bu Komutu Kullanabilmek İçin `\Mesajları Yönet`\ Yetkisine Sahip Olman Gerek.", ephemeral: true})
    const sayi = interaction.options.getString('sayı')
    interaction.channel.bulkDelete(sayi)
    interaction.reply({content: "Belirtilen Miktar Kadar Mesaj Silinmiştir."})
}

};
