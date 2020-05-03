const {RichEmbed} = require('discord.js')
const embed = new RichEmbed()
.setColor('#9ff000')
.setTitle('Liste des commandes d\'édition. Peuvent s\'utiliser sous la forme : #Etape x: commande')
.setDescription('')
.addField('**#Etape 0**: (texte_oui ou image)', `Etape 'fantôme' qui permet d'entrer le texte et/ou l'image à envoyer au joueur lorsqu'il lance le jeu.`)
.addField('**#code**', `Editer le code à donner pour passer l'étape. Crée également un rôle discord pour l'étape si inexistant.`)
.addField('**#image**', `Ajouter une image à attacher au message de succès.`)
.addField('**#texte_oui**', `Ajouter le texte à envoyer en cas de succès pour une étape. Pour ajouter un lien vers un fichier texte ou audio, ajoutez simplement le lien à la fin du texte.`)
.addField('**#texte_non**', `Ajouter le texte à envoyer en cas de succès pour une étape.`)
.addField('**#test**', `Renvoie toutes les données relatives à l'étape.`)
.addField('Suite', '**Liste des commandes générales**')
.addField('**#check**', `Lance le test pour chacune des étapes`)
.addField('**#start**', `Définit la commande à entrer par les joueurs pour débuter (!start par défaut)`)
.addField('**#rolefinal**', `permet de changer le nom du Rôle discord des joueurs gagnants (par défaut "Explorateurs"). NE PAS RENOMMER MANUELLEMENT`)
.addField('**!commandes**', 'Renvoie ce message.')
.addField('**!edit**', 'Relance l\'édition et écrase toutes les données. Les rôles ne sont pas supprimés. Faites le manuellement si nécessaire.')








module.exports = embed
