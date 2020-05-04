let fs = require('fs')
let Discord = require('discord.js')
let main = new Discord.Client

module.exports = main
	require('./events/ready.js')
	require('./events/guildMemberAdd.js')
	require('./events/message.js')
	require('./events/guildMemberRemove.js')

main.login('Njk1OTU4MTE0MzY4ODgwNzIw.Xq7Hyg.5dDMizRkgz7afYpEFg0D-LzVeV8')
