const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('yardım')
    .setDescription('Uptime yardım menüsü.')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
      
      const Duyuru = db.fetch(`Duyurular`)
      if(!Duyuru) {
       
      const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://media.discordapp.net/attachments/1214635256657747974/1215557175028752454/standard.gif?ex=65fd2ed6&is=65eab9d6&hm=eb716acb348813cd5d161922ea69e448894286e1068171dbb59137fb9a0e1720&=&width=585&height=75")
         .setTitle("Darkveb Uptime • Yardım menüsü")
         .setDescription(`
</yardım:0> Yardım menüsünü gösterir.

</istatistik:0> Bot istatistiklerini gösterir.

</ping:0> Botun ping değerlerini gösterir.

</link-say:0> Sistemdeki link sayılarını gösterir.

</link-ekle:0> Sisteme link eklersiniz.

</link-sil:0> Sistemden link silersiniz.

</link-liste:0> Sistemdeki linklerinizi listeler.

</premium-kontrol:0> Premium üyeliğinizin olup, olmadığını gösterir.

</davet:0> Bot linklerini gösterir.

</uptime-sistemi-kur:0> Sunucuya özel butonlu uptime sistemini kurarsınız.

</uptime-sistemi-sıfırla:0> Sunucudaki uptime sistemini sıfırlar.


`)
 .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
      interaction.reply({embeds: [Yardım]})
        
      } else {
       
        const duyurular = db.fetch(`Duyurular`).map(y => ` \`${y}\``).join("\n")
        
        const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://media.discordapp.net/attachments/1214635256657747974/1215557175028752454/standard.gif?ex=65fd2ed6&is=65eab9d6&hm=eb716acb348813cd5d161922ea69e448894286e1068171dbb59137fb9a0e1720&=&width=585&height=75")
         .setTitle("Erasty Uptime • Yardım menüsü")
         .setDescription(`<:pin:1113173619787452507> **Bot duyuruları**
        > <:sag:1113173952664174696> ${duyurular || "Aktif bir duyuru bulunmuyor."}
      
    <:pin:1113188744586084474> **Bot komutları**
</yardım:0> Erasty Uptime yardım menüsünü gösterir.

</istatistik:0> Botun istatistiklerini gösterir.

</ping:0> Botun gecikme sürelerini gösterir.

</link-say:0> Sistemdeki linklerin sayısını gösterir.

</link-ekle:0> Sisteme link eklersiniz.

</link-sil:0> Sistemdeki linkinizi silersiniz.

</link-liste:0> Sisteme eklemiş olduğunuz linkleri gösterir.

</premium-kontrol:0> Premium üyeliğinizi kontrol edersiniz.

</davet:0> Botun bağlantılarını gösterir.

</uptime-sistemi-kur:0> Sunucuya özel butonlu uptime sistemini kurarsınız.

</uptime-sistemi-sıfırla:0> Sunucudaki uptime sistemini sıfırlar.

`)
.setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
        interaction.reply({embeds: [Yardım]})
    }   
  }
}