const router = require("express").Router();
const axios = require('axios');
const fetch = require("node-fetch")
const cheerio = require('cheerio');
const redis = require('../redis/cache');
const { separar, info } = require('../utils/tools');

router.get('/:key', async (req, res) => {
    const key = req.params.key
    try {
        if (key) {
            const getScpPage = await redis.get(key);
            const isGetScpPage = !(await redis.get(`${key}:validation`));
            if (!getScpPage) res.status(201).json({ error: false, data: await leagueSCP(req.params.key) })
            if (isGetScpPage) {
                const isRefetching = !!(await redis.get(`${key}:is-refetching`))
                if (!isRefetching) {
                    await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                    setTimeout(async () => {
                        info(`${key} => Atualizando CACHE...`);
                        await redis.set(key, JSON.stringify(await leagueSCP(req.params.key)));
                        await redis.set(`${key}:validation`, true, 'ex', 10);
                    }, 0);
                };
            };
            if (getScpPage) return res.status(201).json({ error: false, data: JSON.parse(getScpPage) });
        }
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});

async function leagueSCP(key) {
    const collect = [];
    let data = await fetch(`https://dicasbet.com.br/palpites-${key}/`);
    const $ = cheerio.load(await data.text())
    $('.contain_trends').each((i, y) => {
        let match = $(y).find('.awayTeam').text().trim().split(/\n/g);
        const guesses = $(y).find('.tr_pred').text().trim().split(/\n/g)
        match = match.filter(function (i) { return i.trim() })
        if (match.length != 0) {
            let timestamp = $(y).find('.date_bah').text().trim();
            if (timestamp.length > 20) return;
            const data = {
                teamOne: $(y).find('.homeTeam').text().trim(),
                teamTwo: $(y).find('.awayTeam').text().trim(),
                guesses: `${guesses[0].slice(23, 43)}${typeof guesses[1] !== 'undefined' ? guesses[1] : ''}`,
                timestamp: timestamp,
                cards: []
            }
            let cards = $(y).find('.tr_txt').text().trim().split(/\n/g).filter(function (i) { return i.trim() })
            if (cards.length != 0) {
                for (let index = 0; index < separar(cards, 2).length; index++) {
                    data.cards.push({
                        title: separar(cards, 2)[index][0],
                        description: separar(cards, 2)[index][1]
                    });
                }
            }
            collect.push(data);
        }
    });
    collect.splice(0, 6);
    return collect;
}

module.exports = router
