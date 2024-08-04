import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
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
    const [newSectionType, setNewSectionType] = useState('');
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [name, setName] = useState("Alloson");
    const [userName, setUserName] = useState("alloson7732r");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [newText, setNewText] = useState('');

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

    const openModal = (type) => {
        setNewSectionTitle("");
        setNewSectionType(type);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setNewSectionType('');
        setNewSectionTitle('');
    };

    const handleInputChange = (e) => {
        setNewSectionTitle(e.target.value);
    };

    const handleAddSection = () => {
        if (newSectionTitle.trim()) {
            const newSection = { title: newSectionTitle, sample: true, type: newSectionType };
            const updatedSections = [...sections];
            const insertIndex = updatedSections.findIndex(section => section.type === newSectionType);
            updatedSections.splice(insertIndex + 1, 0, newSection);
            setSections(updatedSections);
            setOpen(false);
            // Scroll to the new section
            setTimeout(() => {
                sectionRefs.current[sections.length].scrollIntoView({ behavior: 'smooth' });
            }, 0);
        }
    };

    const deleteSection = (index) => {
        const newSections = sections.filter((_, i) => i !== index);
        setSections(newSections);
    };

    const addSectionButton = (type, buttonText) => (
        <Button
            className="flex items-center  justify-end mt-2 mb-4"
            onClick={() => openModal(type)}
        >
            <PlusCircleOutlined />
            <span className="ml-2 first-letter:uppercase ">Add {buttonText}</span>
        </Button>
    );

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewText(sections[index].value);
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

    const handle_Delete = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setTopSection(updatedSections);
    };

    const renderSectionsByType = (type) => {
        return sections.filter(section => section.type === type).map((section, index) => {
            const SectionComponent = sectionComponents[section.type];
            return (
                <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
                    <SectionComponent
                        SectionTitle={section.title}
                        sample={section.sample}
                        deleteSection={() => deleteSection(index)}
                    />
                </div>
            );
        });
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
                </div>
                <div className="w-full flex flex-col gap-2 items-center">
                    <ImageUpload />
                </div>
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
                            <button
                                className="px-2 py-1 text-slate-400 rounded hover:text-slate-600 mr-2"
                                onClick={() => handle_Delete(index)}
                            >
                                <BiTrash />
                            </button>
                        </div>
                    </div>
                ))}
                {['Section01'].map(type => (
                    <div key={type}>
                        {renderSectionsByType(type)}
                        <div className={"flex flex-row justify-start"}>
                            {addSectionButton(type, sections.find(section => section.type === type).buttonText)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="sm:w-[50%] flex-wrap my-5 flex flex-col gap-3">
                {['Section02', 'Section03', 'Section04'].map(type => (
                    <div key={type}>
                        {renderSectionsByType(type)}
                        <div className={"flex flex-row justify-start"}>
                            {addSectionButton(type, sections.find(section => section.type === type).buttonText)}
                        </div>
                    </div>
                ))}
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
