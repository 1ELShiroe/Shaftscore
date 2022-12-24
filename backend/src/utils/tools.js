const separar = (itens, maximo) => {
    return itens.reduce((acumulador, item, indice) => {
        const grupo = Math.floor(indice / maximo);
        acumulador[grupo] = [...(acumulador[grupo] || []), item];
        return acumulador;
    }, []);
};
const filterFloat = function (value) {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
        .test(value))
        return true;
    return false;
};
const locationIndex = (params, array) => {
    var results = [];
    var idx = array.indexOf(params);
    while (idx != -1) {
        results.push(idx);
        idx = array.indexOf(params, idx + 1);
    }
    return results;
};
const filterItem = (params) => {
    const caracteres = params.slice(params.length - 2).trim().toLocaleUpperCase()
    const array = ['MG']
    const data = [
        { caracter: 'Mineiro', edit: '-MG' },
        { caracter: 'PR', edit: 'Paranaense' }
    ]
    // if (params === 'Atlético Mineiro') return 'Atletico-MG'.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
    const resultado = array.filter(item => item.includes(caracteres))
    if (resultado.length === 1) {
        let test = data.map(res => res.caracter === resultado[0] ? resultado[0].replace(resultado[0], res.edit) : null)
        test = test.filter(comp => comp !== null)
        console.log(params)
        console.log(`${params.slice(0, -3).normalize('NFD').replace(/[\u0300-\u036f]/g, "")} ${test[0]}`.toLowerCase())
        return `${params.slice(0, -3).normalize('NFD').replace(/[\u0300-\u036f]/g, "")} ${test[0]}`.toLowerCase()
    } else return params.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
};
const configTools = {
    posts: [],
    read() {
        register.posts = JSON.parse(fs.readFileSync('./arquivo.json', { encoding: 'utf-8' }));
        return register.posts;
    },
    create({ name, country, idFOOT, footystats }) {
        const dados = { name, country, idFOOT, footystats }
        register.posts.push(dados);
        fs.writeFileSync('./arquivo.json', JSON.stringify(register.posts), { encoding: 'utf-8' })
    }
};
const info = (msg) => { console.log('\x1b[0m\x1b[37m[ \x1b[0m\x1b[33mINFO \x1b[37m] ' + msg) }

module.exports = { info, separar, filterFloat, locationIndex, filterItem }