const router = require("express").Router();
const guesses = require('./routes/guesses');
const statics = require('./routes/statics');
const leagues = require('./routes/leagues');
const others = require('./routes/others');
const table = require('./routes/table');
const matchs = require('./routes/matchs');
const teams = require('./routes/team');
const champions = require('./routes/champions');
const country = require('./routes/country');

router.use('/', others);
router.use('/time', teams);
router.use('/tabela', table);
router.use('/ligas', leagues);
router.use('/country', country);
router.use('/partidas', matchs);
router.use('/palpites', guesses);
router.use('/estatisticas', statics);
router.use('/melhores-campeonatos', champions);


module.exports = router;

// http://www.kammerl.de/ascii/AsciiSignature.php (TYPE: POISON)