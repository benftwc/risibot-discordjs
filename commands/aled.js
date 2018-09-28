exports.run = (client, message, args) => {
    message.delete();
    const embed = {
        "title": "**ALEEEED**",
        "color": 16762368,
        "footer": {
            "icon_url": "http://image.noelshack.com/fichiers/2017/27/2/1499119365-ptitpd.png",
            "text": "N'OUBLIE PAS, tu peux m'aider en allant voter"
        },
        "thumbnail": {
            "url": "http://image.noelshack.com/fichiers/2017/01/1483619930-risitasblc26zfz.png"
        },
        "fields": [
            {
                "name": `Actuellement, le préfix est ${client.config.prefix}, faut le savoir hein.`,
                "value": "\u200b"
            },
            {
                "name": "risibank `mot clé`",
                "value": "Recherche dans la risibank et retourne **le premier** résultat parmis les `mot clés` indiqués !"
            },
            {
                "name": "risitas `mot clé`",
                "value": "Recherche dans la risibank et retourne **n'importe quel** résultat parmis les `mot clés` indiqués !"
            },
            {
                "name": "stats",
                "value": "Indique les statistiques d'utilisation et d'installation de Gilbot"
            },
            {
                "name": "invite",
                "value": "Permet d'inviter Gilbot sur votre propre discord, la CHANCE !"
            },
            {
                "name": "vote",
                "value": "Permet d'obtenir l'adresse de vote pour le bot :muscle: !"
            },
            {
                "name": "support",
                "value": "Si tu as un besoin d'aide, viens faire un tour :smile:"
            },
            {
                "name": "don",
                "value": "Si tu as trop d'argent avec ton RSA et que tu souhaites contribuer aux frais du bot :smile:"
            },
            {
                "name": "credits",
                "value": "A ton avis du con :beers::beers::beers:"
            },
            {
                "name": "\u200b​",
                "value": "[**Voter**](https://discordbots.org/bot/484127854326710300/vote)\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b[**Inviter**](https://discordapp.com/api/oauth2/authorize?client_id=484127854326710300&permissions=8&scope=bot)"
            }
        ]
    };

    message.channel.send({embed});
}

exports.help = {
    name: "help",
    category: "Miscelaneous",
    description: "Permet d'obtenir de l'aide pour utiliser le bot",
    usage: "aled"
};