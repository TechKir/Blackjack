import GameHeader from './GameHeader';
import PlayerInfoBox from './PlayerInfoBox';

const GameArea = () => {

    //geting decks from api and save them key to local storage
    // const getDecks = async () => {
    //     await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    //         .then(res => res.json())
    //         .then(data => window.localStorage.setItem('decksKey', JSON.stringify(data.deck_id)))   
    // }
    // getDecks();
    //my Key//"i4t10vv791d3"
    
    //withdwrw 2 cards:
    //https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=2
    const handlePlay = async () =>{
        //Starting cards for crupier:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=2')
            .then(res => res.json())
            .then(data => window.localStorage.setItem('crupierCards', JSON.stringify(data.cards)))

        //Starting cards for player:
        await fetch('https://deckofcardsapi.com/api/deck/i4t10vv791d3/draw/?count=6')
            .then(res => res.json())
            .then(data => window.localStorage.setItem('playerCards', JSON.stringify(data.cards)))

    }
    
    return (
        <div className='gameArea'>
            <GameHeader title='Crupier'/>
            <div className='table'>
                <div className='crupierCardsBox'>
                    {JSON.parse(window.localStorage.getItem('crupierCards'))?.map( card => <div key={card.code} className='cardContainer'><img key={card.id} className='card'  src={card.image} alt='card'></img></div>)}
                </div>
                <div className='startBtnBox'>
                    <button onClick={handlePlay} className='startBtn'>Play</button>
                </div>
                <div className='yourCardsBox'>
                    {JSON.parse(window.localStorage.getItem('playerCards'))?.map( card => <div key={card.code} className='cardContainer'><img key={card.id} className='card' src={card.image} alt='card'></img></div>)}
                </div>
            </div> 
            <PlayerInfoBox/>
        </div>
    )
};
export default GameArea;