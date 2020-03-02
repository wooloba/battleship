import React from 'react';
import GameProcess from "./components/GameProcess";
import 'antd/dist/antd.css';
import './app.css'

function App() {
	return (
		<div>
			<h1 align="center">Battleship</h1>
            <GameProcess/>
		</div>
	);
}

export default App;
