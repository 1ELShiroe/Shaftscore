const { info } = require("../utils/tools")
const router = require('express').Router();
const fetch = require('node-fetch');
const redis = require('../redis/cache');
const list = [
    { name: 'Europe UEFA Champions League', name_pt: 'Liga dos Campeões', link: 'champion/champions-league/' },
    { name: 'Europe UEFA Europa League', name_pt: 'Europa League', link: 'champion/liga-europa/' },
    { name: 'International UEFA Euro Championship', name_pt: 'Euro Copa', link: 'champion/euro-champion/' },
    { name: 'South America Copa Sudamericana', name_pt: 'Sul Americana', link: 'champion/copa-sul-americana/' },
    { name: 'South America Copa Libertadores', name_pt: 'Libertadores', link: 'champion/copa-libertadores/' },
    { name: 'England Premier League', name_pt: 'Premier League', link: 'league/inglaterra-premier-league/' },
    { name: 'France Ligue 1', name_pt: 'Ligue 1', link: 'league/franca-liga-1/' },
    { name: 'Brazil Serie A', name_pt: 'Brasileirão Série A', link: 'league/brasileirao-serie-a/' },
    { name: 'Brazil Serie B', name_pt: 'Brasileirão Série B', link: 'league/brasileirao-serie-b/' },
    { name: 'Brazil Copa do Brasil', name_pt: 'Copa do Brasil', link: 'champion/copa-do-brasil/' },
    { name: 'Germany Bundesliga', name_pt: 'Bundesliga', link: 'league/alemanha-bundesliga/' },
    { name: 'Italy Serie A', name_pt: 'Serie A', link: 'league/italia-serie-a/' },
    { name: 'Spain La Liga', name_pt: 'LaLiga', link: 'league/espanha-la-liga/' }
]

router.get('/league/', async (req, res) => {
    const key = 'country:leagues';
    try {
        const getCountryList = await redis.get(key);
        const isGetCountryList = !(await redis.get(`${key}:validation`));
        const topLeague = [];
        const getCountryLeagues = async () => {
            let data = await fetch(`https://api.football-data-api.com/league-list?key=${process.env.AUTH_FOOTYSTATS}`)
            data = await data.json();

            let array = data.data.map(leg => {
                list.map(i => { if (i.name == leg.name) topLeague.push({ country: leg.country, name: leg.name, season: leg.season, name_pt: i.name_pt, link: i.link + leg.season[leg.season.length - 1].id }) })
                return { country: leg.country, data: data.data.filter(i => i.country == leg.country) }
            });
            array = array.filter(function (a) {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))
            return { country: array, top: topLeague }
        };
        if (!getCountryList) res.status(201).json({ error: false, data: await getCountryLeagues() });
        if (isGetCountryList) {
            const isRefetching = !!(await redis.get(`${key}:is-refetching`))
            if (!isRefetching) {
                await redis.set(`${key}:is-refetching`, true, 'ex', 30); // CACHE Demora 30 segundos. PADRÂo 1 h
                setTimeout(async () => {
                    info(`${key} => Atualizando CACHE...`);
                    await redis.set(key, JSON.stringify(await getCountryLeagues()));
                    await redis.set(`${key}:validation`, true, 'ex', 3600);
                }, 0);
            };
        };
        if (getCountryList) return res.status(201).json({ error: false, data: JSON.parse(getCountryList) });
    } catch (err) {
        return res.status(500).json({ error: true, message: err.message });
    };
});

module.exports = router;




