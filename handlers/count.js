const config = require("../config.json")

module.exports = (client, Discord, db) => {
    client.on("message", async message => {
        if (message.author.bot || !message.guild) return

        const data = db.get(message.guild.id)

        if (data && message.channel.id === data.channelID) {
            const lastMessage = await message.channel.messages.fetch({ limit: 2 })
            const count = data.count

            if (message.content.startsWith(config.prefix)) return

            if (isNaN(parseInt(message.content))) {
                try {
                    message.delete()
                } catch { }
            } else {
                if (parseInt(message.content) !== parseInt(count) + 1) {
                    try {
                        message.delete()
                    } catch { }
                } else if (data.lastcount && data.lastcount === message.author.id) {
                    try {
                        message.delete()
                    } catch { }
                } else {
                    data.count = parseInt(message.content)
                    data.lastcount = message.author.id

                    db.set(message.guild.id, data)
                }
            }
        }
    })
}