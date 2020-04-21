
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

const menus = [
    { name: 'dashboard', icon: 'user', path: '/dashboard' },
    { name: 'market', icon: 'user', path: '/market' },
    { name: 'ranking', icon: 'user', path: '/ranking' },
]

export default () => {

    const router = useRouter();

    // change to useSWR later
    // fetch from db
    const [defaultPath] = menus;

    const [currentPath, setCurrentPath] = useState(router.pathname || defaultPath.path);

    const handlePathChange = e => {
        setCurrentPath(e.key);
        router.push(e.key)
    }

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[currentPath]}
                onSelect={handlePathChange}
            >
                {menus.map(({ name, icon, path }) => (
                    <Menu.Item key={path}>
                        <Icon type={icon} />
                        <span className="nav-text">{name}</span>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    )
};


