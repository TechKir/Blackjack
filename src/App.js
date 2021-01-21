import React,{useState,useEffect} from 'react';
import BjHeader from './components/BjHeader';
import GameArea from './components/GameArea';
import ScoresNRoundsBox from './components/ScoresNRoundsBox';

function App() {

  // window.beforeunload = () => ' ';
  // useEffect(() => {
  //   window.onbeforeunload = confirmExit;
  //   function confirmExit()
  //   {
  //     return "show warning";
  //   }
  // }, []);

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