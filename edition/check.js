const fs = require('fs')
const main = require('../main')

module.exports = (message) => {

    let data = JSON.parse(fs.readFileSync(`./guilds/${message.channel.guild}/${message.channel.guild}.json`))

    for (i = 0; i <= data.etapes; i++) {
       message.content = `etape ${i}:`
      require('./test.js')(message)
    }
}
