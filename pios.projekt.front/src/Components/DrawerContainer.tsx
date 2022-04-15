import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { Drawer, DrawerContent, DrawerItem, DrawerItemProps, DrawerSelectEvent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import '../Styles/drawerStyle.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Stores/Security/actions';
import { Exam } from '../Models/Exam';
import { AppState } from '../Stores/rootReducer';
import { VerifiedUser } from '../Models/User';
import { isSameDate } from '../Helper/DateAnalyzer';

const items = [
    { text: 'Timetable', selected: true, icon: 'k-icon k-i-calendar', desc: 'Prikaz', route: '/' },
    { separator: true },
    { text: 'Managament', selected: true, icon: 'k-icon k-i-gears', desc: '', route: '/Managament' },
    { separator: true },
    { text: 'Timetable builder', selected: true, icon: 'k-i-module-manager', route: '/TimetableBuilder' },
    { separator: true },
    { text: 'Exam builder', selected: true, icon: 'k-icon k-i-wrench', route: '/ExamBuilder' },
    { separator: true },
    { text: 'Exams', icon: 'k-icon k-i-table-align-top-left', desc: '', route: '/Exams' },
    { separator: true },
    { text: 'Exams results', icon: 'k-icon k-i-spell-checker', desc: '', route: '/ExamsResults' },
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

interface IStateProps {
    exams: Exam[];
    verifiedUser: VerifiedUser;
}

const DrawerContainer: React.FC<MyProps> = ({ children }) => {
    const dispatch = useDispatch();
    const { exams, verifiedUser } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            exams: state.classroom.exams,
            verifiedUser: state.security.verifiedUser,
        };
    });

    const [expanded, setExpanded] = useState(true);
    const [itemState, setItemState] = useState<any[]>(items);

    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getitems();
    }, [verifiedUser, location]);

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

    const getitems = () => {
        if (!verifiedUser.roles?.includes('Admin')) {
            setItemState(
                items
                    .filter((e) => e.text !== 'Managament' && e.text !== 'Timetable builder' && e.text !== 'Exam builder')
                    .map((item) => ({ ...item, selected: item.text === selected })),
            );
            if (verifiedUser.roles?.includes('Teacher'))
                setItemState(
                    items.filter((e) => e.text !== 'Managament' && e.text !== 'Exams').map((item) => ({ ...item, selected: item.text === selected })),
                );
        } else setItemState(items.map((item) => ({ ...item, selected: item.text === selected })));
    };

    return (
        <div>
            <div className="custom-toolbar">
                <Button icon="menu" look="flat" onClick={handleClick} />
                <span className="title">
                    E-Classroom {new Date().getDate()}.{new Date().getMonth()}.{new Date().getFullYear()}
                </span>

                <Button onClick={() => dispatch(logOut())} look="flat" style={{ float: 'right', marginRight: 20 }}>
                    LOGOUT
                </Button>
                <span style={{ color: 'darkblue', float: 'right', marginRight: 20, marginTop: 10 }}>User: {verifiedUser.username}</span>
                {exams.find((e) => isSameDate(new Date(e.date), new Date()) && e.students.find((s) => s.id === verifiedUser.id)) &&
                    verifiedUser.roles?.includes('Student') && (
                        <span style={{ color: 'red', float: 'right', marginRight: 20, marginTop: 10 }}>EXAM</span>
                    )}
            </div>
            <Drawer expanded={expanded} mode="push" mini={true} width={175} items={itemState} item={CustomItem} onSelect={onSelect}>
                <DrawerContent style={{ width: '100%' }}>{children}</DrawerContent>
            </Drawer>
        </div>
    );
};

export default DrawerContainer;
