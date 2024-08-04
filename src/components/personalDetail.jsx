import { EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';

// eslint-disable-next-line react/prop-types
const PersonalData = ({ SectionTitle, sample }) => {
    const [sections, setSections] = useState(
        sample == true ? [
            {
                name: "Sample",
                title: SectionTitle,
                value: "Sample Description",
            },
        ] : [
            {
                name: "bio",
                title: "Bio",
                value: "Sample Description",
            },
        ]
    );
    const [editIndex, setEditIndex] = useState(-1);
    const [newText, setNewText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewText(sections[index].value);
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        if (editIndex >= 0) {
            const updatedSections = [...sections];
            updatedSections[editIndex] = {
                ...updatedSections[editIndex],
                value: newText,
            };
            setSections(updatedSections);
            setNewText('');
            setIsModalOpen(false);
            setEditIndex(-1);
        }
    };

    return (
        <div>
            <Modal
                title="Edit Description"
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditIndex(-1);
                    setNewText('');
                }}
                okText="Update"
            >
                <Input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Edit description"
                />
            </Modal>
            {sections.map((section, index) => (
                <div key={index} className="flex justify-between flex-row group">
                    <div className="flex flex-col">
                        {section.title && <p className="text-xl font-bold font-ubuntu">{SectionTitle ? SectionTitle : "Bio"}</p>}
                        <p className={`font-ubuntu my-auto leading-2w ${section.name === "name" ? "font-bold text-xl" : ""} ${section.name === "username" ? "-mt-5" : ""}`}>
                            {section.value}
                        </p>
                    </div>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                            onClick={() => handleEdit(index)}
                        >
                            <EditOutlined />
                        </button>
                        <button
                            className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                            onClick={() => handleDelete(index)}
                        >
                            <BiTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PersonalData;