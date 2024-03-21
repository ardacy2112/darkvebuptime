const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')//YouTube; Erasty  
const db = require("croxydb")//YouTube; Erasty  

module.exports = {//YouTube; Erasty  
  slash: true,                                
  cooldown: 5,                              
//YouTube; Erasty  
    data: new SlashCommandBuilder()         
      .setName('duyuru-kaldır')
      .setDescription('Sistemdeki bir duyuruyu kaldırır.')//YouTube; Erasty
      .setDMPermission(false)
      .addStringOption(option =>
        option
          .setName('duyuru')
          .setDescription('Kaldırılacak duyuruyu belirtin.')//YouTube; Erasty  
          .setRequired(true)),
      
    async execute(client, interaction) {  
      
      const YetkiYok = new EmbedBuilder()//YouTube; Erasty
        .setDescription(`**<:No:1122993152064765973> Bu komutu kullanabilmek için \`Bot sahibi\` olmalısın.**`)
        .setColor('Red')
      
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]})//YouTube; Erasty
      }
      
      const duyuru = interaction.options.getString('duyuru')
        //YouTube; Erasty
      const Duyurular = db.fetch(`Duyurular`, [])
      if(!Duyurular.includes(duyuru)) {
      
      const DuyuruYok = new EmbedBuilder()
        .setDescription(`**<:No:1122993152064765973> Sistemde \`${duyuru}\` adında bir duyuru bulunmuyor.**`)
        .setColor('Red')//YouTube; Erasty
      interaction.reply({embeds: [DuyuruYok]})
       
      } else {//YouTube; Erasty
      
      const Embed = new EmbedBuilder()
        .setDescription(`**<:Yes:1122994864049619127> \`${duyuru}\` adlı duyuru sistemden kaldırıldı.**`)
        .setColor("Green")
      interaction.reply({embeds: [Embed]})//YouTube; Erasty
       
      db.unpush(`Duyurular`, `${duyuru}`)
   
    }//YouTube; Erasty
  }
}