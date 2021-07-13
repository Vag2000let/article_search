import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import {v4 as uuidv4} from 'uuid';
import {NavLink} from "react-router-dom";


const LanguageButton = ({onclickLanguage}) => {
    const language = localStorage.getItem('language')
    const [button, setButton] = useState([
        {id: uuidv4(), language: 'ru', disabled: false},
        {id: uuidv4(), language: 'en', disabled: false}
    ])

    button.map(item => {
        if (item.language === language) {
            item.disabled = true
        }
        // console.log(item)
        return item
    })

    const clickLanguage = (e) => {
        onclickLanguage(e.language);
        setButton(
            button.map(item => {
                e.language === item.language ? item.disabled = true: item.disabled = false
                localStorage.setItem('language', e.language)
                return item
            })
        )
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {button.map((item) => (
                <div key={item.id}>
                    <NavLink to={item.language}>
                        <Button
                            key={item.language}
                            disabled={item.disabled}
                            className={"button"}
                            variant="text"
                            size={"small"}
                            onClick={clickLanguage.bind(this, item)}
                        >
                            {item.language}
                        </Button>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default LanguageButton;