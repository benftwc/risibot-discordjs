module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    if (!message.guild) return;

    const computeScore = (score) => {
        console.log("IN");
        console.log(score);
        let levels = [], num = 1;
        levels[0] = {"level": 0, "xp": 0, "diff": 0};
        while (num < 200) {

            let xp = Math.round(5 * ((num ** 3) / 2) + 50 * num + 100);
            let diff = xp - (levels[num-1].xp);

            let calcul = {
                "level" : num,
                "xp": xp,
                "diff": diff
            };

            levels.push(calcul);
            num++;

            if(score < xp) {
                break;
            }

        }

        const xpRange = {"min": 10, "max": 150};
        let currentXp = score + (Math.floor(Math.random() * (xpRange.max - xpRange.min + 1)) + xpRange.min);

        let scoring = {xp: currentXp, level: levels[levels.length-1].level};
        console.log("OUT");
        console.log(scoring);
        return scoring;
    }


    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);
    client.guildConf = guildConf;

    ///////////////////////////////////////////////////
    //////////////////      INIT        ///////////////
    ///////////////////////////////////////////////////
    if (!client.guildConf.hasOwnProperty('score') || client.guildConf.score === undefined) {
        client.guildConf.score = true;
    }

    if (!client.guildConf.hasOwnProperty('nsfwOnly') || client.guildConf.nsfwOnly === undefined) {
        client.guildConf.nsfwOnly = "off";
    }

    if (!client.guildConf.hasOwnProperty('history') || client.guildConf.history === undefined) {
        client.guildConf.history = 4;
    }
    if (!client.guildConf.hasOwnProperty('sticker404') || client.guildConf.sticker404 === undefined) {
        client.guildConf.sticker404 = "http://image.noelshack.com/fichiers/2018/01/5/1515108350-410.png";
    }
    if (!client.guildConf.hasOwnProperty('disable_vote') || client.guildConf.disable_vote === undefined) {
        client.guildConf.disable_vote = false;
    }

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(guildConf.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    const scored_actions = ['risitas', 'risibank', 'waifu'];
    if ((client.guildConf.score && scored_actions.indexOf(command) !== -1)) {
        // We'll use the key often enough that simplifying it is worth the trouble.
        const key = `${message.guild.id}-${message.author.id}`;

        // Triggers on new users we haven't seen before.
        client.points.ensure(`${key}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1,
            xp: 0
        });
        client.points.inc(key, "points");

        if(client.points.get(`${key}`, 'xp') === undefined) {
            client.points.set(`${key}`, 0, 'xp')
        }

        if(client.points.get(`${key}`, 'level') === undefined) {
            client.points.set(`${key}`, 0, 'level')
        }

        let newScoring = computeScore(client.points.get(`${key}`, 'xp'));

        // Calculate the user's current level
        const curLevel = newScoring.level;

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (curLevel > client.points.get(`${key}`, "level")) {
            message.reply(`A force de spam des stickers, t'es passé au niveau **${curLevel}**! `);
            client.points.set(`${key}`, curLevel, "level");
        }

        client.points.set(`${key}`, newScoring.xp, 'xp');
        client.points.set(`${key}`, newScoring.level, 'level');

        client.risistory.ensure(message.guild.id, {tags: []});
        client.risistory.push(message.guild.id, args.join(' '), 'tags', true);
    }

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};