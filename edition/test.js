let fs = require('fs')

module.exports = (message) => {
let step =  message.content.split(':')[0]; step = step.toLowerCase().replace("#", "")
let num = Number(step.replace("etape ", ""))
let path = './guilds/' + message.channel.guild
let raw = JSON.parse(fs.readFileSync(`${path}/${message.channel.guild}.json`))
let fail = ''
try {fail = require(`.${path}/fail/${num}.js`)}
catch(err) {}
let suc = ''
try { suc = require(`.${path}/success/${num}.js`)}
catch(err) {}
let code = ''
if(raw.answers[step].hasOwnProperty('code')) {code = raw.answers[step].code}
let att = ''
if (raw.answers[step].hasOwnProperty('file')) {att = raw.answers[step].file}


if (step === 0) {
  message.channel.send (`***${step.toUpperCase()}***
\`\`\`FICHIER LIEN: ${att}\`\`\`
\`\`\`TEXTE: ${suc}\`\`\``)
}

  message.channel.send (`***${step.toUpperCase()}***
\`\`\`CODE: ${code}\`\`\`
\`\`\`FICHIER LIEN: ${att}\`\`\`
\`\`\`TEXTE DE SUCCÈS: ${suc}\`\`\`
\`\`\`TEXTE D'ECHEC: ${fail}\`\`\``)
}
