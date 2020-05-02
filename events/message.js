let fs = require('fs')
let main = require('../main.js')
let answer = require('../answers/answers.js')
let edit = require('../edition/edit.js')
let code = require('../edition/code.js')



main.on('message', message => {



	function permchk(fct) {if(message
		                   .channel
				    .permissionsFor (message.author)
				     .has(0x8)) {return fct}
				else {return message.reply('Vous ne semblez pas avoir les droits nécessaires pour éditer le jeu. Seuls les administrateurs le peuvent.')}
												 }

	if (message.author.bot) return

	if (message.channel.type === 'dm'){
		try {answer.run(message, main)}
		catch (err) {console.log(err); message.reply('Désolé, une Erreur est survenue dans le bot :( Contactez l\'administrateur ')}
		return }

  if (message.content === '!edit') {return permchk(edit(message))}
  if (message.content.toLowerCase() === '#check' ) {permchk(require('../edition/check.js')(message))}

  if (message.content.toLowerCase().startsWith("#etape")) {
		permchk()
		message.com = message.content.replace("#", "")
		message.args = message.com.slice(message.com.indexOf(':') + 2)
    let testfile = (`./edition/${message.args}.js`)

		fs.access(testfile, fs.constants.F_OK, (err) => {
				err ? message.reply(message.args + ' n\'est pas une commande, vérifez le préfixe ou la typo !') : require("." + testfile)(message) })
  }


	if (message.content === "!start") {
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
