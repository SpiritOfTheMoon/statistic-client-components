import React, { useState } from "react";
import { HiddenText } from "./HiddenText";
import { Prism } from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/dist/esm/styles/prism/vs"
import { Button } from "@fluentui/react";
export type CodeTextProps = {
    text: string,
    language: string,
};

export enum ButtonText {

    hide = "Свернуть",
    expand = "Развернуть",
}

export function CodeText({ text, language }: CodeTextProps): JSX.Element {

    const [hidden, setHidden] = useState(true);
    const [buttonText, setButtonText] = useState(ButtonText.expand);

    const onClick = () => {

        if (hidden) {
            setButtonText(ButtonText.hide);
            setHidden(false);

        } else {
            setButtonText(ButtonText.expand);
            setHidden(true);
        }

    };

    const renderText = () => {
        if (hidden) {

            return (<HiddenText fullText={text} />);

        } else {
            return (
            <Prism 
            customStyle= {{ overflow: 'scroll', maxHeight: 500, maxWidth: 500 }}
            language={language} 
            style={vs}>
                {text}
            </Prism>);

        }
    }
    return (
        <>
            <Button onClick={onClick}>
                {buttonText}
            </Button>
            <div>
                {renderText()}
            </div>
        </>

    )
}
