import { Button, Image } from 'antd';
import { useRef, useState } from 'react';
const ProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&s");
    const fileInputRef = useRef(null);

    const handleAddProfilePicture = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setProfilePicture(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleDeleteProfilePicture = () => {
        setProfilePicture(null);
    };

    return (
        <div className={""}>
            <div className="relative">
                {profilePicture && (
                    <Image
                        src={profilePicture}
                        alt="Profile"
                        className="w-full object-cover"
                    />
                )}
            </div>
            <div className="flex items-center justify-between mt-2">
                <Button
                    className="mx-auto"
                    onClick={handleAddProfilePicture}
                >
                    {profilePicture ? 'Change profile pic' : 'Add profile pic'}
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                {profilePicture && (
                    <Button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={handleDeleteProfilePicture}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProfilePicture;