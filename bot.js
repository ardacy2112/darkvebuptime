//Bu bot altyapısı youtube erasty'e aittir düzenlenerek sizlere sunulmuștur.
//Anlatımlı video; https://youtu.be/_WQjR6OniZY
//Altyapılar sunucumuz; https://discord.gg/PqDVN6D47c
const Discord = require('discord.js')
const { Client, Partials, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder, ButtonBuilder } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const { botid, token } = require("./ayarlar.json")
const moment = require('moment')
const os = require('os') 
const osutils = require('os-utils') 
require("moment-duration-format")
require("./slash")(client)
const db = require("croxydb")
const fetch = require('node-fetch')
const express = require('express')
const monitor = require('http-monitor')
client.login(process.env.token)
//=====// Embedler \\=====\\
const PreYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:No:1122993152064765973>> **Normal bir kullanıcı en fazla 2 proje ekleyebilir, </link-limit:0> komutu ile link limitinizi arttırabilir, </pre-al:0> komutu ile premium alarak sınırsız link ekleyebilirsiniz.**`)
    
const FazlaLink = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:No:1122993152064765973> **Bir kullanıcı tarafından en fazla 999 link eklenebilir.**`)
   
const LinkVar = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:No:1122993152064765973> **Belirtilen proje sistemde bulunuyor.**`)
    
const BaşıHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:No:1122993152064765973> **Proje linkin hatalı, linkin başında \`https://\` olduğundan emin ol.**`)
    
const SonuHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:No:1122993152064765973> **Yalnızca glitch projeleri aktif tutulmaktdır, linkin sonunda \`.glitch.me\` olduğundan emin ol.**`)
    
const LinkEklendi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<:Yes:1122994864049619127> **Projen başarıyla sisteme eklendi, linkiniz 2-5 dk içerisinde aktif olacaktır.**`)
        
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:No:1122993152064765973> **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<:Yes:1122994864049619127> **Projen başarıyla sistemden silindi.**`)
    
const Silindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<:Yes:1122994864049619127> **Proje başarıyla sistemden silindi.**`)
    
const ProjeEklenmemiş = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:No:1122993152064765973>  **Sisteme hiç proje eklememişsin.**`)
//=====// Embedler \\=====\\

//=====// LinkEklemeFormu \\=====\\
const LinkEklemeFormu = new ModalBuilder()
    .setCustomId('linkeklemeform2')
    .setTitle('Link ekle')
const LinkEkleFormu = new TextInputBuilder()
    .setCustomId('linkekle')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://erasty-uptime.glitch.me')
    .setRequired(true)
const LinkEklemeSistemi = new ActionRowBuilder().addComponents(LinkEkleFormu);
LinkEklemeFormu.addComponents(LinkEklemeSistemi);
//=====// LinkEklemeFormu \\=====\\

//=====// LinkSilmeFormu \\=====\\
const LinkSilmeFormu = new ModalBuilder()
    .setCustomId('linksilmeform2')
    .setTitle('Link sil')
const LinkSilFormu = new TextInputBuilder()
    .setCustomId('linksil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://erasty-uptime.glitch.me')
    .setRequired(true)
const LinkSilmeSistemi = new ActionRowBuilder().addComponents(LinkSilFormu);
LinkSilmeFormu.addComponents(LinkSilmeSistemi); 
//=====// LinkSilmeFormu \\=====\\

//=====// SilmeFormu \\=====\\
const SilmeFormu = new ModalBuilder()
    .setCustomId('silmeform')
    .setTitle('Link sil')
const SilFormu = new TextInputBuilder()
    .setCustomId('sil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://proje-linki.glitch.me')
    .setRequired(true)
const SilmeSistemi = new ActionRowBuilder().addComponents(SilFormu);
SilmeFormu.addComponents(SilmeSistemi); 

const SilID = new TextInputBuilder()
    .setCustomId('silid')
    .setLabel('Projesi silinecek kullanıcı idsini giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(18)
    .setMaxLength(20)
    .setPlaceholder('873182701061021696')
    .setRequired(true)
const SilmeID = new ActionRowBuilder().addComponents(SilID);
SilmeFormu.addComponents(SilmeID);

const Sebep = new TextInputBuilder()
    .setCustomId('sebep')
    .setLabel('Projeyi silme sebebini belirtin.')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Geçersiz link.')
    .setRequired(true)
const SilmeSebep = new ActionRowBuilder().addComponents(Sebep);
SilmeFormu.addComponents(SilmeSebep);
        
//=====// SilmeKomutu \\=====\\
client.on('interactionCreate', async interaction => {
  if (interaction.commandName === "sil") {
    
    const YetkiYok = new EmbedBuilder()
      .setDescription(`<:No:1122993152064765973> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
    if(interaction.user.id !== "1165320152540250283" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "1059475189588570122"){
    return interaction.reply({embeds: [YetkiYok]});
}
    
    await interaction.showModal(SilmeFormu);
   }
 })
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'silmeform') {
      
      let linkInput = interaction.fields.getTextInputValue("sil")
      let linkID = interaction.fields.getTextInputValue("silid")
      let Sebep = interaction.fields.getTextInputValue("sebep")
      const links = db.get(`UptimeLink_${linkID}`)

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok]}).catch(e => { })
        db.unpush(`UptimeLink_${linkID}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
        interaction.reply({embeds: [Silindi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${linkID}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:No:1122993152064765973>"
        } else {
        PreVarmı = "<:Yes:1122994864049619127>"
        }
      
      
        const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Bot sahibi tarafından sistemden bir link silindi")
         .addFields({name: `<:Kullanici:1122992989325766748> **Kullanıcı adı**`, value: `<@${linkID}>`})
         .addFields({name: `<:Id:1122977905727778846> **Kullanıcı id**`, value: `${linkID}`})
         .addFields({name: `<:Belge:1046825193131225169> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: `<:Link:1122988494680232077> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${linkID}`).length}`})
         .addFields({name: `<:Premium:1122993100332204146> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
         .addFields({name: `<:Yazi:1048677751818821702> **Linkin silinme sebebi**`, value: `${Sebep}`})
        client.channels.cache.get("1112800957995167824").send({embeds: [ProjeSilindi]})
        
    }
})
//=====// SilmeKomutu \\=====\\

//=====// EklendimAtıldım \\=====\\
client.on('guildCreate', guild => {
  
  const Eklendim = new EmbedBuilder()
     .setColor("Green")
     .setTitle("Bir sunucuya eklendim")
     .addFields({name: `<:Isim:1122992989325766748> **Sunucu adı**`, value: `${guild}`})
     .addFields({name: `<:Id:1122977905727778846> **Sunucu id**`, value: `${guild.id}`})
     .addFields({name: `<:Sunucu:1122988494680232077> **Toplam sunucu**`, value: `${client.guilds.cache.size}`})
     .addFields({name: `<:Kullanici:1122988494680232077> **Toplam kullanıcı**`, value: `${client.users.cache.size}`})
  client.channels.cache.get('1112800960570462268').send({embeds: [Eklendim]})})

  client.on('guildDelete', guild => {
    
    const Atıldım = new EmbedBuilder()
     .setColor("Red")
     .setTitle("Bir sunucudan atıldım")
     .addFields({name: `<:Isim:1122992989325766748> **Sunucu adı**`, value: `${guild}`})
     .addFields({name: `<:Id:1122977905727778846> **Sunucu id**`, value: `${guild.id}`})
     .addFields({name: `<:Sunucu:1122988494680232077> **Toplam sunucu**`, value: `${client.guilds.cache.size}`})
     .addFields({name: `<:Kullanici:1122988494680232077> **Toplam kullanıcı**`, value: `${client.users.cache.size}`})
  client.channels.cache.get('1112800960570462268').send({embeds: [Atıldım]})})
//=====// EklendimAtıldım \\=====\\

//=====// LinkEklemeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "eklebuton") {
      
      const Kullanamazsın = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Komutlarımı kullanamazsın")
           .setDescription(`<:Yasak:1047203094380945458> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
       
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakim:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(interaction.user.id !== "1165320152540250283" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek], ephemeral: true})
       
          }
        }
      
    await interaction.showModal(LinkEklemeFormu);
  }
})
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'linkeklemeform2') {
    
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+25 
      
      if (!db.fetch(`UptimeLink_${interaction.user.id}`)) {
           db.set(`UptimeLink_${interaction.user.id}`, [])
        }
        const link = interaction.fields.getTextInputValue("linkekle")
        let link2 = db.fetch(`UptimeLink_${interaction.user.id}`, [])

        const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)

        if (!link) return

        if (PremiumÜye) {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= 999) {
                return interaction.reply({embeds: [FazlaLink], ephemeral: true}).catch(e => { })
            }

        } else {
        
        if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= Limit) {
                return interaction.reply({embeds: [PreYok], ephemeral: true}).catch(e => { })}
          }

        if (link2.includes(link)) {
            return interaction.reply({embeds: [LinkVar], ephemeral: true}).catch(e => { })
        }

        if (!link.startsWith("https://")) {
            return interaction.reply({embeds: [BaşıHatalı], ephemeral: true}).catch(e => { })
        }

        if (!link.endsWith(".glitch.me")) {
            return interaction.reply({embeds: [SonuHatalı], ephemeral: true}).catch(e => { })
        }
      
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`UptimeLink`, link)
  
        interaction.reply({embeds: [LinkEklendi], ephemeral: true}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:No:1122993152064765973>"
        } else {
        PreVarmı = "<:Yes:1122994864049619127>"
        }
        
      const ProjeEklendi = new EmbedBuilder()
           .setColor("Green")
           .setTitle("Sisteme bir link eklendi")
           .addFields({name: `<:Kullanici:1122992989325766748> **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
           .addFields({name: `<:Isim:1122979100689174661> **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
           .addFields({name: `<:Id:1122977905727778846> **Kullanıcı id**`, value: `${interaction.user.id}`})
           .addFields({name: `<:Belge:1122988494680232077> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
           .addFields({name: `<:Link:1122988494680232077> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
           .addFields({name: `<:Premium:1122993100332204146> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        client.channels.cache.get("1112800957995167824").send({embeds: [ProjeEklendi]})
        
     } 
 })
//=====// LinkEklemeSistemi \\=====\\

//=====// LinkSilmeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "silbuton") {
      
      const Kullanamazsın = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Komutlarımı kullanamazsın")
           .setDescription(`<:Yasak:1047203094380945458> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
      
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakim:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(interaction.user.id !== "1165320152540250283" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       
          }
        }
      
    await interaction.showModal(LinkSilmeFormu);
   }
})
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'linksilmeform2') {
    
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.guild.id}`)
      
      const links = db.get(`UptimeLink_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("linksil")

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok], ephemeral: true}).catch(e => { })
     
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
        
        interaction.reply({embeds: [LinkSilindi], ephemeral: true}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:No:1122993152064765973>"
        } else {
        PreVarmı = "<:Yes:1122994864049619127>"
        }
      const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Sistemden bir link silindi")
         .addFields({name: `<:Kullanici:1122992989325766748> **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:İsim:1122979100689174661> **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: `<:İd:1122977905727778846> **Kullanıcı id**`, value: `${interaction.user.id}`})
         .addFields({name: `<:Belge:1122988494680232077> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: `<:Link:1122988494680232077> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
         .addFields({name: `<:Premium:1122993100332204146> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        client.channels.cache.get("1112800957995167824").send({embeds: [ProjeSilindi]})
        
    }
})
//=====// LinkSilmeSistemi \\=====\\
      
//=====// LinkListeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "listebuton") {
    
    const Kullanamazsın = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Komutlarımı kullanamazsın")
           .setDescription(`<:No:1122993152064765973> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/RT62RZssJm`)
           .setLabel("Destek Sunucusu")
           .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
      
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakım:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/RT62RZssJm`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(interaction.user.id !== "1165320152540250283" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       
          }
        }
      
    const LinkYok = db.get(`UptimeLink_${interaction.user.id}`)
 			if (!LinkYok) return interaction.reply({embeds: [ProjeEklenmemiş], ephemeral: true})
        
        const links = db.get(`UptimeLink_${interaction.user.id}`).map(map => `<:Link:1046776084965900308> **Link:** ${map}`).join("\n")

        const LinkListe = new EmbedBuilder()
            .setTitle(`Sistemdeki projelerin`)
            .setDescription(`${links || "Sisteme eklenmiş bir proje yok."}`)
            .setFooter({ text: "Uptime linkler" })
            .setColor("Blurple")

        interaction.reply({
            embeds: [LinkListe],
            ephemeral: true
        }).catch(e => { })

    }
})
//=====// LinkListeSistemi \\=====\\

//=====// UptimeEtme \\=====\\
setInterval(() => {
  var links = db.get("UptimeLink");
  if (!links) return;
  links.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("Hata: " + e);
    }
  });
  console.log("Uptime başarılı")
}, 120000);
//=====// UptimeEtme \\=====\\

//=====// Seste Tutma \\=====\\
const { joinVoiceChannel } = require('@discordjs/voice')
client.on('ready', () => {
  let channel = client.channels.cache.get("1215579811385319474")
 

      const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
  });
})
//=====// Seste Tutma \\=====\\

//Bu bot altyapısı youtube erasty'e aittir düzenlenerek sizlere sunulmuștur.
//Anlatımlı video; https://youtu.be/_WQjR6OniZY
//Altyapılar sunucumuz; https://discord.gg/PqDVN6D47c