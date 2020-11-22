// Components/Statistic.js

import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { colors } from '../StyleSheet'
import { connect } from 'react-redux';
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

class Statistic extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

	render() {
		return (
			<View style={styles.container}>
          		<View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width, flexDirection: "row"}}>
            		<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            	  		<Icon
						  	name="home"
						  	color={"white"}
						  	size={45}
						  	onPress={() => { this.props.navigation.navigate('Home') }}
						  	style={{justifyContent: "flex-end"}}
						/>
            		</View>
            		<View style={{flex: 6, justifyContent: "center", alignItems: "center"}}>
            			<Text style={{color: "white", fontWeight: "bold", fontSize:22}}>Statistiques</Text>
            			<Text style={{color: "white", fontSize:18}}>Hypertension</Text>
            		</View>
            		<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            		</View>
          		</View>
				<View
        			onSwipe={this.onSwipe}
        			style={{flex: 9}}
        		>
          			<View style={{position:'absolute', bottom:10, zIndex: 2, width: "100%", flexDirection: "row"}}>            
          				<View style={{flex: 3, alignItems: "flex-end", justifyContent: "flex-end"}}>
              				<View
                				style={{
                				  	borderWidth:1,
                				  	borderColor:colors.secondary,
                				  	alignItems:'center',
                				  	justifyContent:'center',
                				  	width:70,
                				  	height:70,
                				  	backgroundColor:colors.secondary,
                				  	borderRadius:50,
                				  	shadowColor: '#000',
                				  	shadowOffset: { width: 1, height: 2 },
                				  	shadowOpacity: 1,
                				  	shadowRadius: 1.5,
                				  	elevation: 10
              					}}
							>
                				<Icon2
                					name="notes-medical"
                					color={"white"}
                					size={40}
                					onPress={() => { this.props.navigation.navigate('Calendar', {pageToReturn: "Check"}) }}
                					style={{justifyContent: "flex-end"}}
                				/>
              				</View>
            			</View>
            			<View style={{flex: 3, alignItems: "center"}}>
							<View
    	    					    style={{
    	    					      borderWidth:1,
    	    					      borderColor:colors.secondary,
    	    					      alignItems:'center',
    	    					      justifyContent:'center',
    	    					      width:85,
    	    					      height:85,
    	    					      backgroundColor:colors.secondary,
    	    					      borderRadius:50,
    	    					      shadowColor: '#000',
    	    					      shadowOffset: { width: 1, height: 2 },
    	    					      shadowOpacity: 1,
    	    					      shadowRadius: 1.5,
    	    					      elevation: 10
    	    					  }}>
          	  					<Icon
          	  						name="add"
          	  						color={"white"}
          	  						size={80}
							  		onPress={() => { this.props.navigation.navigate('AddNote', {pageToReturn: "Calendar"}) }}
							  		style={{
							  			alignItems:'center',
							  			justifyContent:'center',
							  		}}
          	  					/>
          	  				</View> 
            			</View>
            			<View style={{flex: 3}}/>
          			</View>
          			<View style={{flex: 9, justifyContent: 'center', alignContent: 'center'}}>
					<View style={{marginLeft: 30, marginRight: 30}}>
						<Text style={{textAlign: "center"}}>
							Pas encore de page statistique dédiée créée pour le module Hypertension
						</Text>
					</View>
        		</View>
        		</View>
      		</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  myButton:{
    padding: 5,
    height: 200,
    width: 200,
    borderRadius:400,
    backgroundColor:'rgb(195, 125, 198)',

  }
});

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule())
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);