import React from "react";
import {connect} from "react-redux";
import {Text} from "./Text";


const Texts = (syncTexts) => {
    if (!syncTexts.length) {
      return <p>Нет ничего</p>
    }
    return syncTexts.map(title => <Text title={title} />)
}

const makeStateToProps = (state) => {
    return {
        syncTexts: state
    }
}

export default connect(makeStateToProps, null)(Texts)