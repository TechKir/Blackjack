const BjHeader = () => {

    const escapeAlert = () => window.alert( 'If you must quit remember that game will be saved and you can back here any moment to get better score!');

    return(
        <div onMouseEnter={escapeAlert} className='titleHeader backgroundCorrect'>
            <h1>Black Jack</h1>
        </div>
    )
};

export default BjHeader;