import { useState, useEffect} from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Dice from './Dice'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [dice, setDice] = useState(createArray())
  const [tenzies , setTenzies] = useState(false)

  useEffect(()=>{
    const testIsHeld = dice.every(die => die.isHeld)
    const testValue = dice.every(die => die.value === dice[0].value)
    if(testIsHeld && testValue){
      setTenzies(prevState => !prevState)
    }
    
  },[dice])

  function createArray(){
    const myArray = []
    for(let i =0; i < 10; i++){
      myArray.push(generateDie())
    }
    return myArray;
  }

  function generateDie(){
    return {
      value: Math.ceil(Math.random()*6),
      id: nanoid(),
      isHeld: false
    }
  }

  function changeBackground(id){
    setDice(oldDice => oldDice.map(die =>{
      return die.id === id ?
        {...die, isHeld: !die.isHeld}:
        die
    }))
  }
    

  const diceElements = dice.map(thisObject =>(
    <Dice
      key = {thisObject.id}
      value = {thisObject.value}
      isHeld = {thisObject.isHeld}
      click = {() =>changeBackground(thisObject.id)}
    />
  ))
  
  function handleClick(){
    
    if(!tenzies){
      setCount(prevCount => prevCount + 1)
      setDice(oldDice =>oldDice.map(die =>{
        
        return die.isHeld ? 
        die :
          generateDie()
      }))
  }
    else{
      setCount(0)
      setTenzies(prevState => !prevState)
      setDice(createArray())
    }
  }

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.
      </p>
      <div className="container--dice">
        {diceElements}
      </div>
      <button className='dice--roll' onClick={handleClick}
      >
        {tenzies ? "NEW GAME" : "ROLL"}
      </button>
      {tenzies && 
        <div className='tenzies--won'>
          It took {count} rolls to win
        </div>}
    </main>
  )
}

export default App
