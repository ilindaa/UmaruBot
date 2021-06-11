const money = require("../money.json");
const botconfig = require("../botconfig.json");
const fs = require("fs");
const mongoose = require("mongoose");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    if (!money[message.author.id] || money[message.author.id].money <= 0) {
        return message.reply ("you do not have any money to transfer.");
    } else {
        Data.findOne({
            userID: message.author.id
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) return message.reply("Create a new account using the `balance` command!")

            message.reply(`You successfully transferred $${money[message.author.id].money}.`)
            data.money += money[message.author.id].money;
            data.save().catch(err => console.log(err));
            delete money[message.author.id];
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            });
        })

    }

}

module.exports.help = {
    name: "transfer",
    aliases: []
}