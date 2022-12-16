import { useState } from "react";
import '../MemoryGrid.css'
function MemoryGrid(props) {
    function removeItemOnce(arr, index) {
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    const createGrid = (rows, cols) => {
        //create an array with numbers from 1 to rows*cols/2
        let nums = [];
        for (let i = 0; i < (rows * cols) / 2; i++) {
            nums.push(i);
            nums.push(i);
        }
        let grid = [];
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

    const [memoGrid, setMemoGrid] = useState(createGrid(props.rows, props.cols));
    const [revealed, setRevealed] = useState(
        new Array(parseInt(props.rows)).fill('').map(row => row = new Array(parseInt(props.cols)).fill(false))
    );
    const [prevClick, setPrevClick] = useState();
    const handleClick = (row, col) => {
        let newRevealed = [...revealed];
        newRevealed[row][col] = true;
        setRevealed([...newRevealed]);
        setPrevClick({row: row, col: col});
        if (prevClick) {
        if(row === prevClick.row && col ===prevClick.col)return;
        
            if(memoGrid[prevClick.row][prevClick.col] !== memoGrid[row][col]){
                //we hide the cards
                setTimeout(()=>{
                    let newRevealed = [...revealed];
                    newRevealed[row][col]=false;
                    newRevealed[prevClick.row][prevClick.col] = false;
                    setRevealed([...newRevealed]);
                },1000);
            }

            setPrevClick();
        }

    }
    return (
        <div className="grid">
            {memoGrid.map((row, rowIndex) => {
                return <div className="row" key={rowIndex}>{row.map((element, colIndex) => {
                    //for now we will just put the number in the card
                    return <div className={"card ".concat(revealed[rowIndex][colIndex] ? 'reveal' : '')}
                        key={colIndex}
                        onClick={(e) => handleClick(rowIndex, colIndex)}>
                        {revealed[rowIndex][colIndex] ? element : ' '}</div>
                })}</div>;
            })}
        </div>
    )
}
export default MemoryGrid;