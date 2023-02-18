import React from "react";
import {useState} from "react";
import '../MemoryGrid.css';
function MemoryGrid(props: { rows:   string; cols:  string; level: number; length: number; onReRender: () => void; }) {
    function removeItemOnce(arr:number[], index:number) {
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    const createGrid = (rows:number, cols:number) => {
        //create an array with numbers from 1 to rows*cols/2
        let nums:number[] = [];
        for (let i = 0; i < (rows * cols) / 2; i++) {
            nums.push(i);
            nums.push(i);
        }
        let grid:number[][] = [];
        for (let i = 0; i < rows; i++) {
            grid.push([]);
            for (let j = 0; j < cols; j++) {
                //here we push the number randomly
                let k = Math.floor(Math.random() * nums.length);
                grid[i].push(nums[k]);
                nums = removeItemOnce(nums, k)
            }
        }
        return grid;
    }

    const [memoGrid, setMemoGrid] = useState(createGrid(parseInt(props.rows), parseInt(props.cols)));
    const [revealed, setRevealed] = useState(
        new Array(parseInt(props.rows)).fill('').map(row => row = new Array(parseInt(props.cols)).fill(false))
    );
    type PrevClick={
    row:number;
    col:number;
    };
    const [prevClick, setPrevClick] = useState<PrevClick>();
    const handleClick = (row:number, col:number) => {
        let newRevealed = [...revealed];
        newRevealed[row][col] = true;
        setRevealed([...newRevealed]);
        setPrevClick({row: row, col: col});
        if (prevClick) {
        if(row === prevClick.row && col ===prevClick.col)return;
            if(prevClick.row==-1 || prevClick.col==-1)return;
        
            if(memoGrid[prevClick.row][prevClick.col] !== memoGrid[row][col]){
                //we hide the cards
                setTimeout(()=>{
                    let newRevealed = [...revealed];
                    newRevealed[row][col]=false;
                    newRevealed[prevClick.row][prevClick.col] = false;
                    setRevealed([...newRevealed]);
                },1000);
            }
           console.log(revealed.flat());
           if(revealed.flat().every((element: any)=> element)){
                if(props.level<props.length-1){

                    sendLevelUpdate();
                }
                setPrevClick({row:-1,col:-1});
                setMemoGrid(createGrid(parseInt(props.rows),parseInt(props.cols)))
                setRevealed(new Array(parseInt(props.rows)).fill('').map(row => row = new Array(parseInt(props.cols)).fill(false)))
            }
            async function sendLevelUpdate(){
                await fetch('http://localhost:8888/mem-game/setLevel',{
                    method:'PUT',
                     headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({level:props.level+1})});
            }
            setPrevClick({row:-1,col:-1});
        }

    }
    return (
        <div className="grid">
            {memoGrid.map((row:number[], rowIndex:number): JSX.Element => {
                return <div className="row" key={rowIndex}>{row.map((element:any, colIndex:number): JSX.Element => {
                    //for now we will just put the number in the card
                    return <div className={"card ".concat(revealed[rowIndex][colIndex] ? 'reveal' : '')}
                        key={colIndex}
                        onClick={() => handleClick(rowIndex, colIndex)}>
                        {revealed[rowIndex][colIndex] ? element : ' '}</div>
                })}</div>;
            })}
        </div>
    );
}
export default MemoryGrid;
