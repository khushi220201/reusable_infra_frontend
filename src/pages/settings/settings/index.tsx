// import { SettingsBody } from 'components/settings'
import { Col, Row } from 'antd';
import SettingsLayout from 'layouts/Settings'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { CloseSvg } from 'utils/svgs';
import styles from './index.module.scss';

export default function Settings() {
    const [selectedSidebar, setSelectedSidebar] = useState<string>('users');

    const navigate = useNavigate()
    console.log(navigate);
    const sideBarChangeHandler = (selectedValue: any) => {
        setSelectedSidebar(selectedValue.key);
        navigate(selectedValue.key)
    };
    useEffect(() => {
        // navigate(`/settings/${selectedSidebar}`)
    }, [selectedSidebar])
    return (<>
        <Row
            className={styles['header']}
            justify={'space-between'}
            align={'middle'}
        >
            <Col>
                <h4
                    className={styles['header--heading']}
                >
                    Settings
                </h4>
            </Col>
            <Col>
                <div
                    className={styles['header--close-icon']}
                    onClick={() => { navigate('/') }}
                >
                    <CloseSvg />
                </div>
            </Col>
        </Row>
        <SettingsLayout
            onSideBarChange={sideBarChangeHandler}
            selectedSidebar={selectedSidebar}
        >
            <Outlet />
        </SettingsLayout>
    </>
    )
}
