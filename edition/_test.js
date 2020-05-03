let fs = require('fs')
const {RichEmbed} = require('discord.js')
let embed = {}

module.exports = (message, namel) => {
let num = Number(namel.replace("etape ", ""))
let path = './guilds/' + message.channel.guild
let raw = JSON.parse(fs.readFileSync(`${path}/${message.channel.guild}.json`))
let fail = 'Vide'
try {fail = require(`.${path}/fail/${num}.js`)}
catch(err) {}
let suc = 'Vide'
try { suc = require(`.${path}/success/${num}.js`)}
catch(err) {}
let code = 'Vide'
if(raw.answers[namel].hasOwnProperty('code')) {code = raw.answers[namel].code}
let att = 'https://i.imgur.com/QMutsdY.png'
if (raw.answers[namel].hasOwnProperty('file')) {att = raw.answers[namel].file}


if (num === 0) {
  message.channel.send ({embed: (embed = new RichEmbed()
  .setTitle('Etape 0')
  .addField('Texte', suc)
  .setImage(att))})
return
}
else {
  message.channel.send ({embed: (embed = new RichEmbed()
  .setTitle(namel.toUpperCase())
  .addField('CODE', code)
  .addField('TEXTE DE SUCCÈS', suc)
  .addField('TEXTE D\'ECHEC', fail)
  .setImage(att))})
return }

}
