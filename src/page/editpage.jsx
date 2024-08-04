import { EditOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import Section03 from "../components/ApproverdSubject";
import Section02 from "../components/detail";
import Section04 from "../components/education";
import ImageUpload from "../components/ImageUpload";
import Section01 from "../components/personalDetail";

const EditPage = () => {
    const [sections, setSections] = useState([
        { title: "Bio", sample: false, type: "Section01", buttonText: "Text" },
        { title: "Details", sample: false, type: "Section02", buttonText: "Section" },
        { title: "Subjects", sample: false, type: "Section03", buttonText: "Lists" },
        { title: "Educations", sample: false, type: "Section04", buttonText: "Section" }
    ]);
    const [open, setOpen] = useState(false);
    const [addsec, setaddsec] = useState(false)
    const [newSectionType, setNewSectionType] = useState('');
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [name, setName] = useState("Alloson");
    const [userName, setUserName] = useState("alloson7732r");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [newText, setNewText] = useState('');
    const [addAfterIndex, setAddAfterIndex] = useState(null);

    const sectionRefs = useRef([]);
    const [topSection, setTopSection] = useState([
        {
            name: "name",
            title: "",
            value: name,
            setValue: setName,
        },
        {
            name: "username",
            title: "",
            value: userName,
            setValue: setUserName,
        },
    ]);

    const sectionComponents = {
        Section01,
        Section02,
        Section03,
        Section04
    };

    const openModal = (type, index) => {
        setNewSectionTitle("");
        setNewSectionType(type);
        setAddAfterIndex(index);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setNewSectionType('');
        setNewSectionTitle('');
        setAddAfterIndex(null);
    };

    const handleInputChange = (e) => {
        setNewSectionTitle(e.target.value);
    };

    const handleAddSection = () => {
        if (newSectionTitle.trim()) {
            const newSection = { title: newSectionTitle, sample: true, type: newSectionType };
            const newSections = [...sections];
            if (addAfterIndex !== null) {
                newSections.splice(addAfterIndex + 1, 0, newSection);
            } else {
                newSections.push(newSection);
            }
            setSections(newSections);
            setOpen(false);
            // Scroll to the new section
        }
    };

    const deleteSection = (index) => {
        const newSections = sections.filter((_, i) => i !== index);
        setSections(newSections);
    };

    const addSectionButton = (index) => (
        <Dropdown
            className={"my-auto"}
            menu={{
                items: [
                    {
                        key: '1',
                        label: (
                            <button
                                className="block w-full gap-2 text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal('Section01', index)}
                            >
                                <PlusOutlined />
                                <span className={"ml-2"}>Text</span>
                            </button>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal('Section02', index)}
                            >
                                <PlusOutlined />
                                <span className={"ml-2"}>Section</span>
                            </button>
                        ),
                    },
                    {
                        key: '3',
                        label: (
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal('Section03', index)}
                            >
                                <PlusOutlined />
                                <span className={"ml-2"}>Lists</span>
                            </button>
                        ),
                    },
                    {
                        key: '4',
                        label: (
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal('Section04', index)}
                            >
                                <PlusOutlined />
                                <span className={"ml-2"}>Section</span>
                            </button>
                        ),
                    },
                ],
            }}
            placement="bottomRight"
        >
            <Button>
                Add section
                <PlusCircleOutlined />
            </Button>
        </Dropdown>
    );

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewText(topSection[index].value);
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        if (editIndex >= 0) {
            const updatedSections = [...topSection];
            updatedSections[editIndex] = {
                ...updatedSections[editIndex],
                value: newText,
            };
            setTopSection(updatedSections);
            setNewText('');
            setIsModalOpen(false);
            setEditIndex(-1);
        }
    };

    return (
        <div className="flex sm:ml-[10%] sm:overflow-y-hidden sm:flex-row flex-col sm:gap-10 m-7 ml-5 mr-7">
            <Modal
                title="Edit Text"
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
                    placeholder="Edited text"
                />
            </Modal>
            <div className="sm:w-[25%] flex flex-col gap-2">
                <div className="flex sm:mx-3 flex-row justify-between">
                    <p className="text-xl font-roboto font-bold">Edit profile</p>
                    <div className={"flex flex-row gap-5"}>
                        <p className="text-blue-600 my-auto">Save</p>
                    </div>
                    {
                        sections.length == 0 ? addSectionButton(1) : <Button className={`${addsec ? "border border-blue-500" : null}`} onClick={() => setaddsec(!addsec)}>
                            Add Section
                        </Button>
                    }

                </div>
                <div className="w-full flex flex-col gap-2 items-center">
                    <ImageUpload />
                </div>
                <div className={" leading-3"}>
                    {topSection.map((section, index) => (
                        <div key={index} className="flex justify-between flex-row group">
                            <div className="flex flex-col">
                                <p className={`font-ubuntu my-auto leading-2w ${section.name === "name" ? "font-bold text-xl" : ""} ${section.name === "username" ? "" : ""}`}>
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sm:w-[50%] flex-wrap sm:my-5 mt-3 flex flex-col gap-4">
                {sections.map((section, index) => {
                    const SectionComponent = sectionComponents[section.type];
                    return (
                        <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
                            <>
                                <SectionComponent
                                    SectionTitle={section.title}
                                    sample={section.sample}
                                    deleteSection={() => deleteSection(index)}
                                />
                                {addsec && <div className={"w-full flex flex-row justify-center mt-3"}>{addSectionButton(index)}</div>}
                            </>
                            {/* )} */}
                        </div>
                    );
                })}
            </div>
            <div>
                <Modal
                    title="Add Section Title"
                    open={open}
                    onOk={handleAddSection}
                    onCancel={closeModal}
                    okText="Add Section"
                    cancelText="Cancel"
                >
                    <Input
                        type="text"
                        value={newSectionTitle}
                        onChange={handleInputChange}
                        placeholder="Enter section title"
                        className="border p-2 w-full mb-4"
                    />
                </Modal>
            </div>
        </div>
    );
};

export default EditPage;
