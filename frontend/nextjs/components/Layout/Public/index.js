
import React from 'react';
import './index.less';

import Sider from '../../Sider';
import Header from '../../Header/Private';
import Footer from '../../Footer/Private';

import { Layout } from 'antd';
const { Content } = Layout;

export default ({ children }) => {
    return (
        <Layout>
            <Sider />
            <Layout style={{ marginLeft: 200 }}>
                <Header />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {children}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    )
};


