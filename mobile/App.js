
import React,{Component} from 'react';
import Navigator from './Navigation/Navigation';
import Store from './Redux/Store/configureStore'
import { Provider } from 'react-redux'

export default class App extends Component{
	render(){
		return(
			<Provider store={Store}>
				<Navigator/>
			</Provider>
		)
	}
}