let fs = require('fs')
let main = require('../main.js')
let ack = ['yes !', 'OK !', 'ça roule !', 'done !', 'oui chef !', 'et voilà le travail !']

module.exports = (message, namel) => {

		let filePath = `./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`
	  let data = JSON.parse(fs.readFileSync(filePath))
	  let filter = m => (m.content.startsWith("#"))
	  if (namel === 'etape 0') return message.channel.send('Etape 0 ne requiert pas de code. Commencez à l\'étape 1')
	  if (data.answers.hasOwnProperty(namel)) message.channel.send(`entrez le code pour l'${namel} précédé de #.
Pour ajouter plusieurs possibilités de codes, entrez à la suite en les séparant par "#" sans espace. exemple: * #code1#code2#code3* `)

	  .then(() => message.channel.awaitMessages(filter, {max: 1})
	                 .then(c =>{ {data.answers[namel].code = (c.last().content.toLowerCase().replace("#", "").split('#'))}


	                if (message.channel.guild.roles.find(r => r.name === namel) === null) {

										message.channel.send(ack[Math.floor(Math.random() * ack.length)])

										let pos = Number(namel.replace("etape ", ""))
	                      message.channel.guild.createRole({position: pos, name: namel, hoist: true})
	                      message.channel.send('Un rôle à été créé')}

	                fs.writeFile(filePath,
	                        JSON.stringify(data, null, 2),
	                        function(err) { if(err) {return console.log(err) } })

	              message.channel.send(ack[Math.floor(Math.random() * ack.length)])})
								.catch(function(error) { message.channel.send('Temps écoulé ou format non reconnu.'); console.log(error); return
						}) )




}
