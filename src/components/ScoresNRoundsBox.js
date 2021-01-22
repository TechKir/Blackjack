import GameHeader from './GameHeader';
import RoundRows from './RoundRows';
import ScoreRows from './ScoreRows';
import ResetScoreBtn from './ResetScoreBtn';

const ScoresNRoundsBox = () => {
    return (
        <div className='scoresNRoundsBox'>
            <div className='roundContainer'>
                <GameHeader title='Rounds'/>
                <RoundRows/>
            </div>
            <div className='scoresContainer'>
                <GameHeader title='Scores'/>
                <ScoreRows/>       
                <ResetScoreBtn/>
            </div>
        </div>
    )
};

export default ScoresNRoundsBox; 