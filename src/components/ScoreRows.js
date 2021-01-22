const ScoreRows = () => {
    const ls = window.localStorage;

    return(
        <>
            {
                JSON.parse(ls.getItem('scoresHistory'))?.map( (e,index) => 
                <strong key={Math.random().toString(16)} className='row'>{index+1}-place: {e} $</strong>)
            }
        </>
    )
};

export default ScoreRows;