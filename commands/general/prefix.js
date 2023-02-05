const config = require("../../config.json")

module.exports = {
  name: "prefix",
  aliases: ["pr"],
  usage: "[prefix]",
  description: "Sets a prefix",
  async execute(message, args, client, Discord, db) {
    if (!args.length) {
      let dbGuild;
      try {
        dbGuild = db.get(message.guild.id)
      } catch { }
      let PREFIX;

      if (dbGuild) PREFIX = dbGuild.prefix || config.prefix
      if (!dbGuild) PREFIX = config.prefix
      return message.reply(`Prefix for this Guild is: \`${PREFIX}\``)
    }

    if (args.length) {
      if (message.author.id === config.BOT_OWNER || message.member.permissions.has("ADMINISTRATOR")) {
        db.set(message.guild.id, {
          prefix: args[0]
        })
        message.reply(`Prefix for this guild is set to \`${args[0]}\``)
      } else {
        message.reply("You do not have the permission to use this command")
      }
    }
  }
}