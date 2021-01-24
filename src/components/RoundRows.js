import React,{useContext} from 'react';
import {AuthContext} from '../App';

const RoundRows = () => {
    const ls = window.localStorage;

    //const {isWin}=useContext(AuthContext); //TODO: below should be isWin but is not working. For now is a testing value: testIsWin declared on GameArea line 13.

    const handleResult = (testIsWin,bet) => {
        if(testIsWin===null){
            return 'Draw'
        } else if(!testIsWin){
            return `Player lose ${bet}`
        } else if(testIsWin){
            return `Player win ${bet*0.5}`
        }
    };

    return(
        <>
            {
                JSON.parse(ls.getItem('roundsHistory'))?.map( e => 
                <strong key={Math.random().toString(16)} className='row'>Round-{e.round}<br></br>  Player: {e.playerCards.map(v=>`${v} `.toLowerCase())} vs Croupier  {e.croupierCards?.map(v=>`${v} `.toLowerCase())} <br></br> {handleResult(e.isWin,e.bet)} </strong>)
            }
        </>
    )
};

export default RoundRows;