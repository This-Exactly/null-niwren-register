const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('croxydb');
const moment = require('moment');
const { name } = require('./commands/erkek');
require('moment-duration-format');
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})


////----------------------- READY KISMI -----------------------\\\\

client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'Developer By Zeox' }, type: "WATCHING", status: 'dnd' })
    client.channels.cache.get('821706493878992956').join()
    console.log(`Bot ${client.user.tag} ismi ile açıldı`);
  })

////----------------------- CONFIG KISMI -----------------------\\\\

client.config = {
  vipRoles: ['821706518167683143'], // Vip Rolü
  boosterRoles: [''],
  komuttag: ['⁵⁸'],
  maleRoles: ['821706520654774343'], // erkek
	maleRoles2: ['821706520697896981'], // Erkek 2
	maleRoles3: ['821706521422331944'], // Erkek 3
  girlroles: ['821706519279042570'], // Hatun 
	girlroles2: ['821706519828496425'], // Hatun 2
	girlroles3: ['821706519606198293'], // Hatun 3
  register: ['821706498576482317'],
  unregisteres:  ['821706522458587136'],
  mods: ['821706491412086824'], // Kayıt Yetkilisi
  yönetim: ['821504162025308170'], // Üst Yönetim

}
client.config2 = {
  prefix: '.', // Prefix
  sunucu: '821504015551430738', // Sunucu ID
  sunucutagı: '⁵⁸', // Sunucu Tagı
  sunucutagı2: '•',
  tagroltagrolü: '821706517677211659',// Family Rolü
  tagrolsohbet: '821706500489609256', // Tag alınca kanala mesaj
  tagrollog: '821706506209984512', //Tag alınca log kanalı
  yenihesap: '821706522739867668', // Yeni Hesap Rolü
  kayıtkanalı: '821706488862474282', // Kayıt Kanalı
  kayıtsız: '821706522458587136', // Kayıtsız Üye Rolü
  sahip: '770307586477522964',
  etikett: '0058',

}

////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = client.config2.prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})


client.on("message", async message => {
  if(!message.author.id == client.config2.sahip) return;
  if (message.content === ".gir") {
      client.emit(
          "guildMemberAdd",
          message.member || (await message.guild.fetchMember(message.author))
      );
  }
});


////----------------------- HEM ETİKET HEMDE TAG ROL KISMI ----------------------
  
  client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
    const db = require('croxydb');
    const guildID = client.config2.sunucu
    const roleID = client.config2.tagroltagrolü
    const tag = client.config2.sunucutagı
    const chat = client.config2.tagrolsohbet
    const log2 = client.config2.tagrollog
    const etiket = client.config.etikett
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.set(client.config.unregisteres)
            member.roles.remove(roleID)
            member.setNickname(`${client.config2.sunucutagı2} İsim | Yaş`)
            db.delete(`isimler_${member.user.id}`)
            db.delete(`kayıt_${member.id}`)
            client.channels.cache.get(log2).send(` ${newUser} \` Tag çıkardı.\``)
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
            client.channels.cache.get(log2).send(` ${newUser} \` Tag aldı.\``)
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == `${etiket}` && newUser.discriminator !== `${etiket}`) {
            member.roles.remove(roleID)
            member.setNickname(`${client.config2.sunucutagı2} İsim | Yaş`)
            client.channels.cache.get(log2).send(` ${newUser} \` Tag çıkardı.\``)
        } else if (oldUser.discriminator !== `${etiket}` && newUser.discriminator == `${etiket}`) {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(` ${newUser} \` Tag aldı.\``)
            client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
        }
    }
  
  }) 

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\

client.emojiler = {
    evet: "820898665882583050",
    hayir: "820898666197417984",
    kral: "820898667598577703",
  }

client.emoji2 = {
  hayir: ['<a:hayir:820898666197417984>'],
  evet: ['<a:evet:820898665882583050>'],
  say1: ['<a:say1:820898665097986049>'],
  say2: ['<a:say2:821309952613941248>'],
}

client.on("guildMemberAdd", Spanker => {

  Spanker.setNickname(`${client.config2.sunucutagı2} İsim | Yaş`)
  
    Spanker.roles.add(client.config2.kayıtsız);
  })

client.on("guildMemberAdd", (member, message) => {
    const sunucuid = client.config2.sunucu
    const id = client.config2.kayıtkanalı
    const kayıtsızRole = client.config2.kayıtsız
    const jailRole = client.config2.yenihesap
    if (member.guild.id !== sunucuid) return;
    const channel = member.guild.channels.cache.get(id);
  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY");
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        '0': `<a:sayi0:820897177584402452>   `,
        '1': `<a:sayi1:820897177474695168> `,
        '2': `<a:sayi2:820897178578059275> `,
        '3': `<a:sayi3:820897179513520149> `,
        '4': `<a:sayi4:820897178696024064> `,
        '5': `<a:sayi5:820897178594574346> `,
        '6': `<a:sayi6:820897178770997272> `,
        '7': `<a:sayi7:820897178293633076> `,
        '8': `<a:sayi8:820897179521646603> `,
        '9': `<a:sayi9:820897178524188693>`}[d];
          })
        }
  channel.send(`
  
  <a:kral:820898667598577703> **Sunucumuza hoşgeldin** <a:kral:820898667598577703>
  
  ${member} - \`${member.id}\`

  ${client.emoji2.say2} Seninle Beraber ${üyesayısı} Kişi olduk.

  ${client.emoji2.say2} Tagımızı alarak Ailemize Katılabilirsin.
    
  ${client.emoji2.say2} Ses Kanallarına Girerek Kayıt Olabilirsin.
    
  ${client.emoji2.say2} <#821706491731902464> Kanalını Okumayı Unutma.
    
  ${client.emoji2.say2} Hesabını Açılış Tarihi **${memberGün} ${memberAylar} ${memberTarih}  ${guvenilirlik ? "<a:hayir:820898666197417984>" : "<a:evet:820898665882583050> " }**
    
  ${client.emoji2.say2} Tagımızı Almak İçin \`.tag\` Yazabilirsin.
    `)
    if (guvenilirlik) {
  member.roles.set(client.config.unregisteres)
  member.roles.add(client.config.yenihesap)
    return;  
    }
  });

////----------------------- TAG MESAJ KISMI -----------------------\\\\

client.on("message", message => {
  if(message.content.toLowerCase() == ".tag") 
  return message.channel.send('`⁵⁸` Veya `0058`').then(x => x.delete({ timeout: 8000 }));
});



client.on("guildMemberAdd", member => {
  let sunucuid = client.config2.sunucu
  let tag = client.config2.sunucutagı
  let log2 = client.config2.tagrollog
  let rol = client.config2.tagroltagrolü
if(member.user.username.includes(tag)){
member.roles.add(rol)
client.channels.cache.get(log2).send(` ${member} \` Sunucuya taglı olarak giriş yaptı.\``);
}
})

////----------------------- TAG TARAMASI KISMI -----------------------\\\\

/*setInterval(() => {
    const server = client.guilds.cache.get("821504015551430738");
    server.members.cache.forEach(async member => {
        if (member.roles.cache.has(client.config.vipRoles) || member.roles.cache.has(client.config.boosterRoles)) return; //VİP&BOOSTER ROL İD
   
   if(member.user.username.includes("†")){
        member.roles.set(["821706522093420594"]).catch(() => {}) 
    }                                                                    //Bu amını siktiğmin şeyini başka botta kullanırsanız bot yavaşlamaz rol verme gibi sorunları olmaz.


 if (member.user.username.includes("⁵⁸")) {
            await member.roles.add(client.config2.tagroltagrolü).catch(() => {})
        }

    })
}, 60 * 1000)// 60(60 saniye) kısmını değiştirebilirsiniz */ 

client.login('sikşş')//token
