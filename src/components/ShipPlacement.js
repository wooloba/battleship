import React from "react";
import Board from "./Board";
import {connect} from "react-redux"
import {
	placeShip, updatePlacedShip
} from "../redux/actions";
import {Button, Input, Radio, Tooltip} from "antd";


const mapStateToProps = (state, ownProps) => {
	return {
		boardSize: state.game.boardSize,
		ships: state.game.ships,
		player: state.player,
		grid: ownProps.playerIndex === 1 ? state.player.player1.grid : state.player.player2.grid,
		shipPlaced: ownProps.playerIndex === 1 ? state.player.player1.shipPlaced : state.player.player2.shipPlaced
	}
};


const mapDispatchToProps = dispatch => ({
	placeShip: (player, coord, shipType) => dispatch(placeShip(player, coord, shipType)),
	updatePlacedShip: (player, name) => dispatch(updatePlacedShip(player, name)),

});


class ShipPlacement extends React.Component {

	state = {
		direction: "v",
		input: "",
	};

	onChange = e => {
		this.setState({
			direction: e.target.value,
		});
	};

	onInputChange = e => {
		this.setState({
			input: e.target.value,
		})
	};

	inputValidate = () => {
		let boardSize = this.props.boardSize;
		let input = this.state.input;
		console.log(input.slice(1));
		return input[0].toLowerCase().charCodeAt(0) - 96 <= boardSize && input.slice(1) <= boardSize;

	};

	overLapCheck = () => {
		const {input, direction} = this.state;
		const {ships, shipPlaced, grid} = this.props;

		let col = input[0].toLowerCase().charCodeAt(0) - 96;
		let row = parseInt(input.slice(1));
		let ship = ships[shipPlaced.length];

		let isTaken = false;


		if (direction === 'v') {
			if (row + ship.size <= 11) {
				for (let i = 0; i < ship.size; i++) {
					if (grid[row + i][col].status !== "") {
						isTaken = true;
					}
				}
			} else {
				isTaken = true;
			}
		} else {
			if (col + ship.size <= 11) {
				for (let i = 0; i < ship.size; i++) {
					if (grid[row][col + i].status !== "") {
						isTaken = true;
					}
				}
			} else {
				isTaken = true;
			}
		}
		return isTaken;
	};


	onPlace = () => {
		const {input, direction} = this.state;
		const {ships, playerIndex, shipPlaced, updatePlacedShip} = this.props;

		let col = input[0].toLowerCase().charCodeAt(0) - 96;
		let row = parseInt(input.slice(1));
		let ship = ships[shipPlaced.length];


		if (this.inputValidate()) {
			if (!this.overLapCheck()) {
				if (direction === 'v') {
					for (let i = 0; i < ship.size; i++) {
						this.props.placeShip(playerIndex, [col, row + i], ship.type)
					}
				} else {
					for (let i = 0; i < ship.size; i++) {
						this.props.placeShip(playerIndex, [col + i, row], ship.type)
					}
				}

				updatePlacedShip(playerIndex, ship.name);
			}
		}
		this.setState({
			input: ""
		})
	};

	render() {
		const {playerIndex} = this.props;

		console.log(this.props);

		return (
			<div>
				<div className="boardContainer">
					<Board
						playerIndex={playerIndex}
						step={"preGame"}

					/>
				</div>

				<div className={"userInputArea"}>

					<p>
						{this.props.ships.length === this.props.shipPlaced.length ?
							"All Placed" : "Now placing : " + this.props.ships[this.props.shipPlaced.length].name}
					</p>

					<Tooltip
						trigger={['focus']}
						title={"Enter a combination of letter and number in order to place the ship"}
						placement="bottomLeft"
					>
						<Input size="small"
						       maxLength={3}
						       onChange={this.onInputChange}
						       placeholder={"e.g. A1 "}
						       value={this.state.input}
						       style={{
							       width: "100px"
						       }}
						/>
					</Tooltip>

					<Radio.Group onChange={this.onChange} value={this.state.direction}>
						<Radio value={"v"}>Vertical</Radio>
						<Radio value={"h"}>Horizontal</Radio>
					</Radio.Group>

					<Button onClick={this.onPlace} disabled={this.props.ships.length === this.props.shipPlaced.length}>
						Place
					</Button>
				</div>
			</div>
		)
	}


}


export default connect(mapStateToProps, mapDispatchToProps)(ShipPlacement)