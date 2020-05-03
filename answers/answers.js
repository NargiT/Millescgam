const fs = require('fs')
const { Attachment } = require('discord.js')

exports.run = (message, main) => {

	let Serv = main.guilds.find(s => s.members.has(message.author.id))
	let dude = Serv.member(message.author.id)
	let dudeRole = []
	let msg = message.content.toLowerCase()
	let ans = JSON.parse(fs.readFileSync('./guilds/' + Serv.name + '/' + Serv.name + '.json', (err, files) => {if (err) return console.log(err)}))


		for (i = 1; i <= ans.etapes; i++) {

		let r = dude.roles.find(s => s.name === `etape ${i}`)
		dudeRole.push(r === null)
	 }
		dudeRole.push(true)

	let pos = dudeRole.indexOf(true)
	  if (pos === 0) {return message.reply('Tapez start dans le channel général pour commencer à jouer.')}

	let fail = ''
	try {fail = require('../guilds/' + Serv.name + '/fail/' + pos)}
	catch (err){message.channel.send('oups, il semblerait qu\'il y ait une erreur. Parlez en au MJ')}
	let suc = ''
	try {suc = require ('../guilds/'+ Serv.name + '/success/' + pos)}
	catch(err) {message.channel.send('oups, il semblerait qu\'il y ait une erreur. Parlez en au MJ')}
	let rand = fail[Math.floor(Math.random() * fail.length)]

  function attchk() {
		if (ans.answers[`etape ${pos}`].hasOwnProperty('file')) {
			let att = new Attachment (ans.answers[`etape ${pos}`].file)
			message.reply(suc, att)
		  }
				else {message.reply(suc)}
		}

	function roleup(rolename) {
		dude
		 .addRole(
			 Serv
			 .roles
			  .find(r => r.name === rolename))
	}




	if (pos === ans.etapes & ans.answers[`etape ${pos}`].code.includes(msg.toLowerCase()) ) {
			message.react("✔")
      attchk()
      roleup('Explorateurs')
      return
   }


		 else if (ans.answers[`etape ${pos}`].code.includes(msg)) {

			message.react("✔")
    	attchk()
			roleup(`etape ${pos + 1}`)
			return
    }


			else {
			 message.react("❌")
			 return message.reply(rand)
			}
		}
