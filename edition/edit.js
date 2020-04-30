const fs = require ('fs')
let main = require('../main.js')


module.exports = (message) => {

  srv = message.channel
  let msg = message
  let file = `./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`
  msg.channel
               .send(`***Bienvenue dans l\'assistant d\'édition. Tous vos messages doivent être précédés du signe "#".***
*Assurez vous d'utiliser un salon discord privé afin de ne pas rendre les réponses publiques.*
***Veuillez entrer le nombre d\'étapes prévues pour votre jeu, précédé par "#". (le nombre d\'étapes correspond au nombre de codes à trouver)***`)

                let filter = m => (m.content.startsWith("#"))
                let data = JSON.parse('{"answers": {"etape 0": {"file": ""}}, "etapes": 0 }')
                try{fs.mkdirSync('./guilds/' + message.channel.guild.name)} catch(err) {}
                msg.channel
                       .awaitMessages(filter, {max: 2, time: 60000, error: ['time']})
                       .then(e => {
                             data.etapes = Number(e.first().content.replace("#",""))
                             msg.channel.send('souhaitez vous confimer ' + data.etapes + ' étapes ? #oui/#non')
                            })
                       .catch(function(error) {})

                msg.channel
                      .awaitMessages(filter, {max: 4, time: 60000, error: ['time']})

                      .then(f => {
                            rep = f.last().content.replace("#","").toLowerCase()
                            if (rep === 'oui') {

                              let etp = ""

                              for (i = 1; i <= data.etapes; i++) {
                                etp = "Etape " + i
                                data.answers[etp.toLowerCase()] = {}
                                  }
                              data.answers.explorateurs = {}

                              if (msg.channel.guild.roles.find(r => r.name === 'Explorateurs') === null) {
                                msg.channel.guild.createRole({name: "Explorateurs", hoist: true, color: '#f6ff00'})}

                              fs.writeFile(file,
                                      JSON.stringify(data, null, 2),
                                      function(err) { if(err) {return console.log(err) }
                                      })
                              msg.channel.send(data.etapes + ` étapes ont été créées !
**Vous pouvez maintenant éditer chaque étape en tapant la commande #Etape x.**
**Liste des commandes :**
 **#Etape 0: texte_oui /// image** = *Etape 'fantôme' qui permet d'entrer le texte et/ou l'image à envoyer au joueur lorsqu'il lance le jeu.*
 **#Etape x: code** = *Modifier le code à donner pour passer l'étape. Crée également un rôle discord pour l'étape si inexistant.*
 **#Etape x: texte_oui** = *Ajouter le texte à envoyer en cas de succès pour cette étape. Pour ajouter un lien vers un fichier texte ou audio, ajoutez simplement le lien à la fin du texte. *
 **#Etape x: texte_non** = *Ajouter le texte à envoyer en cas de succès pour cette étape.*
 **#Etape x: image** = *Ajouter une image à attacher au message de succès.*
 **#Etape x: test** = *Renvoie toutes les données relatives à l'étape.*
 **#check** = *Vérifie que toutes les étapes ont au moins un code, un texte_oui, un texte_non, et un rôle correspondant.*
 ***Attention, Toutes ces données sont modifiables à tout moment. Soyez certain de vos actions une fois le jeu lancé !***
 N'hésitez pas à épingler ce message. `)
 }
                                 else return msg.channel.send('Abandon de l\'édition, aucun changement n\'a été pris en compte') })
                      .catch(function(error) {return message.channel.send('Temps écoulé ou format non reconnu. Abandon de l\'édition, aucun changement n\'a été pris en compte')})


}
