const config = require("../../config.json")

module.exports = {
    name: "setup",
    aliases: ["set"],
    description: "setups the bot",
    async execute(message, args, client, Discord, db) {
        if (!message.member.permissions.has("ADMINISTRATOR") && message.author.id !== config.BOT_OWNER) return message.reply("You do not have the permission to use this command")

        let embed = new Discord.MessageEmbed()
            .setColor(config.Colors.Bot)
            .setTitle("Count On Setup!")
            .setDescription(`1️⃣- Setup Counting channel.
            2️⃣- Disable Count On`)
            .setFooter(config.footer)
            .setTimestamp()
            .setAuthor("")

        const msg = await message.channel.send(embed)

        const filter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && message.author.id === user.id

        const collector = msg.createReactionCollector(filter, { time: 1000 * 60 })

        await msg.react("1️⃣")
        await msg.react("2️⃣")

        collector.on("collect", async (reaction, user) => {
            reaction.users.remove(user)

            let finalmsg;
            const finalfilter = m => m.author.id === message.author.id
            let finalCollector;

            switch (reaction.emoji.name) {
                case "1️⃣":
                    collector.stop()
                    finalmsg = await message.channel.send("Please mention The channel or type the channel ID for Counting.")
                    finalCollector = message.channel.createMessageCollector(finalfilter, { time: 1000 * 60 })

                    finalCollector.on("collect", async m => {
                        let channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content)
                        if (!channel) return message.reply("Could not find that channel in this server.")
                        if (!channel.viewable) return message.reply("Do not have the permission to view that channel")

                        db.set(message.guild.id, {
                            channelID: channel.id,
                            count: 0,
                            lastcount: ""
                        })
                        finalCollector.stop()
                        message.channel.send(`${channel} set to Counting Channel.`)
                    })
                    break;

                case "2️⃣":
                    db.delete(message.guild.id)
                    collector.stop()
                    break;
            }
        })

        collector.on("end", () => {
            msg.reactions.removeAll()
        })
    }
}