import './App.css'
import Board from './Board'
import React from 'react'
import GameRoom from './Game'
export function App() {
return(
    <>
      <GameRoom roomId="sala-1" player="X" wsUrl="http://localhost:8080/ws" />
    </>
)
}