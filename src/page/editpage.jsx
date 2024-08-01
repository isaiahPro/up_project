import { Typography } from "antd";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import MyComponent from "../components/detail";
import Education from "../components/education";
import Hoobies from "../components/hoobies";
import ImageUpload from "../components/ImageUpload";
const { Paragraph } = Typography;
const EditPage = () => {
    const [name, setName] = useState("Alloson");
    const [userName, setUserName] = useState("alloson7732r");
    const [bioText, setbioText] = useState("frestristic dremar restristic dremarrestristic dremarrestristic dremar")

    return (
        <div className={"flex sm:max-h-[100vh] sm:overflow-y-hidden sm:flex-row flex-col sm:gap-10 m-7 sm:mx-10"}>
            <div className={"sm:w-[20%] flex flex-col gap-2"}>
                <div className={"flex sm:mx-3 flex-row justify-between"}>
                    <p className={"text-xl font-roboto font-bold"}>Edit profile</p>
                    <p className={"text-blue-600 my-auto"}>Save</p>
                </div>
                <div className={"mx-auto flex flex-col gap-2"}>
                    <ImageUpload />
                </div>
                <div className={"flex leading-3 ml-3 mt-2 flex-col justify-left"}>
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
                <div className={" flex ml-3 flex-col"}>
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

                </div>


            </div>
            <div className={"sm:w-[35%] flex-wrap sm:h-[100vh] my-5 flex flex-col gap-3"}>
                <MyComponent />
                <Hoobies />
                <Education />
            </div>
        </div>
    )
}

export default EditPage
