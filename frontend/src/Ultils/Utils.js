export function leagueLegends(legends, colorZone) {
    let resultFilter = [];
    if (legends) {
        legends.map((i, index) => {
            resultFilter.push({
                type: i.includes("Relegation" || "Relegation Play-off") ? "Rebaixamento" : i,
                color: i.includes("Relegation") ? "red" : colorZone[index],
            });
        })
    }
    return resultFilter
}

export function separetor(data, type) {
    const result = []
    data.map(e => {
        let json = {
            country: e.country,
            id: e.id,
            name: e.name,
            round: e.round,
            season: e.season,
            teams: []
        }
        // e.teams.filter(team => {
        //     if (team.status.type == type) {
        //         console.log(team.status.type)
        //         json.teams.push(team)
        //     }
        // })
        if (json.teams) {
            result.push(json)
        }
    })
    return result.filter(e => {
        if (e.teams.length > 0) {
            return e
        }
    })
    // resultFilter
}

export let FAVORITOS = [];

