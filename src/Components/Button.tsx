import React from 'react';

type ButtonProps = {
    text: string;
    onClick: () => void;
};

export function PrimaryButton({ text, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 text-xl rounded"
        >
            {text}
        </button>
    );
}

export function SquareButton({ text, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-emerald-500 h-full hover:bg-emerald-600 text-white font-bold py-4 px-6 text-xl rounded"
        >
            {text}
        </button>
    );
}

export function DestructiveButton({ text, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 text-xl rounded"
        >
            {text}
        </button>
    );
}