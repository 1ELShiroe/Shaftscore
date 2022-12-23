const router = require('express').Router()
const redis = require('../redis/cache');
const { separar, info } = require('../utils/tools');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const moment = require('moment');
moment.locale('pt-br');

router.get('/apostas-hoje/', async (req, res) => {
    const key = `SCP:Apostas-Hoje`;
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/aposta-do-dia/');
            data = await data.text();
            const $ = cheerio.load(data);
            $('.styles__Tip-sc-ysof7p-0').each((i, y) => {
                let collect = $(y).text().trim();
                collect = collect.split(/\n/g);
                collect = collect.filter(x => x.trim());
                collected.push({ league: collect[0], teamOne: collect[1], teamTwo: collect[3], guesses: collect[5] });
            });
            return collected;
        };
        if (!getScpPage) res.status(201).json({ error: false, data: await scpPage() });
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
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});

router.get('/favoritos-hoje/', async (req, res) => {
    const key = `SCP:Favoritos-Hoje`;
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            let collector = [];
            let data = await fetch('https://dicasbet.com.br/favoritos-de-hoje/');
            data = await data.text();
            const $ = cheerio.load(data);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim()
                collect = collect.split(/\n/g)
                var result = collect.filter(x => x.trim());
                result.splice(0, 3)
                collector.push(result)
            });
            collector = collector.filter(function (arr) { if (arr[0] !== 'prizes monthly') return arr });
            const collection = [];
            for (let index = 1; index < collector.length - 1; index++) {
                let data;
                if (collector[index].length < 13) {
                    let newDate = collector[index][4].trim()
                    data = {
                        guesses: collector[index][0].trim(),
                        teamOne: collector[index][1].split(' v ')[0].trim(),
                        teamTwo: collector[index][1].split(' v ')[1].trim(),
                        league: collector[index][2].trim(),
                        tips: collector[index][8].trim(),
                        odds: collector[index][7].trim(),
                        percentage: collector[index][9].trim().replace('%', ''),
                        date: moment(new Date().setHours(newDate[0] + newDate[1], newDate[3] + newDate[4], 0)).format()
                    }
                }
                else {
                    collector[index].splice(0, 2)
                    if (collector[index].length === 12) {
                        let newDate = collector[index][5].trim()
                        data = {
                            guesses: [collector[index][0].trim(), collector[index][1].trim()],
                            teamOne: collector[index][2].split(' v ')[0].trim(),
                            teamTwo: collector[index][2].split(' v ')[1].trim(),
                            league: collector[index][3].trim(),
                            tips: collector[index][10].trim(),
                            odds: collector[index][9].trim(),
                            percentage: collector[index][8].trim().replace('%', ''),
                            date: moment(new Date().setHours(newDate[0] + newDate[1], newDate[3] + newDate[4], 0)).format()
                        }
                    } else {
                        let newDate = collector[index][4].trim()
                        let timestamp;
                        if (collector[index][3].trim() === 'Hoje') timestamp = moment(new Date().setHours(newDate[0] + newDate[1], newDate[3] + newDate[4], 0)).format()
                        else {
                            newDate = collector[index][3].trim();
                            timestamp = moment(new Date().setDate(newDate[0] + newDate[1])).format()
                        }
                        data = {
                            guesses: collector[index][0].trim(), teamOne: collector[index][1].split(' v ')[0].trim(),
                            teamTwo: collector[index][1].split(' v ')[1].trim(), league: collector[index][2].trim(), tips: collector[index][9].trim(),
                            odds: collector[index][8].trim(), percentage: collector[index][7].trim().replace('%', ''), date: timestamp
                        }
                    }
                    collection.push(data);
                }
            }
            return collection;
        }
        if (!getScpPage) res.status(201).json({ error: false, data: await scpPage() });
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

router.get('/ambos-marcam/', async (req, res) => {
    const key = `SCP:Ambos-Marcam`;
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/dicas-ambas-marcam');
            data = await data.text();
            const $ = cheerio.load(data);
            $('.styles__Tip-sc-ysof7p-0').each((i, y) => {
                let collect = $(y).text().trim();
                collect = collect.split(/\n/g);
                collect = collect.filter(x => x.trim());
                collected.push({ title: collect[0], confront: `${collect[1]} x ${collect[3]}`, guesses: collect[5].slice(15, 50), });
            });
            return collected;
        }
        if (!getScpPage) res.status(201).json({ error: true, data: await scpPage() })
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`));
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await scpPage()));
                    // Tempo de atualização do cache.
                    // Default: 3600 => 1 Hour(Hora) 
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getScpPage) return res.status(201).json({ error: false, data: JSON.parse(getScpPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});

router.get('/bilhete-pronto/', async (req, res) => {
    const key = `SCP:Bilhete-Pronto`;
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            let data = await fetch('https://dicasbet.com.br/multiplas-bet365/');
            data = await data.text();
            const $ = cheerio.load(data);
            const collector = { value: $('.acca-footer').text().trim().split(/\n/g)[0].slice(7, 20), profit: $('.acca-footer').text().trim().split(/\n/g)[1].slice(9, 20), games: [] }
            $('.acca-game-wrapper').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g);
                collect = collect.filter(x => x.trim());
                collector.games.push({ guesses: collect[0], confront: `${collect[1].split(' v ')[0].trim()} x ${collect[1].split(' v ')[1].trim()}`, odds: collect[2] });
            });
            return collector;
        }
        if (!getScpPage) res.status(201).json({ error: false, data: await scpPage() });
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
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});

router.get('/jogos-hoje-placar/', async (req, res) => {
    const key = `SCP:Jogos-Hoje-Placar`;
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collector = []
            let data = await fetch('https://dicasbet.com.br/placar-exato-dos-jogos-de-hoje');
            data = await data.text();
            const $ = cheerio.load(data);
            $('.mtl-content__block').each((i, y) => {
                let collect = $(y).text().trim();
                collect = collect.split(/\n/g);
                collect = collect.filter(x => x.trim());
                collect = collect.filter(x => x.trim() !== '—');
                const title = collect[0];
                collect.splice(0, 1)
                const data = { title: title, data: [] };
                for (let index = 0; index < separar(collect, 6).length; index++) {
                    data.data.push({ confront: `${separar(collect, 6)[index][2]} x ${separar(collect, 6)[index][3]}`, placar: separar(collect, 6)[index][5].slice(0, 7), gol: separar(collect, 6)[index][5].slice(8, 19) })
                }
                collector.push(data);
            });
            return collector;
        }
        if (!getScpPage) res.status(201).json({ error: false, data: await scpPage() });
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
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});

router.get('/img/', async (req, res) => {
    let type = req.query.type;
    let name = req.query.name;
    try {
        if (!type || !name) return res.status(404).json({ error: true, message: 'no image found with these parameters' });
        if (type == 'country') return res.sendFile(path.join(__dirname, `../assets/country/${name.toLowerCase()}.png`))
        else if (type == 'league') return res.sendFile(path.join(__dirname, `../assets/leagues/${name.toLowerCase()}.png`))
    } catch (err) {
        return res.status(404).json({ error: true, message: 'no image found with these parameters' });
    }
});

module.exports = router