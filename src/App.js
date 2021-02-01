import React,{useState, createContext} from 'react';
import BjHeader from './components/BjHeader';
import GameArea from './components/GameArea';
import ScoresNRoundsBox from './components/ScoresNRoundsBox';
export const AuthContext = createContext(null); 

function App() {
  const ls = window.localStorage;

  //STARTING CASH:
  if(ls.getItem('leftCash')===null){
    ls.setItem('leftCash',1000)
  }

  const [leftCash,setLeftCash]=useState(JSON.parse(ls.getItem('leftCash')) || 1000);
  const [bet,setBet]=useState(JSON.parse(ls.getItem('bet')));
  const [isPlay,setIsPlay]=useState(JSON.parse(ls.getItem('isPlay')));
  const [round,setRound]=useState(JSON.parse(ls.getItem('rounds')));
  const [doubleDown, setDoubleDown]=useState(JSON.parse(ls.getItem('doubleDown')));
  const [isWin,setIsWin]=useState(JSON.parse(ls.getItem('isWin')) || ls.setItem('isWin',JSON.stringify(null)));
  const [isScoreReset,setIsScoreReset]=useState(false);
  const [rerender,setRerender]=useState(false);

  return (
    <AuthContext.Provider 
    value={{leftCash, setLeftCash, bet, setBet, isPlay, setIsPlay, round, setRound, doubleDown, setDoubleDown, isWin, setIsWin, isScoreReset, setIsScoreReset, rerender, setRerender}}>
      <div className="App">
        <BjHeader/>
        <div className='gameContainer'>
          <GameArea/>
          <ScoresNRoundsBox/>
        </div>
      </div>
    </AuthContext.Provider>      
  );
}

export default App;