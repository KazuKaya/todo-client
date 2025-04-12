import React, { useState, useEffect } from "react";
import { updateTask, deleteTask } from "../../services/api";
import TaskDetails from "./TaskDetails";

export default function TaskDetailModal({ task, reloadTasks, onClosing }) {
    if (!task) return null;

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            await updateTask(task.id, editedTask);
            setIsEditing(false);
            await reloadTasks();
            await onClosing();
            alert("Görev güncellendi.");
        } catch (error) {
            console.error("Güncelleme hatası:", error);
            alert("Güncelleme başarısız.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task.id);
            setIsDeleting(false);
            await reloadTasks();
            await onClosing();
            alert("Görev silindi.");

        } catch (error) {
            console.error("silinemedi", error);
            alert("Görev silinemedi.");
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
        setIsDeleting(false);
        setEditedTask(task);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#FBF6E2]/80 backdrop-blur-sm z-50">
            <div className="bg-[#E68369] rounded-xl shadow-2xl p-6 w-[600px] h-[auto] relative animate-fade-in">
                <h2 className="absolute top-3 left-8 font-[poppins] font-bold text-xl text-[#FBF6E2]">{task.id}</h2>
                <div className="space-y-4 mt-10">
                    <TaskDetails label="Title" name="title" value={editedTask.title} isEditing={isEditing} onChange={handleInputChange} />
                    <TaskDetails label="Description" name="description" value={editedTask.description} isEditing={isEditing} onChange={handleInputChange} />
                    <TaskDetails label="Status" name="status" value={editedTask.status} isEditing={isEditing} onChange={handleInputChange} type="status" />
                    <TaskDetails label="Priority" name="priority" value={editedTask.priority} isEditing={isEditing} onChange={handleInputChange} type="priority" />
                    <TaskDetails label="Due Date" name="dueDate" value={editedTask.dueDate} isEditing={isEditing} onChange={handleInputChange} type="date" />

                    {/* Update & Cancel Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        {(isEditing || isDeleting) && (
                            <>
                                {isEditing && (
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-[#8adc82] hover:bg-[#66a560] text-white px-4 py-2 rounded transition-colors duration-200"
                                    >
                                        Update
                                    </button>
                                )}
                                {isDeleting && (
                                    <button
                                        onClick={handleDelete}
                                        className="bg-[#ff4d4d] hover:bg-[#cc3636] text-white px-4 py-2 rounded transition-colors duration-200"
                                    >
                                        Delete
                                    </button>
                                )}
                                <button
                                    onClick={handleCancel}
                                    className="bg-[#FBF6E2] hover:bg-[#ECCEAE] text-black px-4 py-2 rounded transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Edit, Delete, Close Buttons */}
                <div className="absolute top-3 right-8 flex items-center gap-2">
                    {(!isEditing && !isDeleting) && (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                title="Edit Task"
                                className="text-[#FBF6E2] p-1 rounded-full hover:pt-0.5"
                            >
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button
                                onClick={() => setIsDeleting(true)} // Silme fonksiyonu eklenecek
                                title="Delete Task"
                                className="text-[#FBF6E2] p-1 rounded-full hover:pt-0.5"
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </>
                    )}
                    <button
                        onClick={onClosing}
                        title="Close"
                        className="text-[#FBF6E2] p-1 rounded-full hover:pt-0.5"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </div>
    );
}