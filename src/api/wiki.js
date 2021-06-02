import {connect} from "react-redux";
import {FETCH_TEXT} from "../redux/types";
import {fetchWiki} from "../redux/actions";

// function fetchText(search) {
//   let url = "https://en.wikipedia.org/w/api.php";
//   const params = {
//     origin: "*",
//     action: "opensearch",
//     format: "json",
//     search: search,
//     namespace: "0",
//     limit: "5",
//   };
//
//   url = `${url}?${new URLSearchParams(params)}`;
//     return async dispatch => {
//       const response = await fetch(url)
//       const json = await response.json()
//       const wiki = [];
//       json.forEach((item, key) =>
//         wiki.push({
//           title: json[1][key],
//           url: json[3][key]
//         }));
//       dispatch({ type: FETCH_TEXT, payload: wiki})
//       console.log(wiki)
//       return wiki
//     }

  // return fetch(url)
  //   .then(async (response) => response.json())
  //   .then((response) => {
  //     const wiki = [];
  //     response.forEach((item, key) =>
  //       wiki.push({
  //         title: response[1][key],
  //         url: response[3][key]
  //       }));
  //     return wiki
  //   })
  //   .catch(function (e) {
  //     console.log(e)
  //   })
// }
//
//
// export default fetchText;

