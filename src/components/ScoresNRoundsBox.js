import ScoresContainer from './ScoresContainer';
import RoundsContainer from './RoundsContainer';

const ScoresNRoundsBox = () => {
    return (
        <div className='scoresNRoundsBox'>
            <RoundsContainer/>
            <ScoresContainer/>
        </div>
    )
};

export default ScoresNRoundsBox;