import React from "react";
import {connect} from "react-redux";
import {fetchWiki} from "../redux/actions";


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
      response.forEach((item, key) => wiki.push({
        title: response[1][key],
        url: response[3][key]
      }))})
    .catch(function (e) {
      console.log(e)
    })
  console.log('i am wikiItems', wiki)
  return wiki
}

const getWikiItems = async (dispatch) => {
  dispatch(fetchWiki(await fetchText))
}

export default connect(null, getWikiItems)(fetchText);
