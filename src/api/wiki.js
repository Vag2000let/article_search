import React from "react";
import {connect} from "react-redux";


const fetchText = (search) => {
  const wiki = []

  let url = "https://en.wikipedia.org/w/api.php";
  const params = {
    origin: "*",
    action: "opensearch",
    format: "json",
    search: search,
    namespace: "0",
    limit: "5",
  };

  url = `${url}?${new URLSearchParams(params)} `;

  fetch(url)
  .then(async (response) => response.json())
    .then(response => {
      for (let s in response) {
        wiki.push({
          title: response[1][s],
          url: response[3][s]
        })
      }
      console.log('i am wikiItems', wiki)
    })
    .catch(function (e) {
      console.log(e)
    })
  return wiki
}

const makeStateToProps = (state) => {
  console.log(state)
  return state
}

export default connect(makeStateToProps, null)(fetchText)