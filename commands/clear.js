module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot clear messages!");
    if(!args[0]) return message.reply("How many messages do you want to clear?");
    if(parseInt(args[0]) > 99) return message.reply("You cannot delete more than 99 messages at a time!");

    // need to make sure you give your bot manage messages permission!
    message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
        message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete({timeout: 300}));
    }).catch((err) => {
        return message.reply("An error occurred!");
    })
}

module.exports.help = {
    name: "clear",
    aliases: []
}