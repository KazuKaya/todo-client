import groupTasksByStatus from "../../utils/groupTasks.js";

export default function TaskCard({ tasks, onClick }) {
    const groupedTasks = groupTasksByStatus(tasks);

    // İstediğiniz statü sırasını tanımlayın
    const statusOrder = ["Pending", "Completed", "Canceled"];

    return (
        <div className="flex justify-around items-start p-10">
            {statusOrder.map((status) => (
                groupedTasks[status] && ( // Önce statünün groupedTasks içinde olup olmadığını kontrol edin
                    <div
                        key={status}
                        className="flex flex-col p-4 bg-[#E68369] rounded-3xl shadow-md w-[350px]"
                    >
                        <h3 className="text-lg font-bold mb-2 capitalize">{status}</h3>
                        <div className="bg-[#ECCEAE] rounded-2xl p-1">
                            {groupedTasks[status].map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-[#FBF6E2] p-2 rounded-xl shadow m-2 cursor-pointer hover:bg-[#dbf3c6] transition"
                                    onClick={() => onClick(task)}
                                >
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}