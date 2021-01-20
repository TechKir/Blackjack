import BjHeader from './components/BjHeader';
import GameArea from './components/GameArea';
import ScoresNRoundsBox from './components/ScoresNRoundsBox';

function App() {
  return (
    <div className="App">
      <BjHeader/>
      <div className='gameContainer'>
        <GameArea/>
        <ScoresNRoundsBox/>
      </div>
    </div>
  );
}

export default App;