import Lanes from '../components/Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import AltContainer from 'alt-container';
import React from 'react'; 




export default class App extends React.Component { 
	
	render() { 
		return (
			<div> 
				<button className="add-lane" onClick={this.addLane}>+</button>
				<AltContainer 
					stores={[LaneStore]}
					inject={{
						lanes: () => LaneStore.getState().lanes || []
					}}
				>
					<Lanes /> 
				</AltContainer>
			</div>
		);

	}

	addLane() {
		LaneActions.create({name: 'New lane'});
	}

}