/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveLanguage } from 'react-localize-redux';
import DrawerContainer from './DrawerContainer';

import { AppState } from '../Stores/rootReducer';

//COMPONENTS
import Home from './Home';
import Managament from './Administrative/Managament/Managament';

// kendo globaliztion
import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
// croatian
import hrNumbers from 'cldr-numbers-full/main/hr/numbers.json';
import hrLocalCurrency from 'cldr-numbers-full/main/hr/currencies.json';
import hrCaGregorian from 'cldr-dates-full/main/hr/ca-gregorian.json';
import hrDateFields from 'cldr-dates-full/main/hr/dateFields.json';
import kendoMessagesHR from './../localization/kendoMessagesLocalization/kendoMessages_hr-HR.json';
// english
import enNumbers from 'cldr-numbers-full/main/en-GB/numbers.json';
import enLocalCurrency from 'cldr-numbers-full/main/en-GB/currencies.json';
import enCaGregorian from 'cldr-dates-full/main/en-GB/ca-gregorian.json';
import enDateFields from 'cldr-dates-full/main/en-GB/dateFields.json';
import kendoMessagesEN from './../localization/kendoMessagesLocalization/kendoMessages_en-GB.json';
import { getClassrooms, getExams, GetQuestions, getStudents, getSubject, GetTeachers } from '../Stores/Classroom/actions';
import TimetableBuilder from './Administrative/TimetableBuilder';
import { setTokenIfExists } from '../Stores/Security/actions';
import { VerifiedUser } from '../Models/User';
import Login from './Shared/Login';
import ExamBuilder from './Administrative/Exam/ExamBuilder';
import ExamViewer from './Administrative/Exam/ExamViewer';
import ExamSolving from './ExamSolving';

load(
    likelySubtags,
    currencyData,
    weekData,
    hrNumbers,
    hrLocalCurrency,
    hrCaGregorian,
    hrDateFields,
    enNumbers,
    enLocalCurrency,
    enCaGregorian,
    enDateFields,
);
loadMessages(kendoMessagesHR, 'HR');
loadMessages(kendoMessagesEN, 'GB');

interface IStateProps {
    currentLanguageCode: string;
    verifiedUser: VerifiedUser;
}

const App: React.FC = () => {
    const dispatch = useDispatch();

    const { currentLanguageCode, verifiedUser } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
            currentLanguageCode: getActiveLanguage(state.localize).code,
            verifiedUser: state.security.verifiedUser,
        };
    });

    const [userLogedIn, setUserLogedIn] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getStudents());
        dispatch(GetTeachers());
        dispatch(getSubject());
        dispatch(getClassrooms());
        dispatch(getExams());
        dispatch(GetQuestions());
        dispatch(setTokenIfExists());
    }, [dispatch]);

    useEffect(() => {
        if (verifiedUser.token) {
            setUserLogedIn(true);
        } else {
            setUserLogedIn(false);
        }
    }, [verifiedUser, userLogedIn]);

    return (
        <LocalizationProvider language={currentLanguageCode}>
            <IntlProvider locale={currentLanguageCode}>
                <>
                    <>
                        <BrowserRouter>
                            <DrawerContainer>
                                <Routes>
                                    {!userLogedIn && <Route path="/*" element={<Login />} />}
                                    {userLogedIn && (
                                        <>
                                            <Route path="/*" element={<Home />} />
                                            <Route path="/Managament" element={<Managament />} />
                                            <Route path="/TimetableBuilder" element={<TimetableBuilder />} />
                                            <Route path="/ExamBuilder" element={<ExamBuilder />} />
                                            <Route path="/Exams" element={<ExamSolving />} />
                                        </>
                                    )}
                                </Routes>
                            </DrawerContainer>{' '}
                        </BrowserRouter>
                    </>
                </>
            </IntlProvider>
        </LocalizationProvider>
    );
};

export default App;
