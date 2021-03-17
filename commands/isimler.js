const db = require('croxydb');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'isimler',
    aliases: ['isimler'],

    run: async(client, message, args) => {
        
        if(!client.config.register.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send("`Bu Komut İçin Yetkin Yok`").then(x => x.delete({timeout: 5000}));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("`Lütfen geçerli bir kullanıcı belirt.`").then(x => x.delete({timeout: 5000}))
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("`Daha önceden kayıt olmamış.`").then(x => x.delete({timeout: 5000}))
        const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle("Eski Kullanıcı isimleri")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setFooter('Developer By Mustafa')
            .setTimestamp()
        message.channel.send(embed).then(x => x.delete({timeout: 20000}))
    }
}