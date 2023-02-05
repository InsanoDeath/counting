const Discord = require("discord.js")
const client = new Discord.Client({
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})
const fs = require("fs")
const config = require("./config.json")
const db = require("croxydb")

client.setMaxListeners(0);

client.on("ready", async () => {
    console.log(`${client.user.username} is now ready`)
    const guilds = client.guilds.cache.size
    const users = client.users.cache.size
    client.user.setActivity(`${config.prefix}help in ${guilds} guilds with ${users} users`, { type: "LISTENING" })


    const handlers = fs.readdirSync("./handlers").filter(h => h.endsWith(".js"))
    for (let handler of handlers) {
        require(`./handlers/${handler}`)(client, Discord, db)
    }
})


client.login(config.token)