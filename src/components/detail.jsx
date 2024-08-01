import { MinusCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

const MyComponent = () => {
    const [details, setDetails] = useState([
        "live in California live in California live in California",
        "from New York, America from New York, America",
        "engaged",
        "work at Netflix  at Netflix"
    ]);
    const [addDetail, setAddDetail] = useState(false);
    const [bio, setBio] = useState('');

    const handleAddDetail = () => {
        setAddDetail(true);
    };

    const handleSaveDetail = () => {
        if (bio.trim() !== '') {
            setDetails([...details, bio.trim()]);
            setBio('');
            setAddDetail(false);
        }
    };

    const handleDeleteDetail = (index) => {
        const newDetails = [...details];
        newDetails.splice(index, 1);
        setDetails(newDetails);
    };

    return (
        <div className={" border-b-2"}>
            <div className="flex items-center justify-between">
                <p className="text-2xl font-bold font-ubuntu">Details</p>
                {addDetail && (
                    <div className="flex items-center">
                        <Input
                            type="text"
                            className="p-2 w-[80%] border border-gray-300 rounded"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <button
                            className="ml-2 px-4 py-2 text-blue-500 rounded hover:text-blue-700"
                            onClick={handleSaveDetail}
                        >
                            Save
                        </button>
                    </div>
                )}
                {!addDetail && (
                    <button
                        className=" py-2 rounded text-blue-500 hover:text-blue-700 flex items-center"
                        onClick={handleAddDetail}
                    >
                        <BiPlusCircle size={25} className="mr-2" />
                    </button>
                )}
            </div>
            <div>
                {details.map((detail, index) => (
                    <div key={index} className="py-2 pl-4 pr-10 flex justify-between items-center">
                        <span className={"font-semibold "}>{detail}</span>
                        <button
                            className="px-2 py-1 text-slate-400 rounded hover:text-slate-600"
                            onClick={() => handleDeleteDetail(index)}
                        >
                            <MinusCircleOutlined size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyComponent;