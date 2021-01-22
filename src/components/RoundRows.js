import React,{useContext} from 'react';
import {AuthContext} from '../App';

const RoundRows = () => {
    const ls = window.localStorage;

    const {isWin}=useContext(AuthContext);

    const handleResult = (isWin,bet) => {
        if(isWin===null){
            return 'Draw'
        } else if(!isWin){
            return `Player lose ${bet}`
        } else if(isWin){
            return `Player win ${bet*0.5}`
        }
    };

    return(
        <>
            {
                JSON.parse(ls.getItem('roundsHistory'))?.map( e => 
                <strong key={Math.random().toString(16)} className='row'>Round-{e.round}<br></br>  Player: {e.playerCards.map(v=>`${v} `)} VS Croupier  {e.croupierCards?.map(v=>`${v} `)} <br></br> {handleResult(isWin,e.bet)} </strong>)
            }
        </>
    )
};

export default RoundRows;