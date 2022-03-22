/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveLanguage } from 'react-localize-redux';
import DrawerContainer from './DrawerContainer';

import { AppState } from '../Stores/rootReducer';

//COMPONENTS
import Home from './Home';
import Managament from './Administrative/Managament';

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
import { getClassrooms, getStudents, getSubject, GetTeachers } from '../Stores/Classroom/actions';

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
}

const App: React.FC = () => {
    const dispatch = useDispatch();

    const { currentLanguageCode } = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
            currentLanguageCode: getActiveLanguage(state.localize).code,
        };
    });

    useEffect(() => {
        dispatch(getStudents());
        dispatch(GetTeachers());
        dispatch(getSubject());
        dispatch(getClassrooms());
    }, [dispatch]);

    return (
        <LocalizationProvider language={currentLanguageCode}>
            <IntlProvider locale={currentLanguageCode}>
                <>
                    <>
                        <BrowserRouter>
                            <DrawerContainer>
                                <Routes>
                                    <Route path="/*" element={<Home />} />
                                    <Route path="/AddPerson" element={<Managament />} />
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
