import ActionBtn from './ActionBtn';
import GameHeader from './GameHeader';

const PlayerInfoBox = () => {
    return(
        <div className='playerInfoBox'>
            <GameHeader title='You'/>
            <div className='actionBtnBox'>
                <ActionBtn kindOfAction='Hit'/>
                <ActionBtn kindOfAction='Stand'/>
                <ActionBtn kindOfAction='Double Down'/>
            </div>
            <div className='infosBox'>
                <strong>Left cash:</strong>
                <strong>Round:</strong>
                <strong>Your bet:</strong>    
            </div> 
        </div>
    )
}

export default PlayerInfoBox;