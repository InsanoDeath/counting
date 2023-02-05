const config = require("../../config.json")

module.exports = {
  name: "developer",
  aliases: ["dev"],
  description: "Shows Information about the Bot Developer",
  async execute(message, args, client, Discord) {
    const me = client.users.cache.get("539738942346493952")

    let embed = new Discord.MessageEmbed()
    .setColor(config.Colors.Bot)
    .setAuthor(me.tag, me.displayAvatarURL(), config.discord)
    .setTitle("Developed more than 50 Bots")
    .setURL(config.discord)
    .setDescription("Hello My name is Sameer Arora AKA InsanoDeath#1972 and I develop bots for free as well as paid\n\nI have made more than 50 private and public bots.")
    .addField("\u200b", `**[Invite](${config.invite}) | [Premium](${config.discord}) | [Support](${config.discord})**`)
    .setFooter("InsanoDeath")
    .setFooter()
    
    message.channel.send(embed)
  }
}