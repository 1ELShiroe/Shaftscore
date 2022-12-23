const { info } = require("../utils/tools");
const router = require('express').Router();
const fetch = require('node-fetch');
const redis = require('../redis/cache');
const { lastX } = require('../utils/data/lastx_team')

const getLeague = async (id) => {
    let resAxios = await fetch(`https://api.football-data-api.com/team?key=${process.env.AUTH_FOOTYSTATS}&team_id=${id}`);
    resAxios = await resAxios.json();
    if (resAxios.success) return resAxios.data;
};

router.get('/info/', async (req, res) => {
    const id = req.query.id;
    const key = `team:${id}`;
    try {
        const getTeamINFO = await redis.get(`${key}:statistics`);
        const getLastINFO = await redis.get(`${key}:last_5`);
        const isGetTeamID = !(await redis.get(`${key}:validation`));

        if (!getTeamINFO) res.status(201).json({ error: false, data: await getLeague(id), last_matchs: await lastX(id) });
        if (isGetTeamID) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    info(`[${key}] Atualizando CACHE...`);
                    await redis.set(`${key}:statistics`, JSON.stringify(await getLeague(id)));
                    await redis.set(`${key}:last_5`, JSON.stringify(await lastX(id)));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getTeamINFO) return res.status(201).json({ error: false, data: JSON.parse(getTeamINFO), last_matchs: JSON.parse(getLastINFO) });
    } catch (err) { return res.status(500).json({ error: true, message: err.message }); };
});


module.exports = router;




