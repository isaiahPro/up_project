import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

const MyComponent = () => {
    const [details, setDetails] = useState([
        { title: "live in", description: "California live in California live in California" },
        { title: "from", description: "New York, America from New York, America" },
        { title: "engaged", description: "" },
        { title: "work at", description: "Netflix  at Netflix" },
    ]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    const handleAddDetail = () => {
        setEditIndex(-1);
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
        <div className={" border-b-2"}>
            <Modal title={editIndex === -1 ? "Add Detail" : "Edit Detail"} open={isModalOpen} onOk={handleSaveDetail} onCancel={() => setIsModalOpen(false)}>
                <div className="flex items-center">
                    <Input
                        type="text"
                        className="p-2 w-[40%] border border-gray-300 rounded"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <Input
                        type="text"
                        className="p-2 w-[40%] border border-gray-300 rounded ml-2"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
            </Modal>
            <div className="flex items-center justify-between">
                <p className="text-2xl font-bold font-ubuntu">Details</p>

                <button
                    className=" py-2 rounded text-blue-500 hover:text-blue-700 flex items-center"
                    onClick={handleAddDetail}
                >
                    <BiPlusCircle size={25} className="mr-2" />
                </button>

            </div>
            <div>
                {details.map((detail, index) => (
                    <div key={index} className="py-2 pl-4 pr-10 flex justify-between items-center">
                        <span className={"font-semibold "}>{detail.title} {detail.description}</span>
                        <div className="flex">
                            <button
                                className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                                onClick={() => handleEditDetail(index)}
                            >
                                <EditOutlined />
                            </button>
                            <button
                                className="px-2 py-1 text-slate-400 rounded hover:text-slate-600"
                                onClick={() => handleDeleteDetail(index)}
                            >
                                <MinusCircleOutlined />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyComponent;