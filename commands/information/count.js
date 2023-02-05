module.exports = {
    name: "count",
    description: "Displays Server Counting",
    execute(message, args, client, Discord, db) {
        const count = db.get(message.guild.id).count

        message.reply(`Current Counting is ${count}`)
    }
}