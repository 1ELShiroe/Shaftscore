const { info } = require('../utils/tools');
const router = require("express").Router();
const cheerio = require('cheerio');
const fetch = require('node-fetch')
const redis = require('../redis/cache');

router.get('/acima-ou-abaixo-de-3-5-gols/', async (req, res) => {
    const key = 'MC:Acima-Ou-Abaixo-De-3-5-Gols'
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-acima-ou-abaixo-de-3-5-gols/');
            data = await data.text();
            const $ = cheerio.load(data)
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], gols: collect[2], percentage: collect[3] })
            });
            return collected
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/1-tempo-gols/', async (req, res) => {
    const key = 'MC:1-Tempo-Gols'
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-para-gol-no-1-tempo/');
            data = await data.text();
            const $ = cheerio.load(data)
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], gols: collect[2], percentage: collect[3] })
            });
            return collected;
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/2-tempo-gols/', async (req, res) => {
    const key = 'MC:2-Tempo-Gols'
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-para-gol-no-2-tempo/');
            data = await data.text();
            const $ = cheerio.load(data);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], gols: collect[2], percentage: collect[3] })
            });
            return collected
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`));
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/cartoes/', async (req, res) => {
    const key = 'MC:Cartoes'
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-para-cartoes/');
            data = await data.text();
            const $ = cheerio.load(data)
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], cards: collect[2], average: collect[3] })
            });
            return collected;
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`));
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/over-2-5/', async (req, res) => {
    const key = 'MC:Over-2-5';
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-para-over-2-5/');
            data = await data.text();
            const $ = cheerio.load(data);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g);
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2);
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], gols: collect[2], percentage: collect[3] });
            });
            return collected;
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`));
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/acima-1-5-gols/', async (req, res) => {
    const key = 'MC:Acima-1-5-Gols';
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-acima-de-1-5-gols/');
            data = await data.text();
            const $ = cheerio.load(data)
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g);
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2);
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], gols: collect[2], percentage: collect[3] });
            });
            return collected;
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`));
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/ambos-marcam/', async (req, res) => {
    const key = 'MC:Ambos-Marcam'
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-para-ambas-marcam/');
            data = await data.text();
            const $ = cheerio.load(data);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2);
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], gols: collect[2], percentage: collect[3] });
            });
            return collected;
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`));
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/escanteios/', async (req, res) => {
    const key = 'MC:Escanteios'
    try {
        const getSCPPage = await redis.get(key);
        const isGetSCPPage = !(await redis.get(`${key}:validation`));
        const MCFunc = async () => {
            const collected = [];
            let data = await fetch('https://dicasbet.com.br/melhores-campeonatos-para-escanteios/');
            data = await data.text();
            const $ = cheerio.load(data);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g);
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2);
                if (typeof collect[3] !== 'undefined') collected.push({ league: collect[0], games: collect[1], gols: collect[2], percentage: collect[3] });
            });
            return collected;
        }
        if (!getSCPPage) res.status(201).json({ error: false, data: await MCFunc() });
        if (isGetSCPPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`));
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await MCFunc()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getSCPPage) return res.status(201).json({ error: false, data: JSON.parse(getSCPPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});

module.exports = router