const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");


module.exports.run = async (bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixes[message.guild.id].prefix;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you cannot change the server prefix!");

    if(!args[0]) return message.reply("please enter a prefix!");

    prefixes[message.guild.id] = {
        prefix: args[0]
    }

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log (err);
    });

    let embed = new Discord.MessageEmbed()
    embed.setColor(colors.peach);
    embed.setTitle("the prefix has been set!");
    embed.setDescription(`set to ${args[0]}`);

    message.channel.send(embed);

}

module.exports.help = {
    name: "prefix",
    aliases: []
}