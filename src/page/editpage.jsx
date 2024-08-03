import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Modal, Typography } from 'antd';
import { useRef, useState } from 'react';
import Section03 from "../components/ApproverdSubject";
import Section02 from "../components/detail";
import Section04 from "../components/education";
import ImageUpload from "../components/ImageUpload";
import Section01 from "../components/personalDetail";

const { Paragraph } = Typography;

const EditPage = () => {
    const [sections, setSections] = useState([
        { title: "Bio", sample: false, type: "Section01" },
        { title: "Details", sample: false, type: "Section02" },
        { title: "Subjects", sample: false, type: "Section03" },
        { title: "Educations", sample: false, type: "Section04" }
    ]);
    const [open, setOpen] = useState(false);
    const [newSectionType, setNewSectionType] = useState('');
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [name, setName] = useState("Alloson");
    const [userName, setUserName] = useState("alloson7732r");

    const sectionRefs = useRef([]);
    const topSection = useState([
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
            setSections([...sections, newSection]);
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

    const items = [
        {
            key: '1',
            label: (
                <button
                    className="block w-full gap-2 text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal('Section01')}
                >
                    <PlusOutlined />
                    <span className={"ml-2"}>Section 1</span>
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal('Section02')}
                >
                    <PlusOutlined />
                    <span className={"ml-2"}>Section 2</span>
                </button>
            ),
        },
        {
            key: '3',
            label: (
                <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal('Section03')}
                >
                    <PlusOutlined />
                    <span className={"ml-2"}>Section 3</span>
                </button>
            ),
        },
        {
            key: '4',
            label: (
                <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal('Section04')}
                >
                    <PlusOutlined />
                    <span className={"ml-2"}>Section 4</span>
                </button>
            ),
        },
    ];

    return (
        <div className="flex sm:ml-[10%]  sm:overflow-y-hidden sm:flex-row flex-col sm:gap-10 m-7 ml-5 mr-7">
            <div className="sm:w-[25%] flex flex-col gap-2">
                <div className="flex sm:mx-3 flex-row justify-between">
                    <p className="text-xl font-roboto font-bold">Edit profile</p>
                    <div className={"flex flex-row gap-5"}>
                        <p className="text-blue-600 my-auto">Save</p>
                        <Dropdown
                            className={"my-auto"}
                            menu={{ items }}
                            placement="bottomRight"
                        >
                            <Button>
                                Add section
                                <PlusCircleOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <div className=" w-full flex flex-col gap-2 items-center">
                    <ImageUpload />
                </div>
                {
                    topSection[0].map((topSection, index) => (
                        <div key={index} className="flex justify-between sm:flex-row flex-col">
                            <div className={"flex flex-col"}>
                                {topSection.title !== null && <p className={"text-xl font-bold font-ubuntu"}>{topSection.title}</p>}
                                <Paragraph
                                    className={`font-ubuntu my-auto leading-2w ${topSection.name === "name" ? "font-bold text-xl" : ""} ${topSection.name === "username" ? "-mt-5" : ""}`}
                                    editable={{ onChange: topSection.setValue }}
                                >
                                    {topSection.value}
                                </Paragraph>
                            </div>
                        </div>
                    ))
                }
                {sections.map((section, index) => {
                    if (section.type === "Section01") {
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
                    }
                    return null;
                })}
            </div>
            <div className="sm:w-[50%] flex-wrap my-5 flex flex-col gap-3">
                {sections.map((section, index) => {
                    if (section.type !== "Section01") {
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
                    }
                    return null;
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
