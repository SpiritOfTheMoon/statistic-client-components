/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

export type HiddenStringProps = {
    fullText: string,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export function HiddenText({ fullText, onClick }: HiddenStringProps): JSX.Element {
    const hiddenText = fullText.length > 100 ? `${fullText.substring(0, 100)}...` : fullText;

    return (
        <div style={{ cursor: 'pointer' }} onClick={onClick}>{hiddenText}</div>
    );
}
