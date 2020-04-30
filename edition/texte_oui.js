const fs = require('fs')

module.exports = (message) => {

	let name = message.com.toLowerCase().split(':')[0]
  let pos = Number(name.replace("etape ", ""))
  let filter = m => (m.content.startsWith("#"))
  let filePath = ('./guilds/' + message.channel.guild.name + '/success/')
	let data = JSON.parse(fs.readFileSync(`./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`))

  if (data.answers.hasOwnProperty(name)) message.channel.send('Entrez le texte pour le succès sur cette étape, précédé de #. Si vous souhaitez ajouter un lien vers un fichier(audio, texte ...), insérez le lien dans votre texte')
	  else {return (message.channel.send('La typo de l\'étape semble erronée, ou l\'étape en question n\'existe pas.'))}

  message.channel.awaitMessages(filter, {max: 2})
                 .then(e => {
                    let buff = ''
										try { buff = e.first().content.replace("#","") }
										catch(err) {message.channel.send('Erreur de format. Vérifiez le préfixe.')}
                    message.channel.send('Voici le texte tel qu\'il sera vu par les joueurs : ' + buff)


                   fs.writeFile((filePath + pos +'.js'), ("module.exports = `" + buff + "`"), function(err) {
											if(err) {
												fs.mkdirSync('./guilds/' + message.channel.guild.name + '/success/')
											  fs.writeFile((filePath + pos +'.js'), ("module.exports = `" + buff + "`"), function(err) { if(err) {return message.channel.send('Erreur') }})}
											})

                  })
}
