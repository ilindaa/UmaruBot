const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    if (message.author.id != 351052315563786261) return;

    Data.find({
        lb: "all"
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {
        if(err) console.log(err);

        if(!args[0]) return message.reply("please specify an amount!");
        if(args[0] != Math.floor(args[0])) return message.reply("please enter only whole numbers!");

        if (!res) return message.reply("no users found!");

        for (i = 0; i < res.length; i++) {
            Data.findOne({
                userID: res[i].userID
            }, (err, data) => {
                if(err) console.log(err);
                if(data) {
                    data.money += parseInt(args[0]);
                    data.save().catch(err => console.log(err));
                }
            })
        }

        return message.channel.send(`${message.author.username} admin paid $${args[0]} to everyone!`)

    })

}

module.exports.help = {
    name: "payall",
    aliases: []
}