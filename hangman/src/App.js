import './App.css';
import {useState,useEffect, useCallback} from 'react'
import words from './words.json'

function App() {
  const [wordToGuess,setWordToGuess] = useState(words[Math.floor(Math.random()*words.length)]);
  const [guessedChars,setGuessedChars] = useState([]);
  const [incorrectGuesses,setIncorrectGuesses] = useState(0);
  console.log(wordToGuess);
  const addGuessedChars = useCallback(
    (letter)=>{
      if(guessedChars.includes(letter))return;
      setGuessedChars(currentLetters=>[...currentLetters,letter]);
    }
  ,[guessedChars]);

  useEffect(() =>{
    const handler = (e) =>{

    let a=e.key;
    if(a>="a" && a<="z"){
      if(!guessedChars.includes(a)){
        if(!wordToGuess.includes(a)){
          setIncorrectGuesses(incorrectGuesses+1);
        }
        addGuessedChars(a);
      }
    }
  }

  document.addEventListener('keypress',handler );
  return () =>{
    document.removeEventListener('keypress',handler);
  }
  },[guessedChars]);
  
  
  return (
    <div className="App">
      <Hangman num={incorrectGuesses}/>
      <HangmanLetters word={wordToGuess.split("")} guessedChars={guessedChars}/>
      <LetterGrid guessed={guessedChars}/>
    </div>
  );
}

const HangmanLetters = (props) =>{
  return (
    <div key='lettes' className='HangmanLetters'>
      {props.word.map(element => {
        return <span className={props.guessedChars.includes(element)? '':'hide'} key={element+Math.random()}>{element}</span>
      })}
        
    </div>
  );
}

const Hangman = (props) =>{
  
  return (
  <div className='hangMan' key='hangman '>
    <Post incorrectGuesses={props.num}/>
  </div>
)};

const Post = (props) =>{
  return (<div key='post' className='post'>
  <BottomBar />
  <UprightPost />
  <TopHorizontal />
  <TopVertical />
  <HangmanBody incorrectGuesses={props.incorrectGuesses}/>
  </div>)
}

const BottomBar = () =>{
  return (
    <div key='bottom_bar' style={{height:'15px',width:'350px',backgroundColor:'whitesmoke',position:'absolute',bottom:'0'}}></div>
  )
}

const UprightPost = () =>{
  return (
    <div key='upright_post' style={{height:'500px',width:'15px',backgroundColor:'whitesmoke',position:'absolute',bottom:'0',left:'175px'}}></div>
  )
}

const TopHorizontal = () =>{
  return(
    <div key='top_hor' style={{height:'15px',width:'175px',backgroundColor:'whitesmoke',position:'absolute',top:'0',left:'175px'}}></div>
  )
}

const TopVertical = () =>{
  return(
    <div key='top_vert' style={{height:'100px',width:'15px',backgroundColor:'whitesmoke',position:'absolute',right:'0'}}></div>
  )
}

const Head = () =>{
  return <div key='head' style={{width:'75px',height:'75px',borderRadius:'100%', border:'10px solid blue',boxSizing:'border-box',position:'absolute',right:'-30px',top:'95px'}} />
}

const Body = () =>{
  return <div key='body' style={{height:'150px', width:'10px', backgroundColor:'blue',position:'absolute',right:'2.5px',top:'160px'}}/>
}

const RightHand = () =>{
  return <div key='right_hand' style={{height:'75px', width:'10px', backgroundColor:'blue',position:'absolute',right:'2.5px',top:'160px',transformOrigin:'bottom right',transform:'rotate(60deg)'}}/>
}

const LeftHand = () =>{
  return <div key='left_hand' style={{height:'75px', width:'10px', backgroundColor:'blue',position:'absolute',right:'2.5px',top:'160px',transformOrigin:'bottom left',transform:'rotate(-60deg)'}}/>
}

const LeftLeg = () =>{
  return <div key='left_leg' style={{height:'75px', width:'10px', backgroundColor:'blue',position:'absolute',right:'2.5px',top:'310px',transformOrigin:'top right',transform:'rotate(30deg)'}}/>
}

const RightLeg = (props) =>{
  return <div style={{height:'75px', width:'10px', backgroundColor:'blue',position:'absolute',right:'2.5px',top:'310px',transformOrigin:'top left',transform:'rotate(-30deg)'}}/>
}


const hangArr = [];

hangArr.push(Head);
hangArr.push(Body);
hangArr.push(RightHand);
hangArr.push(LeftHand);
hangArr.push(RightLeg);
hangArr.push(LeftLeg);

function HangmanBody(props){
  
  return (
    <div key="hangman_body">
      {hangArr.map((Element,index) => {
        if(index<props.incorrectGuesses){
          return <Element key={index} />
        }
      })}
    </div>
  )

}





let letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LetterGrid = () =>{
  return (
    <div className='LetterGrid'>
  {letters.map(letter =>{return <span className='letter' key={letter}>{letter}</span>})}
    </div>
  )
}
export default App;
