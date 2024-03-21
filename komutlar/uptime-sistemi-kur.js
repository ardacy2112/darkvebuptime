const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true, 
    yetki: 'Administrator',
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('uptime-sistemi-kur')
    .setDescription('Uptime sistemini sunucunuzda ayarlar.')
    .setDMPermission(false)
    .addChannelOption(option =>
        option
            .setName('kanal')
            .setDescription('Uptime sisteminin kurulacağı kanalı belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
        
      const kanal = interaction.options.getChannel('kanal');
      const Sistem = db.fetch(`UptimeSistemi_${interaction.guild.id}`)
      
      if(!Sistem) {
          
        const SistemAçıldı = new EmbedBuilder()
             .setColor("Green")
             .setDescription(`<:Yes:1122994864049619127> Uptime kanalı başarıyla <#${kanal.id}> olarak ayarlandı.`)
        interaction.reply({embeds: [SistemAçıldı]})
        
        const SistemMesajı = new EmbedBuilder()
             .setColor("Blue")
             .setImage("https://cdn.discordapp.com/attachments/1112643961392209981/1132472847386816552/Picsart_23-07-23_03-42-28-909.png")
             .setDescription("**Erasty Uptime** \n")
.addFields({name: "<:Poltika:1132425331589009419> | Gizlilik ve Güvenlik politikamızı destek sunucumuzdan görebilirsin!", value: "\n <:Ekle:1132419170596831232> | Link eklemek için: **Ekle** \n <:Sil:1132424813705711747> | Linkinizi silmek için: **Sil** \n <:Liste:1132425047731085333> | Linklerinizi görmek için: **Liste** \n <:Help:1132425356184387634> | Aradığınızı bulamadıysanız veya öneriniz varsa sizi destek sunucumuza bekleriz. \n "},)
        
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
     
        const Butonlar = new ActionRowBuilder() 
           .addComponents(new Discord.ButtonBuilder()
           .setEmoji("<:Ekle:1132419170596831232>")
           .setLabel("Ekle")
           .setStyle(ButtonStyle.Success)
           .setCustomId("eklebuton"),
          new Discord.ButtonBuilder()
           .setEmoji("<:Sil:1132424813705711747>")
           .setLabel("Sil")
           .setStyle(ButtonStyle.Danger)
           .setCustomId("silbuton"),
           new Discord.ButtonBuilder()
           .setEmoji("<:Liste:1132425047731085333>")
           .setLabel("Liste")
           .setStyle(ButtonStyle.Primary)
           .setCustomId("listebuton"),
           new Discord.ButtonBuilder()  
        .setEmoji("<:YouTube:1112804009414242324>")
       .setURL(`https://www.youtube.com/watch?v=_WQjR6OniZY`)
        .setLabel(`Video`)
        .setStyle("Link"))
        
        client.channels.cache.get(kanal.id).send({embeds: [SistemMesajı], components: [Butonlar]})
        
        db.set(`UptimeSistemi_${interaction.guild.id}`, kanal.id)
          
        } else {
           
        const SistemAçık = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`<:No:1122993152064765973> Uptime sistemi zaten kurulu. Sıfırlamak için **/uptime-sistemi-sıfırla**`)
      
        interaction.reply({embeds: [SistemAçık]})
        
         
     }
   }
}