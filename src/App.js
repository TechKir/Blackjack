import React,{useState,createContext} from 'react';
import BjHeader from './components/BjHeader';
import GameArea from './components/GameArea';
import ScoresNRoundsBox from './components/ScoresNRoundsBox';
export const AuthContext = createContext(null); 

function App() {
  
  const [leftCash,setLeftCash]=useState(null);
  const [bet,setBet]=useState(null);
  const [isPlay,setIsPlay]=useState(false);
  const [round,setRound]=useState(0);
  const [doubleDown, setDoubleDown]=useState(false);
  const [isWin,setIsWin]=useState(null);
  const [isScoreReset,setIsScoreReset]=useState(false);

  // window.beforeunload = () => ' ';
  // useEffect(() => {
  //   window.onbeforeunload = confirmExit;
  //   function confirmExit()
  //   {
  //     return "show warning";
  //   }
  // }, []);

  return (
    <AuthContext.Provider 
    value={{leftCash, setLeftCash, bet, setBet, isPlay, setIsPlay, round, setRound, doubleDown, setDoubleDown, isWin, setIsWin, isScoreReset, setIsScoreReset}}>
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