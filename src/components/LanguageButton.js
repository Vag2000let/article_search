import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import {v4 as uuidv4} from 'uuid';
import {NavLink, useLocation} from "react-router-dom";


const LanguageButton = ({onclickLanguage}) => {
    const [language, setLanguage] = useState('ru')
    const [button, setButton] = useState([
        {id: uuidv4(), language: 'ru', disabled: false},
        {id: uuidv4(), language: 'en', disabled: false}
    ])
    // console.log(language)
    const location = useLocation();

    button.map(item => {
        console.log("i'm button.map")
        language === item.language ? item.disabled = true : item.disabled = false
        localStorage.setItem('language', language)
        return item
    })

    useEffect(() => {
        onclickLanguage(language);
        console.log("i'm useEffect")
        setLanguage(location.pathname.slice(1))
    },[onclickLanguage, language, location])

    const clickLanguage = (e) => {
        console.log("i'm clickLanguage")
        onclickLanguage(language);
        setButton(
            button.map(item => {
                e.language === item.language ? item.disabled = true : item.disabled = false
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

export default React.memo(LanguageButton);