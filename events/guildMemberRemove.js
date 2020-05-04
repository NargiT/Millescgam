let main = require('../main.js')
let fs = require('fs')

main.on('guildMemberRemove', (member) => {
  member.send(`Attention si vous commencez une partie sur ce serveur, vous ne pourrez pas continuer la partie sur les autres serveurs.`)

let data = JSON.parse(fs.readFileSync('./players.json'))

  data[member.id].splice(data[member.id].indexOf(member.guild.name), 1)

      fs.writeFile('./players.json',
              JSON.stringify(data, null, 2),
              function(err) { if(err) {return console.log(err) }
              })
})
