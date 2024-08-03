import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tag } from 'antd';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

// eslint-disable-next-line react/prop-types
const Subject = ({ SectionTitle, sample, deleteSection }) => {
    const [subjects, setsubjects] = useState(
        sample == true
            ? []
            : [
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
                <div className={"my-auto flex flex-row gap-2"}>
                    <button
                        className="ml-2 text-blue-500 rounded hover:text-blue-700"
                        onClick={handleAddSubject}
                    >
                        <BiPlusCircle size={25} />
                    </button>
                    <Button
                        danger
                        ghost
                        size='small'
                        className={"text-sm font-ubuntu"}
                        onClick={deleteSection}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className={"flex flex-row pt-3 flex-wrap gap-2 "}>
                {
                    subjects.map((subject, index) => {
                        return (
                            <Tag key={index} className={"p-2 rounded-2xl text-sm"} closeIcon={<CloseOutlined />} onClose={() => handleDeleteSubject(index)}  >
                                {subject}
                            </Tag>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Subject;