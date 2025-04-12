export default function Input({ name, value, onChange, type = "text" }) {
    return (
        <input
            className="flex-1 border border-[#131842] rounded bg-[#FBF6E2] px-3 py-2 text-[#131842] focus:outline-none focus:ring-2 focus:ring-[#131842]/50" // Odaklanma stili eklendi
            //flex-1 border border-[#131842] rounded bg-[#FBF6E2] px-3 py-2
            type={type}         // Dinamik input tipi
            name={name}         // Input adı (state güncellemesi için)
            value={value || ''} // Kontrollü component için value prop'u (boşsa '' yap)
            onChange={onChange} // Değişiklik dinleyicisi
        />
    )
}