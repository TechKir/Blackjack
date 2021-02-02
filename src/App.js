/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect, createContext} from 'react';
import BjHeader from './components/BjHeader';
import GameArea from './components/GameArea';
import classnames from 'classnames';
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

  //Mobile - ask user to rotate phone to horizontal position:
  const orientation = window.screen.orientation;
  const [isVisible,setIsVisible]=useState(true);

  useEffect(()=>{
    if(orientation.type==="portrait-primary"){
      setIsVisible(false);
    }
  },[])

  window.addEventListener('orientationchange', ()=>{
    if(orientation.type==="portrait-primary"){
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <AuthContext.Provider 
    value={{leftCash, setLeftCash, bet, setBet, isPlay, setIsPlay, round, setRound, doubleDown, setDoubleDown, isWin, setIsWin, isScoreReset, setIsScoreReset, rerender, setRerender}}>
      <div className={classnames('App', { inVisible: !isVisible })}>
        <BjHeader/>
        <div className='gameContainer'>
          <GameArea/>
          <ScoresNRoundsBox/>
        </div>
      </div>
      <div className={classnames('attribution', { inVisible: isVisible })}>Phone and cursor icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>, Card favicon made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </AuthContext.Provider>      
  );
}

export default App;