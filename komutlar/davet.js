const Discord = require('discord.js')
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')//YouTube; Erasty  
const { botid } = require('../ayarlar.json')//YouTube; Erasty  

module.exports = {//YouTube; Erasty  
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('davet')//YouTube; Erasty  
    .setDescription('Botun linklerini gösterir.')
    .setDMPermission(false),//YouTube; Erasty  
  
    async execute(client, interaction) {
      
      const Davet = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot%20applications.commands`)
        .setLabel(`Sunucuna ekle`)//YouTube; Erasty  
        .setStyle("Link"))
      
      const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://discord.gg/RT62RZssJm`)//YouTube; Erasty  
        .setLabel(`Destek sunucusu`)
        .setStyle("Link"))
      
      
      const Oy = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://top.gg/bot/${botid}/vote`)//YouTube; Erasty  
        .setLabel(`Oy ver (YAKINDA)`)
        .setStyle("Link"))
      //YouTube; Erasty  
      const DavetEmbed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
        .setDescription(`
> <:icons_link:1122979327861076118> **Beni kullanmayı sevdiysen sunucuna ekleyebilirsin.**

> <:icons_discordmod:1124430335959105636> **Bir öneri, hata bildirmek için veya karalisteye alındıysan açtırmak için destek sunucuma katılabilirsin.**

> <:icons_upvote:1124430149069324371> **Oy vererek bize destek olabilirsin ve bazı komutlara erişim sağlarsınız.**
`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) //YouTube; Erasty  
    .setTimestamp()//YouTube; Erasty  
      
     return interaction.reply({embeds: [DavetEmbed], components: [Davet, Destek, Oy]})//YouTube; Erasty  

    }
}