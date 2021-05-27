import React from "react";
import {connect} from "react-redux";
import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Texts from "./Texts";
import {createText} from "../redux/actions";
import fetchText from "../api/wiki";


class FormTexts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: ''}
  }

  submitHandler = event => {
    event.preventDefault();

    const {title} = this.state

    if (!title.trim()) {
      return
    }

    const newTitle = {
      title
    }

    this.props.createText(newTitle)
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
    fetchText(this.state.title);
  };

  render() {
    return (
      <div className={"app"}>
        <Button className={"button"} variant="contained">RU</Button>
        <Button className={"button"} variant="contained">EN</Button>
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
          <IconButton
            aria-label="delete"
            onClick={() => this.setState({title: ""})}
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
        <div className={"texts"}>
          <Texts/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createText
}

export default connect(null, mapDispatchToProps)(FormTexts);
