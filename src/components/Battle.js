import React from "react";
import {connect} from "react-redux";

import Board from "./Board";
import {fire, toggleTurn} from "../redux/actions";
import {message, Popover, Button} from "antd";

const mapStateToProps = (state) => {
	return {
		turn: state.game.turn,
		toBeHitP1: state.player.player1.shipPlacement,
		toBeHitP2: state.player.player2.shipPlacement,
	}
};


const mapDispatchToProps = dispatch => ({
	fire: (player, row, col) => dispatch(fire(player, row, col)),
	toggleTurn: () => dispatch(toggleTurn())
});


class Battle extends React.Component {

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {toBeHitP1, toBeHitP2} = this.props;

		if (toBeHitP1.length === 0) {
			message.success("Player 2 won!")
		} else if (toBeHitP2.length === 0) {
			message.success("Player 1 won!")
		}
	}

	handleFire = (playerIndex, row, col) => {
		const {turn, fire, toggleTurn} = this.props;
		if (playerIndex !== turn + 1) {
			message.warning("It's not your turn yet!")
		} else {
			fire(playerIndex, row, col);
			toggleTurn();
		}
	};

	render() {
		return (
			<div>
				<h2 align={"center"}>{"It's turn for Player"+(!this.props.turn+1)}</h2>
				<div className="boardContainer">

					<div className={"board-pop-container"}>
						<h3 align={"center"}>Player1</h3>
						<Board
							playerIndex={1}
							step={"battle"}
							style={{margin: "40px 40px"}}
							fire={this.handleFire}
						/>

						<Popover
							content={<Board playerIndex={1} step={"preGame"}/>}
							placement="bottomLeft">
							<Button type="primary">Hover to show Player1's ship map</Button>
						</Popover>

					</div>

					<div  className={"board-pop-container"}>
						<h3 align={"center"}>Player2</h3>
						<Board
							playerIndex={2}
							step={"battle"}
							style={{margin: "40px 40px"}}
							fire={this.handleFire}
						/>

						<Popover
							content={<Board playerIndex={2} step={"preGame"}/>}
							placement="bottomRight">
							<Button type="primary">Hover to show Player2's ship map</Button>
						</Popover>,

					</div>

				</div>
			</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Battle)