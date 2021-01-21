import React,{useContext} from 'react';
import ActionBtn from './ActionBtn';
import GameHeader from './GameHeader';
import {AuthContext} from './GameArea';

const PlayerInfoBox = () => {

    const {isPlay, leftCash, round, bet, doubleDown, handleDoubleDown, handleStand }=useContext(AuthContext);

    return(
        <div className='playerInfoBox'>
            <GameHeader title='You'/>
            <div className='actionBtnBox'>
                {isPlay ? <ActionBtn kindOfAction='Hit'/> : null}
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
}

export default PlayerInfoBox;