const fs = require ('fs')
let ack = ['yes !', 'OK !', 'ça roule !', 'done !', 'oui chef !', 'et voilà le travail !']

module.exports = (message) => {
console.log('running')
let file = `./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`
let data = JSON.parse(fs.readFileSync(`./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`))
let filter = m => (m.content.startsWith("#"))

   message.channel.send('Entrez le nom du Rôle à attribuer aux gagnants (par défaut "Explorateurs")')
   .then(() => {
     message.channel.awaitMessages(filter, {max: 1})
        .then(c => {
          let nr = message.channel.guild.roles.find(r => r.name === data.answers.final)
          console.log(message.channel.guild.roles)
          nr.edit({name: c.first().content.replace("#","")})
          data.answers.final = c.first().content.replace("#","")
          fs.writeFile(file,
                  JSON.stringify(data, null, 2),
                  function(err) { if(err) {return console.log(err) }
                  })
          message.channel.send(ack[Math.floor(Math.random() * ack.length)])
          return
                })
        .catch(function (error) {message.channel.send(`Impossible de trouver le rôle. Essayez de renommer manuellement le rôle avec ce nom ***${data.answers.final}***, et réessayez`)})

   }
 )
}
