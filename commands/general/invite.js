const config = require("../../config.json")

module.exports = {
  name: "invite",
  description: "To add/invite the bot to your server",
  execute(message, args, client, Discord) {
    var permissions = 536996944;
    var adminperm = 8;
    const url = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot%20applications.commands`
    const adminurl = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${adminperm}&scope=bot%20applications.commands`

    let invite = new Discord.MessageEmbed()
      .setTitle(`**Invite me now**`)
      .setDescription(
        `**Invite me today!** \n\n [Invite Link with Necessary Permissions](${url})\n[Invite Link with Admin Permissions](${adminurl})`
      )
      .setURL(adminurl)
      .addField("\u200b", `**[Invite](${config.invite}) | [Premium](${config.discord}) | [Support](${config.discord})**`)
      .setColor(config.Colors.Bot);
    return message.channel.send(invite);
  }
};
