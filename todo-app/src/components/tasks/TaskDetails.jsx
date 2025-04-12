import Input from "../ui/Input";
import Listbox from "../ui/Listbox";

const statusOptions = ["Pending", "Completed", "Canceled"];

const priorityOptions = ["Low", "Medium", "High"];

export default function TaskDetails({ label, name, value, isEditing, onChange, type = "text" }) {
    return (
        <div className="flex items-center gap-4 min-h-[42px]">
            <label className="w-32 text-right font-[poppins-medium] text-xl text-[#FBF6E2]">{label}:</label>
            {isEditing ? (
                type === "status" ? (
                    <Listbox
                        name={name}
                        value={value}
                        onChange={onChange}
                        options={statusOptions}
                    />
                ) : type === "priority" ? (
                    <Listbox
                        name={name}
                        value={value}
                        onChange={onChange}
                        options={priorityOptions}
                    />
                ) : (
                    <Input
                        name={name}
                        value={value}
                        onChange={onChange}
                        type={type}
                    />
                )
            ) : (
                <span className="flex-1 px-3 py-2 text-[#131842] font-[poppins] bg-[#FBF6E2] rounded min-h-[42px] flex items-center"> {/* Stil ve hizalama ayarları */}
                    {type === 'date' && value ? new Date(value).toLocaleDateString() : value || "-"} {/* Tarihi formatla veya boşsa "-" göster */}
                </span>
            )}
        </div>
    )
}