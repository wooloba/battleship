import React from "react";
import {connect} from "react-redux";
import Cell from "./Cell";

const mapStateToProps = state => {
	return {
		game: state.game,
		player: state.player,
	}
};

class Board extends React.Component {

	render() {

		const {playerIndex, player, game, step} = this.props;

		const grid = (playerIndex === 1 ? player.player1.grid : player.player2.grid);
		const gridSize = 'repeat(' + (game.boardSize + 1) + ', 1fr)';

		return (
			<div className={"board"}
			     style={{
				     gridTemplateColumns: gridSize,
				     gridTemplateRows: gridSize,
			     }}>
				{grid.map((row, i) => {
					return row.map((cell, j) => {
						return (
							<Cell
								key={`${i}${j}`}
								cell={cell}
								step={step}
								row={i}
								col={j}
								playerIndex={playerIndex}
								fire={this.props.fire}
							/>)
					})
				})}
			</div>
		)
	}
}


export default connect(mapStateToProps, null)(Board)
