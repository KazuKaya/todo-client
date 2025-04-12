export default function Listbox({ name, value, onChange, options }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="flex-1 px-3 py-2 text-[#131842] font-[poppins] bg-[#FBF6E2] rounded min-h-[42px] outline-none"
        >
            {options.map(option => (
                <option key={option} value={option}>
                    {option.replace(/_/g, ' ')} {/* Enum değerlerini daha okunur hale getir */}
                </option>
            ))}
        </select>
    );
}