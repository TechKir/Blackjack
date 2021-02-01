//import React,{useContext} from 'react';
//import {AuthContext} from '../App';

const RoundRows = () => {
    const ls = window.localStorage;

    //const {isWin}=useContext(AuthContext); //TODO: below should be isWin but is not working. For now is a testing value: testIsWin declared on GameArea line 13.

    const handleResult = (testIsWin,bet) => {
        if(testIsWin===null){
            return 'draw'
        } else if(!testIsWin){
            return `player lose ${bet}`
        } else if(testIsWin){
            return `player win ${bet*0.5}`
        }
    };

    return(
        <>
            {
                JSON.parse(ls.getItem('roundsHistory'))?.map( e => 
                <strong key={Math.random().toString(16)} className='row'>Round-{e.round}: {handleResult(e.isWin,e.bet)}<br></br> Player: {e.playerCards.join(', ').toLowerCase()} <br/> Croupier: {e.croupierCards?.join(', ').toLowerCase()}</strong>)
            }
        </>
    )
};

export default RoundRows;