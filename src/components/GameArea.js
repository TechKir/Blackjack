import React,{useState,useEffect,createContext} from 'react';
import GameHeader from './GameHeader';
import PlayerInfoBox from './PlayerInfoBox';
import classnames from 'classnames';

export const AuthContext = createContext(null); 

const GameArea = () => {

    const ls = window.localStorage;

    ls.setItem('leftCash',1000)
    const [leftCash,setLeftCash]=useState(ls.getItem('leftCash'))
    const [bet,setBet]=useState(null);
    const [isPlay,setIsPlay]=useState(false);
    const [round,setRound]=useState(null);
    const [doubleDown, setDoubleDown]=useState(false)

    //geting decks from api and save them key to local storage
    // const getDecks = async () => {
    //     await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    //         .then(res => res.json())
    //         .then(data => window.localStorage.setItem('decksKey', JSON.stringify(data.deck_id)))   
    // }
    // getDecks();
    //my Key//"i4t10vv791d3"
    //https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/


    const handlePlay = async () =>{
        ls.removeItem('crupierCards');
        ls.removeItem('playerCards');

        const result = window.prompt('What is your bet?'); 
        let roundCounter = 0;
        roundCounter++;
        setLeftCash(leftCash-result);
        setRound(roundCounter);
        setBet(result);

        //Resuffle cards:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/shuffle/')

        //Starting cards for crupier:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=2')
            .then(res => res.json())
            .then(data => ls.setItem('crupierCards', JSON.stringify(data.cards)))

        //Starting cards for player:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=2')
            .then(res => res.json())
            .then(data => ls.setItem('playerCards', JSON.stringify(data.cards)))

        setIsPlay(true);
        setDoubleDown(true);
        ls.setItem('leftCash',leftCash-result);
    }

    const handleRestart = async () => {
        setLeftCash(1000);
        setRound(null);
        setBet(null);        
        setIsPlay(false);
        setDoubleDown(false);
        //jak bede mial scores tonajpier je pobrac zapisac potem wyciscic wszystko i znowu ustalic z kopii scores
        ls.clear();
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
                    console.log('as - nie robie nic')
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
                }
            })

            const finalSumming = valuesArray.reduce((prev, curr) => prev+curr);
            valuesArray = [];
            return finalSumming
        };

        //Crupier takes cards until he got more than 16 value:
        while(countValues('crupierCards')<=countValues('playerCards') && countValues('crupierCards')<16){            
            while(countValues('crupierCards')<=16){
                const croupierCards = JSON.parse(ls.getItem('crupierCards'));           
                await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=1')
                    .then(res => res.json())
                    .then(data => croupierCards.push(data.cards[0]))  
    
                ls.setItem('crupierCards', JSON.stringify(croupierCards));       
            };
        }


        //Count who is winner:
        const croupierResult = countValues('crupierCards');
        const playerResult = countValues('playerCards');
        if(croupierResult===playerResult){
            console.log('no one wins')
        } else if (croupierResult>playerResult && croupierResult<=21){
            console.log('croupier wins')
        } else if(croupierResult<playerResult || playerResult<=21){
            console.log('player wins')
        }

        setIsPlay(false);
        setDoubleDown(false);
        
        // - odsłania kartę krupiera i ewentualnie dopiera gdy jego wynik jest <=16,
        // - gdy wynik jest powyżej 16 krupier nie dopiera karty i następuję porównanie punktów gracza z krupira,
        // - wynik decyduje o zwycięstwie: gdy gracz ma mniej pt to cash - bet, gdy gracz ma więcej to cash + bet*1.5  oraz pojawienie się w tablicy wyniku tury np. III player cards: AS ,10 vs crupier cards: 2,5,10 | Player win bet*0.5 albo
        // III player cards: 5 ,10 vs crupier cards: 2,5,10 | Player lose bet
        // - przetasowanie kart
        // - tura się kończy po przyciśnięciu Stand. Następnie przycisk Start ponownie się pojawia.

    }
    
    return (
        <AuthContext.Provider 
        value={{isPlay, leftCash, round, bet, doubleDown, handleDoubleDown, handleStand}}>
            <div className='gameArea'>
                <GameHeader title='Crupier'/>
                <div className='table'>
                    <div className={classnames('crupierCardsBox', { crupierCardsBoxVisible: !isPlay })}>
                        {JSON.parse(ls.getItem('crupierCards'))?.map( card => <div key={card.code} className='cardContainer'><img key={card.id} className='card'  src={card.image} alt='card'></img></div>)}
                    </div>
                    <div className='startBtnBox'>
                        {isPlay ? <button onClick={handleRestart} className='startBtn'>Restart Game</button> : <button onClick={handlePlay} className='startBtn'>Play</button>}                    
                    </div>
                    <div className='yourCardsBox'>
                        {JSON.parse(ls.getItem('playerCards'))?.map( card => <div key={card.code} className='cardContainer'><img key={card.id} className='card' src={card.image} alt='card'></img></div>)}
                    </div>
                </div> 
                <PlayerInfoBox/>
            </div>
        </AuthContext.Provider>    
    )
};

//<div className='crupierCardsBox'>
export default GameArea;