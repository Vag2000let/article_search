import React from "react";
import {connect} from "react-redux";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// import {createText, fetchWiki} from "../redux/actions";
import Texts from "./Texts";
import LanguageButton from "./LanguageButton";
import clickLanguage from "./LanguageButton"
import {texts} from "../toolkitRedux/textsReducer";


class FormTexts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      language: ''
    }
  }
  submitHandler = event => {
    event.preventDefault();

    const title = this.state.title

    // if (!title.trim()) {
    //   return
    // }
    texts(title)
    this.setState({title: ''})
  }

  changeInputText = event => {
    this.setState(prev => ({
      ...prev, ...{
        [event.target.name]: event.target.value
      }
    }))
  }
  fetchHandler = (e) => {
    const language = this.state.language
    const search = this.state.title
    if (search === '') {
      return
    }
    this.props.fetchWiki({search, language})
  };

  onclickLanguage = (language) => {
    this.setState({language: language})
  }
  clear = () => {
    this.setState({title: ""})
  }

  render() {
    return (
      <div className={"app"}>
        <Paper
          component={"form"}
          className={"MuiPaper-rounded"}
          variant="outlined"
          onSubmit={this.submitHandler}
        >
          <InputBase
            type={"text"}
            name={"title"}
            id={"title"}
            value={this.state.title}
            className={"input"}
            placeholder="Введите запрос"
            onChange={this.changeInputText}
          />
          <LanguageButton onclickLanguage={this.onclickLanguage}/>
          <IconButton
            aria-label="delete"
            onClick={this.clear}
          >
            <CancelOutlinedIcon
              fontSize={"small"}
              className={"button-clear"}
            />
          </IconButton>
          <IconButton
            type={"submit"}
            className={"iconButton"}
            aria-label="search"
            onClick={this.fetchHandler.bind(this)}
          >
            <SearchIcon/>
          </IconButton>
        </Paper>
        <Texts/>
      </div>
    );
  }
}

// localStorage.clear()

const mapDispatchToProps = (dispatch) => ({
  texts,
  fetchWiki: (payload) => dispatch(texts(payload)),
  clickLanguage
})

export default connect(null, mapDispatchToProps)(FormTexts);
