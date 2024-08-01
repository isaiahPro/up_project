import { CloseOutlined } from "@ant-design/icons";
import { Tag } from 'antd';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

const Hoobies = () => {
    const [hobbies, setHobbies] = useState([
        "Reading",
        "Hiking",
        "Cooking",
        "Painting",
        "Reading",
        "Hiking",
        "Cooking",
        "Painting"
    ]);
    const [addHobby, setAddHobby] = useState(false);

    const [newHobby, setNewHobby] = useState('');

    const handleAddHobby = () => {
        setAddHobby(true)
        if (newHobby.trim() !== '') {
            setHobbies([...hobbies, newHobby.trim()]);
            setNewHobby('');
            setAddHobby(false)
        }


    };

    const handleDeleteHobby = (index) => {
        const newHobbies = [...hobbies];
        newHobbies.splice(index, 1);
        setHobbies(newHobbies);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-2xl font-bold font-ubuntu">Hobbies</p>
                <div className="flex items-center">
                    {addHobby && <input
                        type="text"
                        className="p-2 w-[80%] border border-gray-300 rounded"
                        value={newHobby}
                        onChange={(e) => setNewHobby(e.target.value)}
                    />}
                    <button
                        className="ml-2 px-4 py-2 text-blue-500 rounded hover:text-blue-700"
                        onClick={handleAddHobby}
                    >
                        <BiPlusCircle size={25} />
                    </button>
                </div>
            </div>
            <div className={"flex flex-row flex-wrap gap-4 my-3 mr-10"}>
                {
                    hobbies.map((hobby, index) => {
                        return (
                            <Tag key={index} className={"p-2 rounded-2xl text-base"} closeIcon={<CloseOutlined />} onClose={() => handleDeleteHobby(index)}  >
                                {hobby}
                            </Tag>
                        )
                    })
                }
            </div>
        </div >
    );
};

export default Hoobies;