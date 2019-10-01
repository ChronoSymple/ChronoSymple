import React from 'react'
import {createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Login from '../Components/Auth/Login';
import SignIn from '../Components/Auth/SignIn';
import Home from '../Components/Home';
import ModulePlace from '../Components/Modules/ModulePlace';
import Profil from '../Components/Auth/Profil';
import SearchDoctors from '../Components/Doctors/SearchDoctors';
import Calendar from '../Components/Modules/Calendar';
import DoctorChoice from '../Components/Doctors/DoctorChoice';
import ChooseModulesToSend from '../Components/Doctors/ChooseModulesToSend';
import DetailNote from '../Components/Modules/DetailNote';
import Statistic from '../Components/Modules/Statistic';
import Export from '../Components/Modules/Export';
import Note from '../Components/Modules/Note';
import Logout from '../Components/Auth/Logout'
import Loading from '../Components/Loading'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyDoctorChoice from '../Components/Doctors/MyDoctorChoice'
import { styles, colors, windowSize } from '../Components/StyleSheet'

_menu = null;
 
setMenuRef = ref => {
  this._menu = ref;
};

hideMenu = () => {
  this._menu.hide();
};

showMenu = () => {
  this._menu.show();
};

/* NOT USED !!!!
const HomeModuleStackNavigator = createStackNavigator({
	HomeModule: {
	  screen: HomeModule,
	}
})*/

/*const NoteStackNavigator = createStackNavigator({
	Note: {
	  screen: Note,
	}
})*/

const CalendarStackNavigator = createStackNavigator({
	DetailNote: {
		screen: DetailNote
	}
}, {
	headerMode: 'none'
})

/*const StatisticStackNavigator = createStackNavigator({
	Statistic: {
		screen: Statistic,
	}
})*/

/*const ExportStackNavigator = createStackNavigator({
	Export: {
	  screen: Export,
	}
})
*/
const ProfilStackNavigator = createStackNavigator({
	Profil: {
	  screen: Profil
	},
	SearchDoctors: {
	  screen : SearchDoctors
	},
	Logout: { screen : Logout,
		navigationOptions: {
			headerMode: 'none'
		},
	}
}, {
		headerMode: 'none'
})

/* END NOT USED */

const DoctorChoiceStackNavigator = createStackNavigator({
	DoctorChoice: {
		screen: DoctorChoice,
	}
}, {
	headerMode: 'none'
})

const MyDoctorChoiceStackNavigator = createStackNavigator({
	MyDoctorChoice: {
		screen: MyDoctorChoice,
	}
}, {
	headerMode: 'none'
})


const ChooseModulesToSendStackNavigator = createStackNavigator({
	ChooseModulesToSend: {
		screen: ChooseModulesToSend,
	}
}, {
	headerMode: 'none'
})

const Tabs = createBottomTabNavigator({

	Statistic: {
		screen : Statistic,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="show-chart"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Note: {
		screen : Note,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="note-add"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Calendar: {
		screen : Calendar,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="archive"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Export: {
		screen : Export,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="cloud-upload"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Profil: {
		screen : Profil,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="person"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, {
	tabBarOptions: {
	    showLabel: false, // hide labels
	    activeTintColor: colors.secondary, // active icon color
	    inactiveTintColor: '#F8F8F8',  // inactive icon color
	    style: {
		backgroundColor: colors.primary // TabBar background
	    }
	},
});

const StackNavigtorWhithModule = createStackNavigator({
	HomeModule: {
		screen: Tabs
	},
},{
	headerMode: 'none'
})

const StackNavigtorGlobalHome = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			title:'Home',
			headerStyle: {backgroundColor: '#58b57d'},
			headerTintColor: 'white',
			textAlign: 'center',

		}),
	},
	Module: {
		screen: StackNavigtorWhithModule,
		navigationOptions: { 
			title:'Diabètes',
			headerStyle: {backgroundColor: '#58b57d'},
			headerTintColor: 'white',
			textAlign: 'center'
		}
	},
	Stack: {
		screen: ModulePlace, navigationOptions: { title:'ModulPlace' }
	},
	Profil: {
		screen: ProfilStackNavigator, navigationOptions: { title:'Profil' }
	},
	CalendarStackNavigator : {
		screen : CalendarStackNavigator
	},
	ChooseModulesToSendStackNavigator : ChooseModulesToSendStackNavigator,
	DoctorChoiceStackNavigator: {
		screen: DoctorChoiceStackNavigator
	},
	MyDoctorChoiceStackNavigator: {
		screen: MyDoctorChoiceStackNavigator
	}
}, {
	navigationOptions: () => ({
		headerRight: ({tintColor}) => (
			<Button
			title="Click to Alert"
		    /> 
	)})
});



const LoginStack = createStackNavigator({
	Login : Login,
	SignIn : SignIn,
}, {
	headerMode : 'none'
})

const StackNavigator = createStackNavigator({
	Loading : Loading,
	LoginStack : LoginStack,
	Drawer: {
		screen: StackNavigtorGlobalHome
	}
},{
	headerMode: 'none'
});
	  
export default createAppContainer(StackNavigator);