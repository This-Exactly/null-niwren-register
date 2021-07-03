const Discord = require('discord.js');
const client = new Discord.Client();
client.veri = require("./null/null-veri.json");
client.sistem = require("./null/null-ayar.json");
const nulll = client.sistem;
const veri = client.veri;
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

fs.readdir("./commands", (err, files) => {
  if(err) return console.error(err);
  files = files.filter(file => file.endsWith(".js"));
  console.log(`[ ${files.length} ] Adet NULL Komutları Yüklenecek!`);
  
});


////----------------------- READY KISMI -----------------------\\\\

client.on('ready', () => {
    client.user.setPresence({ activity: { name: nulll.botdurum }, type: "WATCHING", status: 'dnd' })
    let seskanalı = client.channels.cache.get(nulll.seskanalı);
  if (seskanalı) seskanalı.join().catch(err => console.error("Ses kanalına giriş yapılamadı."));
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] Bot başarıyla açıldı.`);
  })


////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = nulll.prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})



////----------------------- HEM ETİKET HEMDE TAG ROL KISMI ----------------------
  
  client.on("userUpdate", async function(oldUser, newUser) {
    const guildID = nulll.sunucuid
    const roleID = veri.tagrolü
    const tag = veri.sunucutagı
    const chat = veri.sohbetkanalı
    const log2 = veri.taglog
    const etiket = veri.etikettagı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.set(veri.kayıtsız)
            member.roles.remove(roleID)
            member.setNickname(`${veri.sunucutagı2} İsim | Yaş`)
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
            member.setNickname(`${veri.sunucutagı2} İsim | Yaş`)
            client.channels.cache.get(log2).send(` ${newUser} \` Tag çıkardı.\``)
        } else if (oldUser.discriminator !== `${etiket}` && newUser.discriminator == `${etiket}`) {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(` ${newUser} \` Tag aldı.\``)
            client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
        }
    }
  
  }) 

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\


client.on("guildMemberAdd", (member, message) => {
  const sunucuid = nulll.sunucuid
  const id = veri.kayıtkanalı
  if (member.guild.id !== sunucuid) return;
  const channel = member.guild.channels.cache.get(id);
  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY");
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
  member.setNickname(`${veri.sunucutagı2} İsim | Yaş`)
  member.roles.add(veri.kayıtsız);
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        '0': `<a:00:852781537216692224>`,
        '1': `<a:11:852781537375158272>`,
        '2': `<a:22:852781537233469450>`,
        '3': `<a:33:852781537141587991>`,
        '4': `<a:44:852781537282752513>`,                  
        '5': `<a:55:852781539476897822>`,
        '6': `<a:66:852781537443184670>`,
        '7': `<a:77:852781537580548096>`,
        '8': `<a:88:852781537313423380>`,
        '9': `<a:99:852781537464025146>`}[d];
          })
        }
channel.send(`
${client.emojis.cache.get(veri.emojiler.hg)} Sunucumuza Hoşgeldiniz.\n
${client.emojis.cache.get(veri.emojiler.hg)} ${member} ${client.emojis.cache.get(veri.emojiler.çizgi)} \`${member.id}\` Hesabın Açılış Tarihi **${memberGün} ${memberAylar} ${memberTarih}  ${guvenilirlik ? `${client.emojis.cache.get(veri.emojiler.onay)}` : `${client.emojis.cache.get(veri.emojiler.iptal)}` }** \n
${client.emojis.cache.get(veri.emojiler.hg)} Sunucumuz seninle birlikte ${üyesayısı} kişiye ulaştı.\n 
${client.emojis.cache.get(veri.emojiler.hg)} Sunucu kurallarımız <#${veri.kurallar}> kanalında belirtilmiştir.\n
${client.emojis.cache.get(veri.emojiler.hg)} <@&${veri.register}> rolündeki arkadaşlar seninle ilgilenecek.\n 
${client.emojis.cache.get(veri.emojiler.hg)} Ailemize katılmak istersen \`.tag\` Yazabilirsin.\n 
`)
    if (guvenilirlik) {
  member.roles.set(veri.kayıtsız)
  member.roles.add(veri.yenihesap)
    return;  
    }
  });


client.on("guildMemberAdd", member => {
  let tag = veri.sunucutagı
  let log2 = veri.taglog
  let rol = veri.tagrolü
if(member.user.username.includes(tag)){
member.roles.add(rol)
client.channels.cache.get(log2).send(` ${member} \` Sunucuya taglı olarak giriş yaptı.\``);
}
})


setInterval(() => {
    const server = client.guilds.cache.get("850504875229315143");
    server.members.cache.forEach(async member => {
        if (member.roles.cache.has(veri.viprolü) || member.roles.cache.has(veri.booosters)) return;
   
 if (member.user.username.includes(veri.sunucutagı)) {
            await member.roles.add(veri.tagrolü).catch(() => {})
        }

    })
}, 60 * 1000)

client.login(nulll.token).catch(err => console.error("[~ NULL ~] Discord API Botun tokenini doğrulayamadı."));
