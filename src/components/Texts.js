import React from "react";
import {connect} from "react-redux";
import {Text} from "./Text";


const Texts = ({syncTexts}) => {
  if (!syncTexts.length) {
    return <li>Нет ничего</li>
  }
  return syncTexts.map((item) => <Text key={item.title} texts={item.title}/>);
}

const makeStateToProps = (state) => {
  return {
    syncTexts: state.texts
  }
}

export default connect(makeStateToProps, null)(Texts)