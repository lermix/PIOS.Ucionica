import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { Drawer, DrawerContent, DrawerItem, DrawerItemProps, DrawerSelectEvent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import '../Styles/drawerStyle.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../Stores/Security/actions';

const items = [
    { text: 'Timetable', selected: true, icon: 'k-icon k-i-share', desc: 'Prikaz', route: '/' },
    { separator: true },
    { text: 'Managament', selected: true, icon: 'k-icon k-i-share', desc: '', route: '/Managament' },
    { separator: true },
    { text: 'Timetable builder', selected: true, icon: 'k-i-module-manager', route: '/TimetableBuilder' },
    { separator: true },
    { text: 'Exam builder', selected: true, icon: 'k-i-module-manager', route: '/ExamBuilder' },
    { separator: true },
    { text: 'Settings', icon: 'k-i-gear', desc: '', route: '/Settings' },
    { separator: true },
];

const CustomItem = (props: DrawerItemProps) => {
    return (
        <DrawerItem {...props}>
            {props.selected ? <span className={'k-icon iconAlign spin ' + props.icon} /> : <span className={'k-icon iconAlign ' + props.icon} />}
            <div className="item-descr-wrap">
                <div>{props.text}</div>
                <span className="item-descr">{props.desc}</span>
            </div>
        </DrawerItem>
    );
};

interface MyProps {
    children?: React.ReactNode;
}

const DrawerContainer: React.FC<MyProps> = ({ children }) => {
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const onSelect = (e: DrawerSelectEvent) => {
        navigate(e.itemTarget.props.route);
    };

    const setSelectedItem = (pathName: string | undefined) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentPath: any = items.find((item) => item.route === pathName);
        if (currentPath.text) {
            return currentPath.text;
        }
    };

    const selected = setSelectedItem(location.pathname);

    return (
        <div>
            <div className="custom-toolbar">
                <Button icon="menu" look="flat" onClick={handleClick} />
                <span className="title">Process visualizer</span>
                <Button onClick={dispatch(logOut)} look="flat" style={{ float: 'right', marginRight: 20 }}>
                    Logout
                </Button>
            </div>
            <Drawer
                expanded={expanded}
                mode="push"
                mini={true}
                width={175}
                items={items.map((item) => ({ ...item, selected: item.text === selected }))}
                item={CustomItem}
                onSelect={onSelect}
            >
                <DrawerContent style={{ width: '100%' }}>{children}</DrawerContent>
            </Drawer>
        </div>
    );
};

export default DrawerContainer;
