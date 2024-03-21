const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')//YouTube; Erasty  
const db = require("croxydb")//YouTube; Erasty  

module.exports = {//YouTube; Erasty  
  slash: true,                                
  cooldown: 5,                    //YouTube; Erasty            

    data: new SlashCommandBuilder()         //YouTube; Erasty  
      .setName('duyuru-ekle')
      .setDescription('Sisteme bir duyuru ekler.')
      .setDMPermission(false)//YouTube; Erasty  
      .addStringOption(option =>
        option
          .setName('duyuru')
          .setDescription('Eklenecek duyuruyu belirtin.')//YouTube; Erasty  
          .setRequired(true)),
      
    async execute(client, interaction) {  //YouTube; Erasty  
      
      const YetkiYok = new EmbedBuilder()
        .setDescription(`**<:No:1122993152064765973> Bu komutu kullanabilmek için \`Bot sahibi\` olmalısın.**`)
        .setColor('Red')//YouTube; Erasty  
      
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]})
      }//YouTube; Erasty  
      
      const duyuru = interaction.options.getString('duyuru')
        
      const Embed = new EmbedBuilder()//YouTube; Erasty  
        .setDescription(`**<:Yes:1122994864049619127> \`${duyuru}\` adlı duyuru sisteme eklendi.**`)
        .setColor("Green")
      interaction.reply({embeds: [Embed]})//YouTube; Erasty  
       
      db.push(`Duyurular`, `${duyuru}`)
     //YouTube; Erasty  
  }
}