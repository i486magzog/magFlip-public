// import { useState } from 'react'
import { useState } from 'react';
import './App.css';
import { Example2 } from './Example2';

function App() {
  const [curExample, setCurExample] = useState<React.ReactNode | null>(null);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '5rem', gap: '1rem' }}>
        {curExample === null 
          ? (
            <>
              <button onClick={() => setCurExample(<Example2 />)}>
                Example
              </button>
            </>
          ) 
          : (
            <button onClick={() => setCurExample(null)}>
              Home
            </button>
          )
        }
      </div>
      {curExample}
    </>
  )
}

export default App
