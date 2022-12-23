const router = require("express").Router();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const redis = require('../redis/cache');
const caracteres = ['5', 'adiado', 'actions', 'your prediction', 'X', '1.5', '–', 'palpites', 'close X', 'H2', 'am', 'X', 'HX', 'H1', '1', '2', '0', '2.5', '3.5', 'añ', '3', '4'];
const filtreArray = ['1', '2', '3', '7', '8', '9', '12', '13', '10', '14', '22', '28', '6',]
const { info, separar, locationIndex, filterFloat } = require('../utils/tools');

router.get('/hoje', async (req, res) => {
    const key = 'STS:Hoje'
    try {
        const getSTSPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const STSPage = async () => {
            const collect = [];
            let dataSCP = await fetch('https://dicasbet.com.br/palpites-de-futebol/');
            dataSCP = await dataSCP.text();
            const $ = cheerio.load(dataSCP);
            $('.competition').each((i, y) => {
                let partida = $(y).find('.matchrow').text().trim().split(/\n/g);
                let statistics = $(y).find('.coefrow').text().trim().split(/\n/g);
                for (let index = 0; index < caracteres.length; index++) {
                    statistics = statistics.filter(function (i) { return i.trim() !== caracteres[index] });
                    partida = partida.filter(function (i) { return i.trim() !== filtreArray[index] });
                    partida = partida.filter(function (i) { return i.trim() !== caracteres[index] });
                }
                partida = partida.filter(function (i) { return i.trim() });
                partida = partida.filter(function (i) { return filterFloat(i) ? i.length > 3 : i.trim() });


                statistics = statistics.filter(function (i) { return i.trim() })
                let league = $(y).find('.header').text().trim().split(/\n/g);
                let data;
                if (league !== 'undefined') {
                    data = { league: league[league.length - 1], games: [] }
                    for (let index = 0; index < separar(statistics, 11).length; index++) {
                        let matchs = separar(partida, 4)[index]
                        let matchstats = separar(statistics, 11)[index]
                        data.games.push({
                            palpite: matchs[0],
                            teamOne: matchs[2],
                            teamTwo: matchs[3],
                            date: matchs[1],
                            one: matchstats[0],
                            x: matchstats[1],
                            two: matchstats[2],
                            ht1: matchstats[3],
                            htx: matchstats[4],
                            ht2: matchstats[5],
                            oneFive: matchstats[6],
                            twoFive: matchstats[7],
                            treeFive: matchstats[8],
                            am: matchstats[9],
                            an: matchstats[10]
                        })
                    }
                }
                if (data.games.length > 0) collect.push(data);
            });
            return collect;
        }
        if(!getSTSPage) res.status(201).json({ error: false, data: await STSPage() });
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await STSPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getSTSPage) return res.status(201).json({ error: false, data: JSON.parse(getSTSPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); };
});
router.get('/amanha/', async (req, res) => {
    const key = 'SCP-palpites-amanha'
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collect = [];
            let dataSCP = await fetch('https://dicasbet.com.br/palpites-de-amanha/');
            dataSCP = await dataSCP.text();
            const $ = cheerio.load(dataSCP);
            $('.competition').each((i, y) => {
                let partida = $(y).find('.matchrow').text().trim().split(/\n/g);
                let statistics = $(y).find('.coefrow').text().trim().split(/\n/g);
                for (let index = 0; index < caracteres.length; index++) {
                    statistics = statistics.filter(function (i) { return i.trim() !== caracteres[index] });
                    partida = partida.filter(function (i) { return i.trim() !== filtreArray[index] });
                    partida = partida.filter(function (i) { return i.trim() !== caracteres[index] });
                }
                partida = partida.filter(function (i) { return i.trim() })
                statistics = statistics.filter(function (i) { return i.trim() })
                const league = $(y).find('.header').text().trim().split(/\n/g)
                let data;
                if (league !== 'undefined') {
                    data = { league: league[league.length - 1], games: [] }
                    for (let index = 0; index < separar(statistics, 11).length; index++) {
                        data.games.push({
                            palpite: separar(partida, 4)[index][0],
                            teamOne: separar(partida, 4)[index][2],
                            teamTwo: separar(partida, 4)[index][3],
                            date: separar(partida, 4)[index][1],
                            one: separar(statistics, 11)[index][0],
                            x: separar(statistics, 11)[index][1],
                            two: separar(statistics, 11)[index][2],
                            ht1: separar(statistics, 11)[index][3],
                            htx: separar(statistics, 11)[index][4],
                            ht2: separar(statistics, 11)[index][5],
                            oneFive: separar(statistics, 11)[index][6],
                            twoFive: separar(statistics, 11)[index][7],
                            treeFive: separar(statistics, 11)[index][8],
                            am: separar(statistics, 11)[index][9],
                            an: separar(statistics, 11)[index][10]
                        })
                    }
                }
                if (data.games.length > 0) collect.push(data);
            });
            return collect;
        }
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await scpPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getScpPage) return res.status(201).json({ error: false, data: JSON.parse(getScpPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); };
});
// URL INVALIDA
router.get('/certo/', async (req, res) => {
    const key = 'SCP-palpites-certo'
    try {
        const getSTSPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const STSPage = async () => {
            const collection = [];
            let dataSCP = await fetch('https://dicasbet.com.br/palpites-certo/');
            dataSCP = await dataSCP.text();
            const $ = cheerio.load(dataSCP);
            $('.Leg').each((i, y) => {
                let collect = $(y).text().trim()
                collect = collect.split(/\n/g)
                collect = collect.filter(x => x.trim());
                collection.push({
                    guesses: collect[1],
                    against: collect[2].slice(3, 20),
                    reason: collect[4]
                })
            });
            return collection;
        }
        if(!getSTSPage) res.status(201).json({ error: false, data: await STSPage() });
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await STSPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getSTSPage) return res.status(201).json({ error: false, data: JSON.parse(getSTSPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); };
});
router.get('/1-tempo-gols/', async (req, res) => {
    const key = 'STS:1-Tempo-Gols'
    try {
        const getSTSPage = await redis.get(key);
        const isGetSTSPage = !(await redis.get(`${key}:validation`));
        const STSPage = async () => {
            const collected = [];
            let dataSCP = await fetch('https://dicasbet.com.br/palpites-de-gol-no-primeiro-tempo/');
            dataSCP = await dataSCP.text();
            const $ = cheerio.load(dataSCP);
            $('.styles__Tip-sc-ysof7p-0').each((i, y) => {
                let collect = $(y).text().trim()
                collect = collect.split(/\n/g)
                collect = collect.filter(x => x.trim());
                collected.push({ league: collect[0], teamOne: collect[1], teamTwo: collect[3], guesses: collect[5].slice(24, 30), })
            });
            return collected;
        };
        if (!getSTSPage) res.status(201).json({ error: false, data: await STSPage() });
        if (isGetSTSPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await STSPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getSTSPage) return res.status(201).json({ error: false, data: JSON.parse(getSTSPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); };
});
router.get('/gols-hoje/', async (req, res) => {
    const key = 'STS:Gols-Hoje'
    try {
        const getSTSPage = await redis.get(key);
        const isGetSTSPage = !(await redis.get(`${key}:validation`));
        const STSPage = async () => {
            let data = await fetch('https://dicasbet.com.br/palpites-de-gols-acima-de-1-5-e-abaixo-de-3-5-gols/');
            data = await data.text();
            const $ = cheerio.load(data);
            const Miau = [];
            let league;
            $('.listgames').children().map(function (i, el) {
                let results = $(this).text().trim().split(/\n/g);
                league = $('.titlegames').text().trim().split(/\n/g);
                results = results.filter(x => x.trim());
                league = league.filter(x => x.trim());
                Miau.push(results);
            });
            Miau.splice(0, 1)
            const collect = []
            Miau.forEach((value, index) => {
                value.length === 1 ? collect.push('QUEBRAR') : collect.push({ date: Miau[index][0], teamOne: Miau[index][1], teamTwo: Miau[index][3], gols: Miau[index][4] })
            });
            let locale = locationIndex('QUEBRAR', collect);
            const collection = []
            for (let index = 0; index < locale.length; index++) {
                collection.push(collect.slice(locale[index], locale[index + 1]))
            }
            let index = 0;
            let resultFINISH = collection.map(w => {
                const data = { league: league[index], games: [w.slice(1)] }
                index++
                return data
            });
            return resultFINISH;
        }
        if(!getSTSPage) res.status(201).json({ error: false, data: await STSPage() });
        if (isGetSTSPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await STSPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (!getSTSPage) res.status(201).json({ error: false, data: await STSPage() });
        if (getSTSPage) return res.status(201).json({ error: false, data: JSON.parse(getSTSPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); };
});

module.exports = router