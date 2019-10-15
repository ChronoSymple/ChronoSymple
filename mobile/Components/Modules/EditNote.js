// Components/ModulePlace.js

import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import { connect } from 'react-redux'
import { getUserToken } from '../../Redux/Action/action';
import { APIRemovePatientNotes } from '../../API/APIModule'

class EditNote extends React.Component {
	_bootstrapAsync = (id) => {
        console.log(id)
        this.props.getUserToken().then(() => {
            APIRemovePatientNotes(this.props.props.token, myTab, id).then(data => {
                if (data.status == 200)
                    this.setState({ isSend: true })
            })
        }).catch(error => {
            this.setState({ error })
        })
    }

	render() {
		let item = this.props.navigation.getParam('data')
		return (
			<View style={styles.main_container}>
				<Text style={styles.moduleText}>Glycemie : {item.Glycemie}</Text>
				<Text>{"\n"}</Text>
				<Text style={styles.moduleText}>Glucide : {item.Glucide}</Text>
				<Text>{"\n"}</Text>
				<Text style={styles.moduleText}>Insuline a jeun : {item.InsulineAvRepas}</Text>
				<Text>{"\n"}</Text>
				<Text style={styles.moduleText}>Insuline avant repas : {item.InsulineApRepas}</Text>
				<Text>{"\n"}</Text>			
				<Text style={styles.moduleText}>Insuline après repas : {item.InsulineAJeun}</Text>

                <View style={{ flex: 1, justifyContent: "center"}}>
						<Button 
							color={"#CD3621"}
							onPress={() => this._bootstrapAsync(item.id)}
							title={Add}
						/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1, 
		justifyContent: "center", 
		alignItems: "center"
	},
	moduleText: {
		fontSize: 20
	}
})

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
