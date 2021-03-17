const db = require('croxydb');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'say',
    aliases: ['say'],
    run: async(client, message, args) => {
        if(!client.config.mods.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) 
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 5000 }));
        const mapping = {
            '0': `<a:sayi0:820897177584402452>   `,
            '1': `<a:sayi1:820897177474695168> `,
            '2': `<a:sayi2:820897178578059275> `,
            '3': `<a:sayi3:820897179513520149> `,
            '4': `<a:sayi4:820897178696024064> `,
            '5': `<a:sayi5:820897178594574346> `,
            '6': `<a:sayi6:820897178770997272> `,
            '7': `<a:sayi7:820897178293633076> `,
            '8': `<a:sayi8:820897179521646603> `,
            '9': `<a:sayi9:820897178524188693>`,
        };
        var boost1 = client.config.boosterRoles
        var tag1 = '⁵⁸'
        var emoji = '<a:say2:821309952613941248>'
        var etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "0094").size;
        var toplamAile = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0094").size;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag1)).size
        var boost = message.guild.members.cache.filter(r=>r.roles.cache.has(boost1)).size
        var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
        var emoonline = `${online}`.split("").map(c => mapping[c] || c).join("")
        var emotag = `${tag}`.split("").map(c => mapping[c] || c).join("")
        var emoses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")
        var emoetiket = `${etiket}`.split("").map(c => mapping[c] || c).join("")
        var emoboost = `${boost}`.split("").map(c => mapping[c] || c).join("")
        var emotoplam = `${toplamAile}`.split("").map(c => mapping[c] || c).join("")

        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))   
            .setDescription(`
            ${emoji} **Sunucumuz da** ${emotoplamüye} **kişi bulunmakta.**
            ${emoji} **Sunucumuz da** ${emoonline} **aktif kişi bulunmakta.**
            ${emoji} **Sunucumuz da** ${emotag} **taglı üye bulunmakta.**
            ${emoji} **Sunucumuzu boostlayan** ${emoboost} **kişi bulunmakta.**
            ${emoji} **Ses kanallarında** ${emoses} **kişi bulunmakta.**
            `)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/819605420019810313/819975958856466493/a_c908b7ab96399eefacfa6c371caa7b26.gif')
            .setFooter('Developer By Zeox')
        message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
    }
}