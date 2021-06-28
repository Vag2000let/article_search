import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import {v4 as uuidv4} from 'uuid';


const LanguageButton = ({onclickLanguage}) => {
    const [button, setButton] = useState([
        {id: uuidv4(), language: 'ru', disabled: false}, {id: uuidv4(), language: 'en', disabled: false}
    ])
    const clickLanguage = (e) => {
        onclickLanguage(e.language);
        setButton(
            button.map(item => {
                if (e.id !== item.id) {
                    item.disabled = true
                }
                return item
            }))
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {button.map((item) => (
                <div key={item.id}>
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
                </div>
            ))}
        </div>
    )
}

export default LanguageButton;