// action commands file
const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let gifs = [
        "https://media0.giphy.com/media/5ksnfmlzPFHaw/giphy.gif",
        "https://data.whicdn.com/images/267922974/original.gif",
        "https://i.gifer.com/AZ4i.gif",
        "https://i.kym-cdn.com/photos/images/original/001/002/209/d31.gif",
        "https://i.pinimg.com/originals/be/6c/6a/be6c6a8be82fa3bea43650281a893e87.gif",
    ];
    let pick = gifs[Math.floor(Math.random() * gifs.length)];

    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.peach);
    embed.setImage(pick);

    if(args[0]) {
        let user = message.mentions.members.first();
        embed.setTitle(`${message.author.username} sends ${bot.users.cache.get(user.id).username} a random Umaru gif!`)
    } else {
        embed.setTitle(`${message.author.username} randomly wants a gif of Umaru.`)
    }

    message.channel.send(embed);

}

module.exports.help = {
    name: "umaru",
    aliases: []
}