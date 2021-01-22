import React,{useContext} from 'react';
import ActionBtn from './ActionBtn';
import GameHeader from './GameHeader';
import {AuthContext} from '../App';

const PlayerInfoBox = ({handleDoubleDown, handleStand, handleHit}) => {

    const {isPlay, leftCash, round, bet, doubleDown }=useContext(AuthContext);

    return(
        <div className='playerInfoBox'>
            <GameHeader title='You'/>
            <div className='actionBtnBox'>
                {isPlay ? <ActionBtn kindOfAction='Hit' handleHit={handleHit}/> : null}
                {isPlay ? <ActionBtn kindOfAction='Stand' handleStand={handleStand}/> :null}
                {doubleDown ? <ActionBtn kindOfAction='Double Down' handleDoubleDown={handleDoubleDown}/> : null}
            </div>
            <div className='infosBox'>
                <strong>Left cash: {leftCash} $</strong>
                <strong>Round: {round}</strong>
                <strong>Your bet: {bet}</strong>    
            </div> 
        </div>
    )
};

export default PlayerInfoBox;