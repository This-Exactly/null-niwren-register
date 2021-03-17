const db = require('croxydb');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'sil',
    aliases: ['sil'],
    run: async function (client, message, args) {
        if(!client.config.mods.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) 
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 5000 }));
        if (!args[0])
            return message.channel.send(" `Lütfen siliceğim mesaj miktarını girin.` ").then(msg => msg.delete({ timeout: 5000 }));
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(` \` ${args[0]} Adet mesaj silindi\` `).then(msg => msg.delete({ timeout: 5000 }));

        });
    }
};

