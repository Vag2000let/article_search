export default function fetchText(search) {
  let wikiItems = []
  let url = "https://en.wikipedia.org/w/api.php";
  const params = {
    action: "query",
    srsearch: search,
    list: "search",
    limit: "5",
    namespace: "0",
    format: "json",
  };

  url = url + "?origin=*";
  Object.keys(params).forEach((key) => {
    url += "&" + key + "=" + params[key];
  });
  // const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // console.log("pageid", response.query.pages[0])
      for (let key in response.query.search) {
        wikiItems.push({
          wikiUrl: 'link',
          wikiPageId: response.query.search[key].pageid,
          wikiPageSnipped: response.query.search[key].snippet,
          wikiTitle: response.query.search[key].title
        });
        // console.log("i am wikiItems", wikiItems)
      }
    })
    .then(function (response) {
      for (let key2 in wikiItems) {
        let page = wikiItems[key2]
        let pageID = page.wikiPageId
        let pageUrlpageId = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&
        inprop=url&format=json`;
        // console.log("i am pageUrlpageId", pageUrlpageId)
        fetch(pageUrlpageId)
          .then(function (response) {
            return response.json()
          })
          .then(function (response) {
            page.wikiUrl = response.query.pages[pageID].fullurl
          })
      }
    })
    .catch(function (e) {
      console.log(e)
    })
  console.log("i am wikiItems", wikiItems)
}