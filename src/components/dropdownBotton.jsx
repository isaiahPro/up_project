import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';

// eslint-disable-next-line react/prop-types
const Dropdown_Button = ({ openModal }) => {
    const items = [
        {
            key: '1',
            label: (
                <Button
                    className="flex items-center justify-end mt-2 mb-4"
                    onClick={() => openModal("section03")}
                >
                    <PlusCircleOutlined />
                    <span className="ml-2 first-letter:uppercase">Add Tags</span>
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button
                    className="flex items-center justify-end mt-2 mb-4"
                    onClick={() => openModal("section01")}
                >
                    <PlusCircleOutlined />
                    <span className="ml-2 first-letter:uppercase">Add Text</span>
                </Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button
                    className="flex items-center justify-end mt-2 mb-4"
                    onClick={() => openModal("section02")}
                >
                    <PlusCircleOutlined />
                    <span className="ml-2 first-letter:uppercase">Add list</span>
                </Button>
            ),
        },
        {
            key: '4',
            label: (
                <Button
                    className="flex items-center justify-end mt-2 mb-4"
                    onClick={() => openModal("section04")}
                >
                    <PlusCircleOutlined />
                    <span className="ml-2 first-letter:uppercase">Add section</span>
                </Button>
            ),
        },
    ];

    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown
                    overlay={<Menu items={items} />}
                    placement="bottomLeft"
                >
                    <Button>bottomLeft</Button>
                </Dropdown>
            </Space>
        </Space>
    );
};

export default Dropdown_Button;