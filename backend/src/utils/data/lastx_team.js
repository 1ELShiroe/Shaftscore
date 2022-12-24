const { info } = require('../tools')
const fetch = require('node-fetch');
const redis = require('../../redis/cache');

const lastX = async (id) => {
    const key = `team-matchs:${id}`;
    try {
        const getTeamID = await redis.get(key);
        const isGetTeamID = !(await redis.get(`${key}:validation`));
        const getTeamInfo = async () => {
            let last_matchs = await fetch(`https://api.football-data-api.com/lastx?key=${process.env.AUTH_FOOTYSTATS}&team_id=${id}&last_x_match_num=5`);
            last_matchs = await last_matchs.json();
            return last_matchs.data
        }
        if (!getTeamID) return await getTeamInfo()
        if (isGetTeamID) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    console.log(`[${key}] Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await getTeamInfo()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getTeamID) return JSON.parse(getTeamID);
    } catch (err) {
        return err.message
    };
}

const getLeague = async (id) => {
    const key = `league:${id}`;
    try {
        const getLeagueID = await redis.get(key);
        const isGetLeagueID = !(await redis.get(`${key}:validation`));
        const getLeagueINFO = async () => {
            let league = await fetch(`https://api.football-data-api.com/league-season?key=${process.env.AUTH_FOOTYSTATS}&season_id=${id}`);
            league = await league.json();
            return league.data
        }
        if (!getLeagueID) return await getLeagueINFO()
        if (isGetLeagueID) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await getTeamInfo()));
                    await redis.set(`${key}:validation`, true, 'ex', 20);
                }, 0);
            };
        };
        if (getLeagueID) return JSON.parse(getLeagueID);
    } catch (err) {
        return err.message
    };
}


module.exports = { lastX, getLeague }