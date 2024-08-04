import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Input, Modal, Tag } from 'antd';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';

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
            ]
    );
    const [newSubject, setNewSubject] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleDeleteButton, setVisibleDeleteButton] = useState({});

    const handleAddSubject = () => {
        setIsModalOpen(true)
        if (newSubject.trim() !== '') {
            setsubjects([...subjects, newSubject.trim()]);
            setNewSubject('');
            setIsModalOpen(false);
        }
    };

    // const handleDeleteSubject = (index) => {
    //     const newsubjects = [...subjects];
    //     newsubjects.splice(index, 1);
    //     setsubjects(newsubjects);
    //     setVisibleDeleteButton((prevState) => ({
    //         ...prevState,
    //         [index]: false,
    //     }));
    // };
    const handleDeleteSubject = (index) => {
        const newSections = subjects.filter((_, i) => i !== index);
        setsubjects(newSections);
    };

    const handleTagHover = (index, visible) => {
        setVisibleDeleteButton((prevState) => ({
            ...prevState,
            [index]: visible,
        }));
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
                        className=" text-blue-500 rounded hover:text-blue-700"
                        onClick={handleAddSubject}
                    >
                        <PlusCircleOutlined />
                    </button>
                    <button
                        className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                        onClick={deleteSection}
                    >
                        <BiTrash />
                    </button>
                </div>
            </div>
            <div className={"flex flex-row pt-3 flex-wrap gap-2 "}>
                {subjects.map((subject, index) => (
                    <Tag
                        key={index}
                        className={"p-2 h-fit rounded-md text-sm cursor-pointer"}
                        onMouseEnter={() => handleTagHover(index, true)}
                        onMouseLeave={() => handleTagHover(index, false)}
                    >
                        {subject}
                        <div
                            type="link"
                            className='pl-2'
                            style={{ display: visibleDeleteButton[index] ? 'inline' : 'none' }}
                            onClick={() => handleDeleteSubject(index)}
                        >
                            <CloseOutlined />
                        </div>
                    </Tag>
                ))}
            </div>
        </div>
    );
};

export default Subject;