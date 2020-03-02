import React from "react";
import {Steps, Button} from 'antd';
import ShipPlacement from "./ShipPlacement";
import {connect} from "react-redux";
import {initGrid} from "../redux/actions";
import Battle from "./Battle";


const {Step} = Steps;

const mapStateToProps = (state, ownProps) => {
	return {
		boardSize: state.game.boardSize,
	}
};


const mapDispatchToProps = dispatch => ({
	initGrid: (size) => dispatch(initGrid(size))
});


class GameProcess extends React.Component {
	state = {
		currentStep: 0
	};


	next = () => {
		this.setState(prevState => {
			return {currentStep: prevState.currentStep + 1}
		})
	};

	prev = () => {
		this.setState(prevState => {
			return {currentStep: prevState.currentStep - 1}
		})
	};

	restart = () => {
		this.setState({
			currentStep: 0
		});
		this.props.initGrid(this.props.boardSize + 1)
	};

	render() {
		const {currentStep} = this.state;

		const steps = [
				{
					title: 'Player 1 preparation',
					content: (<ShipPlacement
						playerIndex={1}
					/>),
				},
				{
					title: 'Player2 preparation',
					content: (<ShipPlacement
						playerIndex={2}
					/>),
				},
				{
					title: 'Battle',
					content: <Battle/>,
				},
			];

		return (
			<div>
				<Steps current={currentStep} labelPlacement={"vertical"}>
					{steps.map(item => (
						<Step key={item.title} title={item.title}/>
					))}
				</Steps>

				<div>{steps[currentStep].content}</div>

				<div className="steps-action">
					{currentStep < 2 && (
						<Button type="primary" onClick={() => this.next()}>
							Next Step
						</Button>
					)}
					{currentStep === 2 && (
						<Button type="primary" onClick={() => this.restart()}>
							Restart Game
						</Button>
					)}
				</div>

			</div>
		)

	}


}

export default connect(mapStateToProps, mapDispatchToProps)(GameProcess)