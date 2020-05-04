const fs = require('fs')

module.exports = (message) => {

  let filter = m => (m.content.startsWith("#"))
  let name = message.com.split(':')[0]
  let namel = name.toLowerCase()
  let file = './guilds/' + message.channel.guild.name + '/' + message.channel.guild.name + '.json'
  let data = JSON.parse(fs.readFileSync(file))

      if (data.answers.hasOwnProperty(name))  {message.channel.send(`Pour utiliser au mieux cette fonction, utilisez un lien direct **imgur**. N'oubliez pas "#" au début`)}
   	  else {return (message.channel.send('La typo de l\'étape semble erronée, ou l\'étape en question n\'existe pas.'))}

  message.channel.awaitMessages(filter, {max: 2, time: 60000, error: ['time']})
                 .then(e => {
                    data.answers[namel].file = e.first().content.replace("#","")
                    let ack = ['yes !', 'OK !', 'ça roule !', 'done !', 'oui chef !', 'et voilà le travail !']
                    message.channel.send(ack[Math.floor(Math.random() * ack.length)])

                    fs.writeFile(file,
                            JSON.stringify(data, null, 2),
                            function(error) { if(error) {return console.log(error) }
                            })
                    })
                 .catch(function(error) {message.channel.send('Erreur ou temps écoulé, vérifiez la typo et la présence du "#"')})



}
