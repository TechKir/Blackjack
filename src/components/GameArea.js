import React,{useContext} from 'react';
import GameHeader from './GameHeader';
import PlayerInfoBox from './PlayerInfoBox';
import classnames from 'classnames';
import {AuthContext} from '../App';

const GameArea = () => {

    const ls = window.localStorage;

    const {leftCash, setLeftCash, bet, setBet, isPlay, setIsPlay, round, setRound, setDoubleDown, isWin, setIsWin, setIsScoreReset}=useContext(AuthContext);
    setIsScoreReset(false);
    //Geting decks from api and save them key to local storage - for this usage i put it stiffly -deck key"i4t10vv791d3" valid for 2 weeks.
    // const getDecks = async () => {
    //     await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    //         .then(res => res.json())
    //         .then(data => window.localStorage.setItem('decksKey', JSON.stringify(data.deck_id)))   
    // }
    // getDecks();

    const handlePlay = async () =>{

        ls.removeItem('crupierCards');
        ls.removeItem('playerCards');

        let roundCounter = round;
        roundCounter++;
        if(roundCounter===6){
            //Saving score to scoresHistory and descending:
            let scoresHistory = JSON.parse(ls.getItem('scoresHistory'));
            if(scoresHistory===null){
                scoresHistory=[];
            } else if( typeof scoresHistory==='string'){
                JSON.parse(scoresHistory)
            }

            scoresHistory.push(leftCash);
            scoresHistory.sort((a,b)=> a-b).reverse();
            ls.setItem('scoresHistory',JSON.stringify(scoresHistory));
            console.log(scoresHistory);

            handleRestart();
            return
        };
        let result = window.prompt('What is your bet?'); 
        result=parseInt(result);
        setLeftCash(leftCash-result);
        setRound(roundCounter);
        setBet(result);

        //Resuffle cards:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/shuffle/')
            .catch(err=>{
                window.alert('API FROM https://deckofcardsapi.com/ BROKES... STATUS 500. GAME WILL BE RESTARTED')
                handleRestart();
                window.location.reload();
                handleRestart();
            });

        //Starting cards for crupier:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=2')
            .then(res => res.json())
            .then(data => ls.setItem('crupierCards', JSON.stringify(data.cards)))
            .catch(err=>{
                window.alert('API FROM https://deckofcardsapi.com/ BROKES... STATUS 500. GAME WILL BE RESTARTED')
                handleRestart();
                window.location.reload();
            });
        //Starting cards for player:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=2')
            .then(res => res.json())
            .then(data => ls.setItem('playerCards', JSON.stringify(data.cards)))
            .catch(err=>{
                window.alert('API FROM https://deckofcardsapi.com/ BROKES... STATUS 500. GAME WILL BE RESTARTED')
                handleRestart();
                window.location.reload();
            });
        setIsPlay(true);
        setDoubleDown(true);

        ls.setItem('leftCash',leftCash-result);
        ls.setItem('rounds',roundCounter);
    }

    const handleRestart = () => {

        setLeftCash(1000);
        setRound(0);
        setBet(null);        
        setIsPlay(false);
        setDoubleDown(false);

        //Save scores history before ls clear:
        let scoresHistory = JSON.parse(ls.getItem('scoresHistory'));
        if(scoresHistory===null){
            scoresHistory=[];
        } else if( typeof scoresHistory==='string'){
            JSON.parse(scoresHistory);
        };
        ls.clear();

        ls.setItem('leftCash',1000);
        ls.setItem('rounds',0);
        ls.setItem('scoresHistory',JSON.stringify(scoresHistory));
    }

    const handleDoubleDown = () => {
        setBet(bet*2);
        setLeftCash(leftCash-bet);
        setDoubleDown(false);
    }
    
    const handleStand = async () =>{
   
        const countValues = (playerOrCroupierCards) => {
            //First we push each cards without AS and sort array. It is necessery to set AS value:
            let valuesArray = [];
            const cardsWitoutAS = [];
            const cards = JSON.parse(ls.getItem(playerOrCroupierCards));

            cards.forEach( element => {
                if(element.value==='ACE'){
                    //DO NOTHING
                } else if( element.value==='KING'|| element.value==='QUEEN' || element.value==='JACK'){
                    cardsWitoutAS.push(10);
                } else {
                    cardsWitoutAS.push(parseInt(element.value));
                };
            });

            const sortedCards = cardsWitoutAS.sort((a, b) => a - b);
            sortedCards.forEach( element => valuesArray.push(element));
            //If array is empty we want to result be 0
            const firstSumming = sortedCards.length>0 ? sortedCards.reduce((prev, curr) => prev+curr) : 0;
            //End without ACE//

            cards.forEach( element => {
                //Check firstSumming value to set AS value: 1 or 11:
                if(element.value==='ACE'){
                    if(firstSumming>=11){
                        valuesArray.push(1)
                    } else if(firstSumming<11){
                        valuesArray.push(11)
                    }
                };
            });

            const finalSumming = valuesArray.reduce((prev, curr) => prev+curr);
            valuesArray = [];
            return finalSumming
        };

        //Crupier takes cards until he got more than 16 value:
        while(countValues('crupierCards')<=countValues('playerCards') && countValues('crupierCards')<=16){            
            while(countValues('crupierCards')<=16){
                const croupierCards = JSON.parse(ls.getItem('crupierCards'));           
                await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=1')
                    .then(res => res.json())
                    .then(data => croupierCards.push(data.cards[0]))
                    .catch(err=>{
                        window.alert('API FROM https://deckofcardsapi.com/ BROKES... STATUS 500. GAME WILL BE RESTARTED');
                        window.location.reload();
                        handleRestart();
                    })  
    
                ls.setItem('crupierCards', JSON.stringify(croupierCards));       
            };
        };

        //Count who is winner:
        const croupierResult = countValues('crupierCards');
        const playerResult = countValues('playerCards');
        if(croupierResult===playerResult){
            setLeftCash(leftCash+bet);
            ls.setItem('leftCash',leftCash+bet);
            setIsWin(null);
        } else if (croupierResult>playerResult && croupierResult<=21){
            setIsWin(false);
        } else if(croupierResult<playerResult || playerResult<=21){
            const countedCash=leftCash+bet+bet*0.5;
            setLeftCash(countedCash);
            setIsWin(true);
            ls.setItem('leftCash',countedCash);
        };
        
        setIsPlay(false);
        setDoubleDown(false);
        
        //Saving actual and old round history to LS:
        let prevsRounds = JSON.parse(ls.getItem('roundsHistory'));
        const playerCards = JSON.parse(ls.getItem('playerCards'))?.map(card => card.value);
        const croupierCards = JSON.parse(ls.getItem('crupierCards'))?.map(card => card.value);
        if(prevsRounds===null){
            prevsRounds=[];
        }
        prevsRounds.push({round:round, playerCards:playerCards, croupierCards:croupierCards, bet:bet, isWin:isWin });
        ls.setItem('roundsHistory',JSON.stringify(prevsRounds));

        setBet(null);
    }

    const handleHit = async () => {

        //TODO: copied from handleStand - to refactor
        const countValues = (playerOrCroupierCards) => {
            //First we push each cards without AS and sort array. It is necessery to set AS value:
            let valuesArray = [];
            const cardsWitoutAS = [];
            const cards = JSON.parse(ls.getItem(playerOrCroupierCards));

            cards.forEach( element => {
                if(element.value==='ACE'){
                    //DO NOTHING
                } else if( element.value==='KING'|| element.value==='QUEEN' || element.value==='JACK'){
                    cardsWitoutAS.push(10);
                } else {
                    cardsWitoutAS.push(parseInt(element.value));
                }
            });

            const sortedCards = cardsWitoutAS.sort((a, b) => a - b)
            sortedCards.forEach( element => valuesArray.push(element))
            //If array is empty we want to result be 0
            const firstSumming = sortedCards.length>0 ? sortedCards.reduce((prev, curr) => prev+curr) : 0;
            //End without ACE//

            cards.forEach( element => {
                //Check firstSumming value to set AS value: 1 or 11:
                if(element.value==='ACE'){
                    if(firstSumming>=11){
                        valuesArray.push(1)
                    } else if(firstSumming<11){
                        valuesArray.push(11)
                    }
                };
            });

            const finalSumming = valuesArray.reduce((prev, curr) => prev+curr);
            valuesArray = [];
            return finalSumming
        };

        

        //Takes 1 card:
        const playerCards = JSON.parse(ls.getItem('playerCards'));           
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=1')
            .then(res => res.json())
            .then(data => playerCards.push(data.cards[0]))
            .catch(err=>{
                window.alert('API FROM https://deckofcardsapi.com/ BROKES... STATUS 500. GAME WILL BE RESTARTED');
                window.location.reload();
                handleRestart();
            }) 
        ls.setItem('playerCards', JSON.stringify(playerCards)); 

        const playerResult = countValues('playerCards');

        if (playerResult>21){
            setIsWin(false);
            setIsPlay(false);
        
            //Saving actual and old round history to LS: //TODO: copied from handleStand - to refactor
            let prevsRounds = JSON.parse(ls.getItem('roundsHistory'));
            const playerCards = JSON.parse(ls.getItem('playerCards'))?.map(card => card.value);
            const croupierCards = JSON.parse(ls.getItem('crupierCards'))?.map(card => card.value);
            if(prevsRounds===null){
                prevsRounds=[];
            }
            prevsRounds.push({round:round, playerCards:playerCards, croupierCards:croupierCards, bet:bet, isWin:isWin });
            ls.setItem('roundsHistory',JSON.stringify(prevsRounds));

            setBet(null);
        }    

        setDoubleDown(false);
    }
    
    return (
        <div className='gameArea'>
            <GameHeader title='Crupier'/>
            <div className='table'>
                <div className={classnames('crupierCardsBox', { crupierCardsBoxVisible: !isPlay })}>
                    {JSON.parse(ls.getItem('crupierCards'))?.map( card => <div key={Math.random().toString(16)} className='cardContainer'><img key={card.id} className='card'  src={card.image} alt='card'></img></div>)}
                </div>
                <div className='startBtnBox'>
                    {isPlay ? <button onClick={handleRestart} className='startBtn'>Restart Game</button> : <button onClick={handlePlay} className='startBtn'>{round===5 ? 'Play again' : 'Play'}</button>}                    
                </div>
                <div className='yourCardsBox'>
                    {JSON.parse(ls.getItem('playerCards'))?.map( card => <div key={Math.random().toString(16)} className='cardContainer'><img key={card.id} className='card' src={card.image} alt='card'></img></div>)}
                </div>
            </div> 
            <PlayerInfoBox  handleDoubleDown={handleDoubleDown} handleStand={handleStand} handleHit={handleHit}/>
        </div>
    )
};

export default GameArea;