export default function Button({ color, hoverColor, text }) {
    return (
        <button
            onClick={() => console.log("Update buttonnn")}
            className="color[] hover:bg-green-600 text-white px-4 py-2 rounded"
        >
            <span>
                {text}
            </span>
        </button>
    )
}