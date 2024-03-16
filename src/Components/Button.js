export function PrimaryButton({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 text-xl rounded"
        >
            {text}
        </button>
    );
}