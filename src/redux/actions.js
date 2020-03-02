import * as types from "./actionTypes"



export const initGrid = (size) =>({
	type:types.INIT_GRID,
	size
});

export const placeShip = (player,coord,shipType) =>({
	type:types.PLACE_SHIP,
	player,
	coord,
	shipType,
});

export const updatePlacedShip = (player,name) =>({
	type:types.UPDATE_PLACED_SHIP,
	player,
	name
});

export const fire = (player,row,col)=>({
	type:types.FIRE,
	player,
	row,
	col,

});

export const toggleTurn =()=>({
	type:types.TOGGLE_TURN
});