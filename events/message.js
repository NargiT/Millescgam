let fs = require('fs')
let main = require('../main.js')
let answer = require('../answers/answers.js')
let edit = require('../edition/edit.js')
let data = {}


main.on('message', message => {

  let guildPath = `./guilds/${message.channel.guild}/${message.channel.guild}.json`
  if (fs.existsSync(guildPath)) {data = JSON.parse(fs.readFileSync(guildPath))}

	function permchk(fct) {if(message
		                   .channel
												.permissionsFor (message.author)
											   .has(0x8)) {return fct}
												 else {return message.reply('Vous ne semblez pas avoir les droits nécessaires pour éditer le jeu. Seuls les administrateurs le peuvent.')}
												 }

	if (message.author.bot) return

	if (message.channel.type === 'dm'){
		try {answer.run(message, main)}
		catch (err) {console.log(err) ; message.reply('Ah! Pas de message programmé...')}
		return }

  if (message.content === '!edit') {permchk()
  return edit(message)}
  if (message.content === '!commandes') {permchk(); return message.channel.send({ embed: require('../edition/commandslist.js')})}

  if (message.content.toLowerCase().startsWith("#")) {
		permchk()
    require(`../edition/command.js`)(message)}




	if (message.content === data.start) {
		main
	  .guilds
	   .find(s => message.channel.guild)
	    .member(message.author.id)
			 .addRole(
			   message.channel.guild.roles
			    .find(r => r.name === ('etape 1'))
        )
    return message
		        .author
						 .createDM()
						  .then(channel => channel.send(require(`../guilds/${message.channel.guild}/success/0.js`)))
		}

})
