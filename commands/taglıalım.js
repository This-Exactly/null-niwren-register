const Discord = require('discord.js');
const db = require('croxydb');
client = new Discord.Client();

module.exports = {
    name: 'taglıalım',
    aliases: ['taglıalım'],
    run: async (client, message, args) => {


        if(!client.config.yönetim.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) 
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 5000 }))

        if (!args[0]) {
            message.channel.send(` ${client.emoji2.hayir} Yanlış kullanım doğrusu \n\n ${client.config2.prefix}taglıalım aç/kapat` ).then(x => x.delete({ timeout: 10000 }))
            return;
        }
        if (args[0] === "aç") {
            if (db.fetch(`taglıAlım.${message.guild.id}`))
                return message.channel.send(`${client.emoji2.hayir} Taglı alım sistemi zaten aktif!`).then(x => x.delete({ timeout: 5000 }))
            db.set(`taglıAlım.${message.guild.id}`, "taglıAlım");
            message.channel.send(`${client.emoji2.evet} Taglı alım sistemi aktif edildi!`).then(x => x.delete({ timeout: 5000 }))
            return;
        } else if (args[0] === "kapat") {
            if (!db.fetch(`taglıAlım.${message.guild.id}`))
                return message.channel.send(`${client.emoji2.hayir} Taglı alım sistemi zaten devre dışı!`).then(x => x.delete({ timeout: 5000 }))
            db.delete(`taglıAlım.${message.guild.id}`);
            message.channel.send(`${client.emoji2.evet} Taglı alım sistemi devre dışı bırakıldı!`).then(x => x.delete({ timeout: 5000 }))
            return;
        };
    }

}