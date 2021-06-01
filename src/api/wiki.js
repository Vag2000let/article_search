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
  console.log('i am wiki', wiki)
  return wiki
}

// export function getWikiItems(getState, dispatch, search) {
//   dispatch(fetchWiki(fetchText(search)))
// }
export const getWikiItems = (getState, dispatch, search) => {
  fetchText(search).then(result => dispatch(fetchWiki(result)))
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWikiItems: search => dispatch(getWikiItems(search))
  }
}

export default connect(null, mapDispatchToProps)(fetchText);
