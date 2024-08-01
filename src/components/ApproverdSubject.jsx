import { CloseOutlined } from "@ant-design/icons";
import { Input, Modal, Tag } from 'antd';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

const Subject = () => {
    const [subjects, setsubjects] = useState([
        "English",
        "amharic",
        "franch",
        "franch",

    ]);
    const [newSubject, setNewSubject] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleAddSubject = () => {
        setIsModalOpen(true)
        if (newSubject.trim() !== '') {
            setsubjects([...subjects, newSubject.trim()]);
            setNewSubject('');
            setIsModalOpen(false);
        }
    };

    const handleDeleteSubject = (index) => {
        const newsubjects = [...subjects];
        newsubjects.splice(index, 1);
        setsubjects(newsubjects);
    };

    return (
        <div>
            <div className="flex border-b-2 pb-2 mr-4 items-center justify-between">
                <Modal title="Add subjects" open={isModalOpen} onOk={handleAddSubject} onCancel={() => setIsModalOpen(false)}>
                    <Input
                        type="text"
                        className="p-1 w-[80%] border border-gray-300 rounded"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                    />
                </Modal>
                <p className="text-2xl font-bold font-ubuntu">Subjects</p>
                <div className="flex items-center">
                    <button
                        className="ml-2 px-4 py-2 text-blue-500 rounded hover:text-blue-700"
                        onClick={handleAddSubject}
                    >
                        <BiPlusCircle size={25} />
                    </button>
                </div>
            </div>
            <div className={"flex flex-row flex-wrap gap-2 my-3 mr-10"}>
                {
                    subjects.map((hobby, index) => {
                        return (
                            <Tag key={index} className={"p-2 rounded-2xl text-sm"} closeIcon={<CloseOutlined />} onClose={() => handleDeleteSubject(index)}  >
                                {hobby}
                            </Tag>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Subject;