import {v4 as uuidv4} from "uuid";
import _ from "lodash";

export async function fetchWiki({search, language}) {
    const url = `https://${language}.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${search}&limit=15&namespace=*&format=json`;
    const response = await fetch(url);
    const json = await response.json();
    const wiki = []
    json[1].forEach((value, key) => wiki.push({
        id: uuidv4(),
        title: json[1][key],
        url: json[3][key],
        color: 'default'
    }))
    return wiki
}

export async function fetchModal(payload) {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=revisions&titles=${payload}&rvprop=content&format=json&rvsection=0&rvparse=1`;
    const response = await fetch(url);
    const json = await response.json();
    const s = _.map(json.query["pages"], "revisions")
    const modal = _.head(
        _.map(s[0][0], (item) => {
            return item;
        })
    )
    return modal
}
