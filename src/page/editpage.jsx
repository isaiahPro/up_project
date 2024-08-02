import { Typography } from "antd";
import { useState } from "react";
import Subject from "../components/ApproverdSubject";
import MyComponent from "../components/detail";
import Education from "../components/education";
import Hoobies from "../components/hoobies";
import ImageUpload from "../components/ImageUpload";
const { Paragraph } = Typography;
const EditPage = () => {
    const [name, setName] = useState("Alloson");
    const [userName, setUserName] = useState("alloson7732r");
    const [bioText, setbioText] = useState("frestristic dremar restristic dremarrestristic dremarrestristic dremar")
    const [sections, setsections] = useState([
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
        {
            name: "bio",
            title: "Bio",
            value: bioText,
            setValue: setbioText,

        },
    ])

    return (
        <div className={"flex sm:max-h-[100vh] sm:overflow-y-hidden sm:flex-row flex-col sm:gap-10 m-7 ml-5 mr-7 sm:mx-10"}>
            <div className={"sm:w-[20%] flex flex-col gap-2"}>
                <div className={"flex sm:mx-3 flex-row justify-between"}>
                    <p className={"text-xl font-roboto font-bold"}>Edit profile</p>
                    <p className={"text-blue-600 my-auto"}>Save</p>
                </div>
                <div className={"mx-auto flex flex-col gap-2"}>
                    <ImageUpload />
                </div>
                <div>
                    {
                        sections.map((section, index) => {
                            return (
                                <div key={index}>
                                    {section.title !== null && <p className={"text-xl font-bold font-ubuntu"}>{section.title}</p>}
                                    <Paragraph
                                        className={`font-ubuntu my-auto leading-2w ${section.name === "name" ? "font-bold text-xl" : ""} ${section.name === "username" ? "-mt-5" : ""}`}
                                        editable={{
                                            // icon: <BiEditAlt size={10} className={"border rounded-full p-1 mt-2 "} />,
                                            onChange: section.setValue,
                                        }}
                                    >
                                        {section.value}
                                    </Paragraph>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className={"flex leading-3 ml-3 mt-2 flex-col justify-left"}>
                    <Paragraph
                        className={"text-xl font-bold font-ubuntu"}
                        editable={{
                            onChange: setName,
                        }}
                    >
                        {name}
                    </Paragraph>
                    <Paragraph
                        className={"font-ubuntu "}
                        editable={{
                            onChange: setUserName,
                        }}
                    >
                        {userName}
                    </Paragraph>
                </div>
                <div className={" flex sm:ml-3 flex-col"}>
                    <p className={"text-xl font-bold font-ubuntu"}>Bio</p>
                    <Paragraph
                        className={"font-ubuntu my-auto leading-2ww"}
                        editable={{
                            icon: <BiEditAlt size={23} className={"border rounded-full p-1 my "} />,
                            onChange: setbioText,
                        }}
                    >
                        {bioText}
                    </Paragraph>

                </div> */}


            </div>



            <div className={"sm:w-[35%] flex-wrap sm:h-[100vh] my-5 flex flex-col gap-3"}>
                <MyComponent />
                <Subject />
                <Hoobies />
                <Education />
            </div>
        </div>
    )
}

export default EditPage