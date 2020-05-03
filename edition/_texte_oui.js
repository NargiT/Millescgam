const fs = require('fs')

module.exports = (message, namel) => {


  let pos = Number(namel.replace("etape ", ""))
  let filter = m => (m.content.startsWith("#"))
  let filePath = ('./guilds/' + message.channel.guild.name + '/success/')
	let data = JSON.parse(fs.readFileSync(`./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`))

  if (data.answers.hasOwnProperty(namel)) message.channel.send(`Entrez le texte pour le succès sur cette étape, précédé de #. Si vous souhaitez ajouter un lien vers un fichier(audio, texte ...), insérez le lien dans votre texte
  \`\`\`texte\`\`\`
Si vous souhaitez intégrer des blocs comme ci-dessus assurez vous d'ajouter un \\ avant chaque \``)

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
