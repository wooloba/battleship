import _ from "lodash";


const labelMap = (n) => String.fromCharCode(96 + n).toUpperCase();

function gridGenerator(size = 11) {
	let grid = [];
	for (let i = 0; i < size; i++) {
		let row = [];
		for (let j = 0; j < size; j++) {
			if (i === 0) {
				row.push({status: "label", label: labelMap(j)})
			} else if (i !== 0 && j === 0) {
				row.push({status: "label", label: i});
			} else {
				row.push({status: ""});
			}
		}
		grid.push(row);
	}
	return grid
}

const playerState = {
	player1: {
		grid: gridGenerator(),
		shipPlacement: [],
		shipPlaced: []
	},
	player2: {
		grid: gridGenerator(),
		shipPlacement: [],
		shipPlaced: []

	},
};

const player = (state = playerState, action) => {

	switch (action.type) {
		case "INIT_GRID":

			return Object.assign({}, state, {
				player1: {
					grid: gridGenerator(action.size),
					shipPlacement: [],
					shipPlaced: []
				},
				player2: {
					grid: gridGenerator(action.size),
					shipPlacement: [],
					shipPlaced: []
				}
			});

		case "PLACE_SHIP":
			if (action.player === 1) {
				return {
					...state,
					player1: {
						...state.player1,
						grid: state.player1.grid.map((innerArray, index) => {
							if (index === action.coord[1]) return innerArray.map((item, index) => {
								if (index === action.coord[0]) return {"status": action.shipType};
								return item
							});
							return innerArray
						}),

						shipPlacement: state.player1.shipPlacement.concat({
							coord: action.coord,
							status: action.shipType,
						})
					}
				}

			} else {
				return {
					...state,
					player2: {
						...state.player2,
						grid: state.player2.grid.map((innerArray, index) => {
							if (index === action.coord[1]) return innerArray.map((item, index) => {
								if (index === action.coord[0]) return {"status": action.shipType};
								return item
							});
							return innerArray
						}),

						shipPlacement: state.player2.shipPlacement.concat({
							coord: action.coord,
							status: action.shipType,
						})
					}
				}
			}

		case "FIRE":
			if (action.player === 1) {
				return {
					...state,
					player1: {
						...state.player1,
						grid: state.player1.grid.map((innerArray, index) => {
							if (index === action.row) return innerArray.map((item, index) => {
								if (index === action.col) {
									return {"status": state.player1.grid[action.row][action.col].status !== "" ? "O" : "X"};
								}
								return item
							});
							return innerArray
						}),

						shipPlacement: _.reject(state.player1.shipPlacement,{coord:[action.col,action.row]})
					}
				}

			} else {
				return {
					...state,
					player2: {
						...state.player2,
						grid: state.player2.grid.map((innerArray, index) => {
							if (index === action.row) return innerArray.map((item, index) => {
								if (index === action.col) {
									return {"status": state.player2.grid[action.row][action.col].status !== "" ? "O" : "X"};
								}
								return item
							});
							return innerArray
						}),
						shipPlacement: _.reject(state.player2.shipPlacement,{coord:[action.col,action.row]})

					}
				}
			}

		case "UPDATE_PLACED_SHIP":
			if (action.player === 1) {
				return {
					...state,
					player1: {
						...state.player1,
						shipPlaced: state.player1.shipPlaced.concat(action.name)
					}
				}

			} else {
				return {
					...state,
					player2: {
						...state.player2,
						shipPlaced: state.player2.shipPlaced.concat(action.name)
					}
				}
			}


		default:
			return state
	}

};

export default player