const { info } = require('../utils/tools');
const router = require('express').Router();
const redis = require('../redis/cache');
const fetch = require('node-fetch');

const getTable = async (id) => {
    try {
        let table = await fetch(`https://api.football-data-api.com/league-tables?key=${process.env.AUTH_FOOTYSTATS}&season_id=${id}`);
        table = await table.json();
        if (table.success) return table.data;
    } catch (err) {
        return { error: true, message: err.message };
    }
};

const getLeague = async (id) => {
    try {
        let table = await fetch(`https://api.football-data-api.com/league-season?key=${process.env.AUTH_FOOTYSTATS}&season_id=${id}`);
        table = await table.json();
        if (table.success) return table.data;
        else return false
    } catch (err) {
        return { error: true, message: err.message };
    }
};

router.get('/', async (req, res) => {
    const id = req.query.id;
    const key = `LEAGUE:${id}`;
    try {
        const getLeagueStatistics = await redis.get(`${key}:statistics`);
        const getLeagueTable = await redis.get(`${key}:table`);
        const isGetLeagueID = !(await redis.get(`${key}:validation`));
        const funcLeg = await getLeague(id);
        const funcTable = await getTable(id);
        if (!funcLeg) return res.status(404).json({ error: true, message: 'alloy not found in our records' });
        if (!getLeagueStatistics || !getLeagueTable) res.status(201).json({ error: false, data: funcLeg, table: funcTable });
        if (isGetLeagueID) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(`${key}:statistics`, JSON.stringify(funcLeg));
                    await redis.set(`${key}:table`, JSON.stringify(funcTable));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getLeagueStatistics && getLeagueTable) return res.status(201).json({ error: false, data: JSON.parse(getLeagueStatistics), table: JSON.parse(getLeagueTable) });
    } catch (err) { return res.status(500).json({ error: true, message: err.message }); };
});


module.exports = router;




