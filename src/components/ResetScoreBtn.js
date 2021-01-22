import React,{useContext} from 'react';
import {AuthContext} from '../App';

const ResetScoreBtn = () => {
    const {setIsScoreReset}=useContext(AuthContext);

    const ls = window.localStorage;

    const resetHistory = () => {
        ls.removeItem('scoresHistory');
        setIsScoreReset(true);
    };

    return (
        <button onClick={resetHistory} className='resetHistoryBtn'>Reset Score History</button>
    )
};

export default ResetScoreBtn;