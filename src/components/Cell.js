import React from "react";


class Cell extends React.Component {

	handleClick = () => {
		const {fire, row, col,playerIndex} = this.props;
		fire(playerIndex,row,col)
	};

	render() {
		const {cell, step} = this.props;

		if (cell.status === 'label') {
			return <div className={"label"}>{cell.label === '`' ? '' : cell.label}</div>
		}

		if (step === "battle") {
			if (cell.status === 'S' || cell.status === 'C') {
				return (
					<div className={"cell"} onClick={this.handleClick}>
						{""}
					</div>
				)

			} else if (cell.status === 'O' || cell.status === 'X') {
				return (
					<div className={"cell"} >
						{cell.status}
					</div>
				)
			} else {
				return (
					<div className={"cell"} onClick={this.handleClick}>
						{cell.status}
					</div>
				)
			}

		}

		return (
			<div className={"cell"}>
				{cell.status}
			</div>
		)
	}

}

export default Cell
