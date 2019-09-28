import React from 'react'
import {Text, TouchableOpacity } from 'react-native'

class ModuleItem extends React.Component {
	render() {
    const { dModule, _addModule } = this.props
		return (
			<TouchableOpacity
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 3,
					borderColor: 'black',
					borderRadius: 10,
					backgroundColor : dModule.color,
					padding: 30,
					marginBottom: 30,
				}}
				onPress={() => _addModule(dModule.id)}>
					<Text style={{ fontSize: 20 }}>{dModule.name}</Text>
			</TouchableOpacity>
		)
	}
}

export default ModuleItem