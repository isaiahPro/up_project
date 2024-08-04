import { EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { BiPlusCircle, BiTrash } from 'react-icons/bi';

// eslint-disable-next-line react/prop-types
const MyComponent = ({ SectionTitle, sample, deleteSection }) => {
    const [details, setDetails] = useState(
        sample == true
            ? [{ title: "Sample Title", description: "sample description" }]
            : [
                { title: "Title", description: "California live in California live in California" },
                { title: "from", description: "New York, America from New York, America" },
                { title: "engaged", description: "yes" },
                { title: "work at", description: "Netflix  at Netflix" },
            ]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    const handleAddDetail = () => {
        setEditIndex(-1);
        setNewTitle("");
        setNewDescription("")
        setIsModalOpen(true);
    };

    const handleEditDetail = (index) => {
        setEditIndex(index);
        setNewTitle(details[index].title);
        setNewDescription(details[index].description);
        setIsModalOpen(true);
    };

    const handleSaveDetail = () => {
        if (newTitle.trim() !== '' && newDescription.trim() !== '') {
            if (editIndex === -1) {
                setDetails([...details, { title: newTitle.trim(), description: newDescription.trim() }]);
            } else {
                const newDetails = [...details];
                newDetails[editIndex] = { title: newTitle.trim(), description: newDescription.trim() };
                setDetails(newDetails);
                setEditIndex(-1);
            }
            setNewTitle('');
            setNewDescription('');
            setIsModalOpen(false);
            setEditIndex(-1);
        }
    };

    const handleDeleteDetail = (index) => {
        const newDetails = [...details];
        newDetails.splice(index, 1);
        setDetails(newDetails);
    };

    return (
        <div className={""}>
            <Modal title={editIndex === -1 ? "Add Detail" : "Edit Detail"} open={isModalOpen} onOk={handleSaveDetail} onCancel={() => setIsModalOpen(false)}>
                <div className="flex w-full flex-row gap-2 items-center">
                    <Input
                        type="text"
                        className="p-1 w-[45%] border border-gray-300 rounded"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <Input
                        type="text"
                        className="p-1 w-[45%] border border-gray-300 rounded"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
            </Modal>
            <div className="flex border-b-2 items-center justify-between">
                <p className="text-2xl font-bold font-ubuntu">{SectionTitle}</p>
                <div className={"my-auto flex flex-row gap-2"}>
                    <button
                        className=" text-blue-500 rounded hover:text-blue-700"
                        onClick={handleAddDetail}
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
            <div>
                {details.map((detail, index) => (
                    <div key={index} className="py-2 flex justify-between items-center group">
                        <span className={""}> <span className={"font-semibold text-blue-800 "}>{detail.title}: </span> {detail.description}</span>
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                                onClick={() => handleEditDetail(index)}
                            >
                                <EditOutlined />
                            </button>
                            <button
                                className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                                onClick={() => handleDeleteDetail(index)}
                            >
                                <BiTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyComponent;