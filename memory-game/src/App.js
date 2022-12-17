import './App.css';
import MemoryGrid from './components/MemoryGrid';
import { useState } from 'react';
import { set } from 'mongoose';

function App() {
const [lvl, setLvl] = useState(0);
 async function getLvl(){
  let lvl;
  lvl=await fetch('http://localhost:8888/mem-game/lvl').then(res=>res.json());
  console.log(lvl.level);
  setLvl(lvl.level);
 }
 getLvl();
 const lvlMap=[
  [2,2],
  [2,4],
  [3,4],
  [4,4],
  [4,5]
 ]
 const setNewLvl =async () =>{
  if(lvl<lvlMap.length-1){
   setLvl(lvl+1);
  }
  
  console.log("rerender",lvlMap[parseInt(lvl)]);
 }
  return (
    <div className="App">
      <MemoryGrid rows={lvlMap[lvl][0]} cols={lvlMap[lvl][1]} length={lvlMap.length} level={lvl} onReRender={setNewLvl}/>
    </div>
  );
}

export default App;
