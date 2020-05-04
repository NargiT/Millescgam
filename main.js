let fs = require('fs')
let Discord = require('discord.js')
let main = new Discord.Client

module.exports = main
	require('./events/ready.js')
	require('./events/guildMemberAdd.js')
	require('./events/message.js')
	require('./events/guildMemberRemove.js')

main.login('nope')
