const Discord = require('discord.js')//YouTube; Erasty  
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')//YouTube; Erasty  
const { botid } = require('../ayarlar.json')
const db = require("croxydb")//YouTube; Erasty  

module.exports = {//YouTube; Erasty  
    slash: true,                                
    cooldown: 5,                              
//YouTube; Erasty  
    data: new SlashCommandBuilder()         
    .setName('bakım-kapat')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false),
  //YouTube; Erasty  
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:No:1122993152064765973> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)//YouTube; Erasty  
      .setColor('Red')
      
    if(interaction.user.id !== "1165320152540250283" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
    return interaction.reply({embeds: [YetkiYok]});
}//YouTube; Erasty  
      
      const Bakım = db.fetch(`Bakım`)
      const Sebep = db.fetch(`BakımSebep`)
      
      if(!Bakım) {
        
      const BakımKapalı = new EmbedBuilder()//YouTube; Erasty  
      .setDescription(`<:No:1122993152064765973> **Bot zaten bakımda bulunmuyor.**`)
      .setColor('Red')
      interaction.reply({embeds: [BakımKapalı]})
        
      } else {//YouTube; Erasty  
        
      db.delete(`Bakım`)
      db.delete(`BakımSebep`)
        //YouTube; Erasty  
      const BakımKapatıldı = new EmbedBuilder()
      .setDescription(`<:Yes:1122994864049619127> **Bot bakımdan çıkartıldı.**`)
      .setColor('Green')
      interaction.reply({embeds: [BakımKapatıldı]})
      
        }//YouTube; Erasty  
     }
  }//YouTube; Erasty  