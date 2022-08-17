

export default function Dice(props){
    const isHeldStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div className="dice"
        style={isHeldStyle}
        onClick ={props.click}
        >
            {props.value}
        </div>
    )
}