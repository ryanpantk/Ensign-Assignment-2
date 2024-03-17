import React from 'react';

type HeaderProps = {
    text: string
}

export default function Header({text}: HeaderProps) {
    return (
        <h1 className="text-3xl font-bold">{text}</h1>
    )
}