const router = require("express").Router();
const axios = require('axios');
const cheerio = require('cheerio');
const redis = require('../redis/cache');
const { separar } = require('../utils/tools');

router.get('/alemanha-bundesliga/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-alemanha-bundesliga';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-alemanha-bundesliga/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: timestamp,
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);

                    cards = cards.filter(function (i) { return i.trim() })
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
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/brasileirao-serie-a/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-brasileirao-serie-a';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-brasileirao-serie-a/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: timestamp,
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
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
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/brasileirao-serie-b/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-brasileirao-serie-b';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-brasileirao-serie-b/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
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
            collect.splice(0, 9);
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/espanha-la-liga/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-espanha-la-liga';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-espanha-la-liga/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
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
            collect.splice(0, 2);
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/franca-liga-1/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-franca-liga-1';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-franca-liga-1/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
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
            collect.splice(0, 1);
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/holanda-eredivisie/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-holanda-eredivisie';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-holanda-eredivisie/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
                    if (cards.length != 0) {
                        for (let index = 0; index < separar(cards, 2).length; index++) {
                            data.cards.push({ title: separar(cards, 2)[index][0], description: separar(cards, 2)[index][1] });
                        }
                    }
                    collect.push(data);
                }
            });
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/inglaterra-premier-league/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-inglaterra-premier-league';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-inglaterra-premier-league/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
                    if (cards.length != 0) {
                        for (let index = 0; index < separar(cards, 2).length; index++) {
                            data.cards.push({ title: separar(cards, 2)[index][0], description: separar(cards, 2)[index][1] });
                        }
                    }
                    collect.push(data);
                }
            });
            collect.splice(0, 1);
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/italia-serie-a/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-italia-serie-a';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-italia-serie-a/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
                    if (cards.length != 0) {
                        for (let index = 0; index < separar(cards, 2).length; index++) {
                            data.cards.push({ title: separar(cards, 2)[index][0], description: separar(cards, 2)[index][1] });
                        }
                    }
                    collect.push(data);
                }
            });
            //collection.splice(0, 1);
            res.status(201).json(collect);
            await redis.set(KEY, JSON.stringify(collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/champions-league/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-champions-league';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-champions-league/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
                    if (cards.length != 0) {
                        for (let index = 0; index < separar(cards, 2).length; index++) {
                            data.cards.push({ title: separar(cards, 2)[index][0], description: separar(cards, 2)[index][1] });
                        }
                    }
                    collect.push(data);
                }
            });
            res.status(201).json(collect.length === 0 ? {} : collect)
            await redis.set(KEY, JSON.stringify(collect.length === 0 ? {} : collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/liga-europa/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-liga-europa';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-liga-europa/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
                    if (cards.length != 0) {
                        for (let index = 0; index < separar(cards, 2).length; index++) {
                            data.cards.push({ title: separar(cards, 2)[index][0], description: separar(cards, 2)[index][1] });
                        }
                    }
                    collect.push(data);
                }
            });
            res.status(201).json(collect.length === 0 ? {} : collect)
            await redis.set(KEY, JSON.stringify(collect.length === 0 ? {} : collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/copa-libertadores/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-copa-libertadores';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-copa-libertadores/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
                    if (cards.length != 0) {
                        for (let index = 0; index < separar(cards, 2).length; index++) {
                            data.cards.push({ title: separar(cards, 2)[index][0], description: separar(cards, 2)[index][1] });
                        }
                    }
                    collect.push(data);
                }
            });
            res.status(201).json(collect.length === 0 ? {} : collect)
            await redis.set(KEY, JSON.stringify(collect.length === 0 ? {} : collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/copa-sul-americana/', async (req, res) => {
    try {
        const collect = [];
        const KEY = 'league-copa-sul-americana';
        const collection = await redis.get(KEY);
        if (!collection) {
            const resAxios = await axios.get('https://dicasbet.com.br/palpites-copa-sul-americana/');
            const $ = cheerio.load(resAxios.data)
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
                        guesses: `${guesses[0].slice(23, 43)}${guesses[1]}`,
                        timestamp: $(y).find('.date_bah').text().trim(),
                        cards: []
                    }
                    let cards = $(y).find('.tr_txt').text().trim().split(/\n/g);
                    cards = cards.filter(function (i) { return i.trim() })
                    if (cards.length != 0) {
                        for (let index = 0; index < separar(cards, 2).length; index++) {
                            data.cards.push({ title: separar(cards, 2)[index][0], description: separar(cards, 2)[index][1] });
                        }
                    }
                    collect.push(data);
                }
            });
            res.status(201).json(collect.length === 0 ? {} : collect)
            await redis.set(KEY, JSON.stringify(collect.length === 0 ? {} : collect), 'EXAT', 600);
        } else {
            redis.expire(KEY, 600)
            res.json(JSON.parse(collection));
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router