const ActionBtn = ({kindOfAction, handleDoubleDown, handleStand }) => {

    const chooseFn = () =>{
        if(kindOfAction==='Double Down'){
            return handleDoubleDown();
        } else if (kindOfAction==='Stand'){
            return handleStand();
        } else if (kindOfAction==='Hit'){

        } else{
            return null
        }
    }

    return (
        <button onClick={chooseFn} className='actionBtn'>{kindOfAction}</button>
    )
};

export default ActionBtn;