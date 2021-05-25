import {CREATE_TEXT} from "./types";


export function createText(title) {
    return {
        type: CREATE_TEXT,
        payload: title
    }
}

export function fetchText(state) {
    let url = "https://en.wikipedia.org/w/api.php";
    const search = state.title
    console.log(search)
    const params = {
        action: "opensearch",
        search: {search},
        limit: "5",
        namespace: "0",
        format: "json",
        language: 'RU'
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {console.log(response);})
        .catch(function(error){console.log(error);});
}