import { EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { BiPlusCircle, BiTrash } from 'react-icons/bi';

// eslint-disable-next-line no-unused-vars, react/prop-types
const Education = ({ SectionTitle, sample, deleteSection }) => {
    const [education, setEducation] = useState(sample == true ? [{
        institution: 'Title',
        department: 'Description'
    },] : [
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
    const [showButtons, setShowButtons] = useState(-1);

    const handleAddEducation = () => {
        setIsModalOpen(true);

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

    const handleMouseEnter = (index) => {
        setShowButtons(index);
    };

    const handleMouseLeave = () => {
        setShowButtons(-1);
    };

    return (
        <div className={"sm:mb-5 w-full  "}>
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
                <p className="text-2xl font-bold font-ubuntu">{SectionTitle}</p>
                <div className={"my-auto flex flex-row gap-2"}>
                    <button
                        className="ml-2 text-blue-500 rounded hover:text-blue-700"
                        onClick={handleAddEducation}
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
            <div className={"pt-3 flex flex-col gap-2"}>
                {education.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div>
                            <p className="font-bold">{item.institution}</p>
                            <p>{item.department}</p>
                        </div>
                        {showButtons === index && (
                            <div className="flex items-center">
                                <button
                                    className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                                    onClick={() => handleEditEducation(index)}
                                >
                                    <EditOutlined />
                                </button>
                                <button
                                    className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                                    onClick={() => handleDeleteEducation(index)}
                                >
                                    <BiTrash />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Education;