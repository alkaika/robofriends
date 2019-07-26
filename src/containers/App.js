import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import '../containers/App.css';
import ErrorBoundry from '../components/ErrorBoundry'

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			inputField: ''
		}
	}

componentDidMount() {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(info => this.setState({robots: info}))
}

onSearchChange = (event) => {
	this.setState({ inputField: event.target.value })
}

render() {
	const { robots, inputField } = this.state;
	const filteredRobots = robots.filter(robot => 
		robot.name.toLowerCase().includes(inputField.toLowerCase()))

if (!robots.length) {
	return <h2 className='tc'>LOADING</h2>
} else {
	return (
		<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={this.onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filteredRobots}/>
				</ErrorBoundry>
			</Scroll>
			<br></br>
			<footer className='tc f2 fw4'>Website Designed & Created by Alan Aspera</footer>
		</div>
		);
	}
  }
}
export default App;