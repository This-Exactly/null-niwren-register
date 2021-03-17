const Discord = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: 'vip',
    aliases: ['special', 'vip'],
    run: async(client, message, args) => {

        if(!client.config.mods.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) 
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 10000 }))

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("`Lütfen geçerli bir kullanıcı belirt.`").then(msg => msg.delete({ timeout: 10000 }))

        await message.guild.members.cache.get(member.id).roles.add(client.config.vipRoles)
        message.channel.send("`Rol verilmiştir.`").then(msg => msg.delete({ timeout: 10000 }))

    }
}