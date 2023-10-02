import { useState, type MouseEvent } from 'react';
import './App.css';
import { Button } from '@mui/material';

interface Dots {
  x: number,
  y: number
}

function App() {

  const [dots, setDots] = useState<Dots[]>([])
  const [dotList, setDotList] = useState<Dots[]>([])

  const undo = () => {
    const lastDot = dots[dots.length - 1];
    setDots(dots.slice(0, -1));
    setDotList([...dotList, lastDot]);
  }

  const redo = () => {
    const lastDot = dotList[dotList.length - 1];
    if (lastDot) {
      setDotList(dotList.slice(0, -1));
      setDots([...dots, lastDot]);
    }
  }

  const clickScreen = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setDots([...dots, { x: clientX, y: clientY }]);
  }

  return (
    <div className="App">
      <div className='buttons'>
        <Button onClick={undo} variant='contained' color='secondary'>Undo</Button>
        <Button onClick={redo} variant='contained' color='secondary'>Redo</Button>
      </div>
      <div className='clickArea' onClick={clickScreen} >
        {dots.map(({ x, y }: Dots, id: number) => (
          <div className='dot'
            key={id}
            style={{
              left: x, top: y
            }} />
        ))}
      </div>
    </div>
  );
}

export default App;
