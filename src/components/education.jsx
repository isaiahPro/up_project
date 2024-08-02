import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

const Education = () => {
    const [education, setEducation] = useState([
        {
            institution: 'University of XYZ',
            department: 'Computer Science'
        },
        {
            institution: 'College ABC',
            department: 'Business Administration'
        },
        {
            institution: 'University of XYZ',
            department: 'Computer Science'
        },
        {
            institution: 'College ABC',
            department: 'Business Administration'
        }
    ]);
    const [newInstitution, setNewInstitution] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleAddEducation = () => {
        if (newInstitution.trim() !== '' && newDepartment.trim() !== '') {
            setEducation([
                ...education,
                {
                    institution: newInstitution.trim(),
                    department: newDepartment.trim()
                }
            ]);
            setNewInstitution('');
            setNewDepartment('');
            setIsModalOpen(false);
        }

    };

    const handleDeleteEducation = (index) => {
        const newEducation = [...education];
        newEducation.splice(index, 1);
        setEducation(newEducation);
    };

    const handleEditEducation = (index) => {
        setEditIndex(index);
        setNewInstitution(education[index].institution);
        setNewDepartment(education[index].department);
        setIsModalOpen(true);
    };

    const handleUpdateEducation = () => {
        const newEducation = [...education];
        newEducation[editIndex] = {
            institution: newInstitution.trim(),
            department: newDepartment.trim()
        };
        setEducation(newEducation);
        setNewInstitution('');
        setNewDepartment('');
        setIsModalOpen(false);
        setEditIndex(-1);
    };

    return (
        <div className={"sm:mb-5 w-full sm:ml-3  "}>
            <Modal title="Add Education Status" open={isModalOpen} onClose={() => setEditIndex(-1)} okText={editIndex === -1 ? "Add" : "Update"} onOk={editIndex === -1 ? handleAddEducation : handleUpdateEducation} onCancel={() => { setEditIndex(-1); setIsModalOpen(false) }}>
                <div className={""}>
                    <Input
                        type="text"
                        className="p-1 input-sm w-[45%] border border-gray-300 rounded mr-2"
                        value={newInstitution}
                        onChange={(e) => setNewInstitution(e.target.value)}
                        placeholder="Institution"
                    />
                    <Input
                        type="text"
                        className="p-1 w-[45%] border border-gray-300 rounded mr-2"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        placeholder="Department"
                    />
                </div>
            </Modal>
            <div className="flex border-b-2 w-full flex-row items-center justify-between">
                <p className="text-2xl font-bold font-ubuntu">Education</p>
                <div className="flex items-center">
                    <button
                        className="ml-2 text-blue-500 rounded hover:text-blue-700"
                        onClick={() => { setEditIndex(-1); setIsModalOpen(true); }}
                    >
                        <BiPlusCircle size={25} />
                    </button>
                </div>
            </div>
            <div className={"pt-3 flex flex-col gap-2"}>
                {education.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div>
                            <p className="font-bold">{item.institution}</p>
                            <p>{item.department}</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                                onClick={() => handleEditEducation(index)}
                            >
                                <EditOutlined />
                            </button>
                            <button
                                className="px-2 py-1 text-slate-400 rounded hover:text-slate-600"
                                onClick={() => handleDeleteEducation(index)}
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

export default Education;