module.exports = {
  slash: false,
  enable: true,
  name: "nuke",
  description: "Kanalı sıfırlar ve kanalı kopyalar.",
  async run(client, message, args) {
    if (!message?.member?.permissions.has("ManageChannels")) return message.reply("Bu komutu kullanmak için gerekli yetkiye sahip değilsin.");

    const oldChannel = message.channel;
    const author = message.member.user;

    oldChannel.clone({ reason: "Nuke komutu kullanıldı" }).then(copiedChannel => {
      copiedChannel.setPosition(oldChannel.position);

      const nukeMessage = `Kanal ${author.tag} tarafından sıfırlandı.`;
      copiedChannel.send(nukeMessage).then(() => {
        oldChannel.delete();
      }).catch(error => {
        console.error("Yeni kanala mesaj gönderirken hata oluştu:", error);
        oldChannel.send("Yeni kanala mesaj gönderilirken bir hata oluştu.");
        oldChannel.delete();
      });
    });
  },
};
