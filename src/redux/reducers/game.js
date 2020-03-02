const gameState ={
	win : false,
	turn: 1,
	boardSize: 10,
	ships: [
		{
			name:"Submarine",
			type:"S",
			size: 3
		},
		{
			name:"Cruiser",
			type:"C",
			size: 3
		}
	]
};

const game = (state = gameState, action) =>{

	switch (action.type){
		case "TOGGLE_TURN":
			return Object.assign({},state,{
				turn: !state.turn
			});

		default:
			return state
	}

};


export default game;