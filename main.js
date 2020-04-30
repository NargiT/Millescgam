let fs = require('fs')
let Discord = require('discord.js')
let main = new Discord.Client

module.exports = main
	require('./events/ready.js')
	require('./events/guildMemberAdd.js')
	require('./events/message.js')

main.login('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
