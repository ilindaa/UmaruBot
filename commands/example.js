const Discord = require("discord.js")
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();

    embed.setTitle(`Title`);
    embed.setColor(colors.peach);
    embed.setDescription(`Description here!`);
    embed.addField("Field One", "Field Two");
    embed.setImage("https://static.zerochan.net/Himouto%21.Umaru-chan.full.1928266.jpg"); // trio
    embed.setThumbnail("https://lh3.googleusercontent.com/proxy/GAFC_TjDjGu3XpqA7w4s5v2rTEsDh4OOcFpPJTlAvV_O8nMUhvVLFOjbXs47tgUCxOFYzm0eTLUx0SZ7mDSo1Ixt90rXu-AlMgKAzXTMvgx8KfUpgHNjRsy9"); // bubbles
    embed.setFooter("Text at bottom");
    message.channel.send(embed);
}

module.exports.help = {
    name: "example",
    aliases: []
}