import { MinusCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
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
    const [addEdu, setaddEdu] = useState(false)

    const handleAddEducation = () => {
        setaddEdu(true)
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
            setaddEdu(false)
        }
        // setaddEdu(false)
    };

    const handleDeleteEducation = (index) => {
        const newEducation = [...education];
        newEducation.splice(index, 1);
        setEducation(newEducation);
    };

    return (
        <div className={"sm:mb-5 w-full sm:py-5 border-b-2 "}>
            <div className="flex w-full flex-row items-center justify-between">
                <p className="text-2xl font-bold font-ubuntu">Education</p>
                <div className="flex items-center">
                    {
                        addEdu && <div className={"ml-5"} >
                            <Input
                                type="text"
                                className="p-2 input-sm w-[40%] border border-gray-300 rounded mr-2"
                                value={newInstitution}
                                onChange={(e) => setNewInstitution(e.target.value)}
                                placeholder="Institution"
                            />
                            <Input
                                type="text"
                                className="p-2 w-[40%] border border-gray-300 rounded mr-2"
                                value={newDepartment}
                                onChange={(e) => setNewDepartment(e.target.value)}
                                placeholder="Department"
                            />
                        </div>
                    }

                    <button
                        className="ml-2 px-4 py-2 text-blue-500 rounded hover:text-blue-700"
                        onClick={handleAddEducation}
                    >
                        <BiPlusCircle size={25} />
                    </button>
                </div>
            </div>
            <div>
                {education.map((item, index) => (
                    <div key={index} className="py-2 w-[90%]  pl-4 flex justify-between items-center">
                        <div>
                            <p className="font-bold">{item.institution}</p>
                            <p>{item.department}</p>
                        </div>
                        <button
                            className="px-2 py-1 text-slate-400 rounded hover:text-slate-600"
                            onClick={() => handleDeleteEducation(index)}
                        >
                            <MinusCircleOutlined size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Education;