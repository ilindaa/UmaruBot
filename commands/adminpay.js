const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != "351052315563786261") return message.reply("you cannot use this command.");

    let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!user) return message.reply("sorry, couldn't find that user!");

    Data.findOne({
        userID: user.id
    }, (err, userData) => {
        if(err) console.log(err);

        if (!args[1]) return message.reply("please specify the amount you want to pay.");

        if(args[1] != Math.floor(args[1])) return message.reply("please enter only whole numbers!");

        if(!userData) {
            const newData = new Data ({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: parseInt(args[1]),
                daily: 0,
            })
            newData.save().catch(err => console.log(err));
        } else {
            userData.money += parseInt(args[1]);
            userData.save().catch(err => console.log(err));
        }

        return message.channel.send(`${message.author.username} admin paid $${args[1]} to ${bot.users.cache.get(user.id).username}`);
    })
    
}

module.exports.help = {
    name: "adminpay",
    aliases: ["ap"]
}