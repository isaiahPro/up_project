import { CloseOutlined } from "@ant-design/icons";
import { Input, Modal, Tag } from 'antd';
import { useState } from 'react';
import { BiPlusCircle, BiTrash } from 'react-icons/bi';

// eslint-disable-next-line react/prop-types
const Subject = ({ SectionTitle, sample, deleteSection }) => {
    const [subjects, setSubjects] = useState(
        sample ? [] : ["English", "Amharic", "French", "Spanish"]
    );
    const [newSubject, setNewSubject] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddSubject = () => {
        if (newSubject.trim() !== '') {
            setSubjects([...subjects, newSubject.trim()]);
            setNewSubject('');
            setIsModalOpen(false);
        }
    };

    const handleDeleteSubject = (index) => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    return (
        <div>
            <div className="flex border-b-2 items-center justify-between">
                <Modal title="Add subjects" open={isModalOpen} onOk={handleAddSubject} onCancel={() => setIsModalOpen(false)}>
                    <Input
                        type="text"
                        className="p-1 w-[80%] border border-gray-300 rounded"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                    />
                </Modal>
                <p className="text-2xl font-bold font-ubuntu">{SectionTitle}</p>
                <div className="my-auto flex flex-row gap-2">
                    <button
                        className="ml-2 text-blue-500 rounded hover:text-blue-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <BiPlusCircle size={25} />
                    </button>
                    <button
                        className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                        onClick={deleteSection}
                    >
                        <BiTrash />
                    </button>
                </div>
            </div>
            <div className="flex flex-row pt-3 flex-wrap gap-2">
                {subjects.map((subject, index) => (
                    <Tag
                        key={index}
                        className="p-2 rounded-2xl cursor-pointer text-sm subject-tag"
                        closable
                        closeIcon={<CloseOutlined />}
                        onClose={() => handleDeleteSubject(index)}
                    >
                        {subject}
                    </Tag>
                ))}
            </div>
            <style jsx>{`
                .subject-tag {
                    position: relative;
                    transition: background-color 0.3s ease;
                }
                .subject-tag:hover {
                    background-color: #f0f0f0;
                }
                .subject-tag .anticon-close {
                    visibility: hidden;
                }
                .subject-tag:hover .anticon-close {
                    visibility: visible;
                }
            `}</style>
        </div>
    );
};

export default Subject;
