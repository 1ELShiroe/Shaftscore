const router = require("express").Router();
const redis = require('../redis/cache');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

router.get('/over-ht/', async (req, res) => {
    const key = 'SCP-over-ht'
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collected = [];
            let resAxios = await fetch('https://dicasbet.com.br/estatisticas-over-ht/');
            resAxios = await resAxios.text();
            const $ = cheerio.load(resAxios);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[4] !== 'undefined') collected.push({ team: collect[0], league: collect[1], games: collect[2], bothMark: collect[3], percentage: collect[4] })
            });
            return collected;
        }
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    console.log(`[_${key}_] Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await scpPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getScpPage) return res.status(201).json({ error: false, data: JSON.parse(getScpPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/over-1-5/', async (req, res) => {
    const key = 'SCP-over-1-5';
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collected = [];
            let resAxios = await fetch('https://dicasbet.com.br/estatisticas-over-1-5/');
            resAxios = await resAxios.text();
            const $ = cheerio.load(resAxios);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[4] !== 'undefined') collected.push({ team: collect[0], league: collect[1], games: collect[2], bothMark: collect[3], percentage: collect[4] })
            });
            return collected;
        }
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    console.log(`[_${key}_] Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await scpPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getScpPage) return res.status(201).json({ error: false, data: JSON.parse(getScpPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/over-2-5/', async (req, res) => {
    const key = 'SCP-over-2-5';
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collected = [];
            let resAxios = await fetch('https://dicasbet.com.br/estatisticas-over-2-5/');
            resAxios = await resAxios.text();
            const $ = cheerio.load(resAxios);
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[4] !== 'undefined') collected.push({ team: collect[0], league: collect[1], games: collect[2], bothMark: collect[3], percentage: collect[4] })
            });
            return collected;
        }
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    console.log(`[_${key}_] Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await scpPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getScpPage) return res.status(201).json({ error: false, data: JSON.parse(getScpPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});
router.get('/ambas-marcam/', async (req, res) => {
    const key = 'SCP-ambas-marcam';
    try {
        const getScpPage = await redis.get(key);
        const isGetScpPage = !(await redis.get(`${key}:validation`));
        const scpPage = async () => {
            const collected = [];
            let resAxios = await fetch('https://dicasbet.com.br/estatisticas-ambas-marcam/');
            resAxios = await resAxios.text();
            const $ = cheerio.load(resAxios)
            $('tr').each((i, y) => {
                let collect = $(y).text().trim().split(/\n/g)
                collect = collect.filter(x => x.trim());
                collect.splice(0, 2)
                if (typeof collect[4] !== 'undefined') collected.push({ team: collect[0], league: collect[1], games: collect[2], bothMark: collect[3], percentage: collect[4] })
            });
            return collected;
        }
        if (isGetScpPage) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30);
                setTimeout(async () => {
                    console.log(`[_${key}_] Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await scpPage()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);// CACHE Demora 30 segundos. PADRÂo 1 h
                }, 0);
            };
        };
        if (getScpPage) return res.status(201).json({ error: false, data: JSON.parse(getScpPage) });
    } catch (err) { res.status(500).json({ error: true, message: err.message }); }
});

module.exports = router