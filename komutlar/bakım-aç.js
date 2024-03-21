const Discord = require('discord.js')//YouTube; Erasty  
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')//YouTube; Erasty  
const { botid } = require('../ayarlar.json')//YouTube; Erasty  
const db = require("croxydb")//YouTube; Erasty  

module.exports = {
    slash: true,//YouTube; Erasty  
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('bakım-aç')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addStringOption(option =>
        option//YouTube; Erasty  
            .setName('sebep')
            .setDescription('Bakım sebebini belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   //YouTube; Erasty  
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:No:1122993152064765973> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)//YouTube; Erasty  
      .setColor('Red')
      
    if(interaction.user.id !== "1165320152540250283" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
    return interaction.reply({embeds: [YetkiYok]});
}
      //YouTube; Erasty  
      const Bakım = db.fetch(`Bakım`)
      const Sebep = db.fetch(`BakımSebep`)
      
      const sebep = interaction.options.getString('sebep');//YouTube; Erasty  
        
      if(Bakım) {
        
      const BakımAçık = new EmbedBuilder()
      .setDescription(`<:No:1122993152064765973> **Bot zaten \`${Sebep}\` sebebi ile bakımda.**`)//YouTube; Erasty  
      .setColor('Red')
      interaction.reply({embeds: [BakımAçık]})
        
      } else {
        //YouTube; Erasty  
      db.set(`Bakım`, true)
      db.set(`BakımSebep`, sebep)
        //YouTube; Erasty  
      const BakımAçıldı = new EmbedBuilder()
      .setDescription(`<:Yes:1122994864049619127> **Bot \`${sebep}\` sebebi ile bakıma alındı.**`)//YouTube; Erasty  
      .setColor('Green')
      interaction.reply({embeds: [BakımAçıldı]})//YouTube; Erasty  
      
        }
     }
  }//YouTube; Erasty  
