/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getTranslate, TranslateFunction } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Stores/rootReducer';
import Timetable from './Timetable';

interface IStateProps {
    translate: TranslateFunction;
}

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { translate } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
        return {
            translate: getTranslate(state.localize),
        };
    });

    return (
        <>
            <Timetable />
        </>
    );
};

export default Home;
