const { info } = require('../utils/tools');
const router = require('express').Router()
const fetch = require('node-fetch');
const redis = require('../redis/cache');
const fs = require('fs');
const { lastX, getLeague } = require("../utils/data/lastx_team")
const date = new Date();
const actualDate = date.getFullYear() + '-' + ((date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)) + '-' + ((date.getDate() < 10 ? '0' : '') + date.getDate());


const team_statics = async (id) => {
    const key = `team:${id}`;
    try {
        const getTeamID = await redis.get(key);
        const isGetTeamID = !(await redis.get(`${key}:validation`));
        const getTeamInfo = async () => {
            let team = await fetch(`https://api.football-data-api.com/team?key=${process.env.AUTH_FOOTYSTATS}&team_id=${id}`);
            team = await team.json();
            return team.data[0]

        }
        if (isGetTeamID) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    console.log(`[${key}] Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await getTeamInfo()));
                    await redis.set(`${key}:validation`, true, 'ex', 20);
                }, 0);
            };
        };
        if (!getTeamID) return await getTeamInfo()
        if (getTeamID) return JSON.parse(getTeamID);
    } catch (err) {
        return err.message
    };
}

router.get('/game/', async (req, res) => {
    let id = req.query.id;
    const key = `game:id_${id}`;
    try {
        const getGameID = await redis.get(key);
        const isGetGameID = !(await redis.get(`${key}:validation`));
        const getGameINFO = async () => {
            let match = await fetch(`https://api.football-data-api.com/match?key=${process.env.AUTH_FOOTYSTATS}&match_id=${id}`);
            match = await match.json()
            return { data: match.data, teams: { home: await team_statics(match.data.homeID), home_matchs: await lastX(match.data.homeID), away: await team_statics(match.data.awayID), away_matchs: await lastX(match.data.awayID) } };
        };
        if (!getGameID) res.status(201).json({ error: false, data: await getGameINFO() });
        if (isGetGameID) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    console.log(`[${key}] Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await getGameINFO()));
                    await redis.set(`${key}:validation`, true, 'ex', 20);
                }, 0);
            };
        };
        if (getGameID) return res.status(201).json({ error: false, data: JSON.parse(getGameID) });
    } catch (err) { return res.status(500).json({ error: true, message: err.message }); };
});
router.get('/encerradas', async (req, res) => {
    const date = req.query.date;
    const key = `MATCH:Encerrados${date ? date : null}`;
    console.log(date)
    try {
        const getGameEND = await redis.get(key);
        const isGetGameEND = !(await redis.get(`${key}:validation`));
        const getGameEndList = async () => {
            let countPage = 1;
            let collect;
            for (let page = 0; page < countPage; page++) {
                try {

                    let todays = await fetch(`https://api.football-data-api.com/todays-matches?key=${process.env.AUTH_FOOTYSTATS}&date=${date ? date : actualDate}&page=${page == 0 ? 1 : page + 1}`);
                    todays = await todays.json();
                    collect = [...todays.data];
                } catch (err) { return res.status(500).json({ error: true, message: err.message }); };
            }
            let collection = await Promise.all(collect.map(async i => await getLeague(i.competition_id)));
            collection = collection.map(item => {
                return { league: item.english_name, type: item.format, logo: item.image, matchs: collect.filter(i => i.competition_id == item.id) }
            })
            return collection.filter(function (a) {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))
        };
        if (isGetGameEND) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await getGameEndList()));
                    await redis.set(`${key}:validation`, true, 'ex', 20);
                }, 0);
            };
        };
        if (getGameEND) return res.status(201).json({ error: false, data: JSON.parse(getGameEND) });
    } catch (err) { return res.status(500).json({ error: true, message: err.message }); };
});
router.get('/hoje', async (req, res) => {
    const key = `MATCH:Hoje`;
    try {
        const getGameEND = await redis.get(key);
        const isGetGameEND = !(await redis.get(`${key}:validation`));
        const getGameEndList = async () => {
            let countPage = 1;
            let collect;
            for (let page = 0; page < countPage; page++) {
                let todays = await fetch(`https://api.football-data-api.com/todays-matches?key=${process.env.AUTH_FOOTYSTATS}&page=${page == 0 ? 1 : page + 1}`);
                todays = await todays.json();
                collect = [...todays.data];
            }
            let collection = await Promise.all(collect.map(async i => await getLeague(i.competition_id)));
            collection = collection.map(item => {
                return { league: item.english_name, type: item.format, logo: item.image, matchs: collect.filter(i => i.competition_id == item.id) }
            })
            return collection.filter(function (a) {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))
        };
        if (isGetGameEND) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await getGameEndList()));
                    await redis.set(`${key}:validation`, true, 'ex', 20);
                }, 0);
            };
        };
        if (getGameEND) return res.status(201).json({ error: false, data: JSON.parse(getGameEND) });
    } catch (err) { return res.status(500).json({ error: true, message: err.message }); };
});

module.exports = router
