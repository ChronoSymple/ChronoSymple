import React from 'react'
import {createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Login from '../Components/Auth/Login';
import SignIn from '../Components/Auth/SignIn';
import Home from '../Components/Home';
import ModulePlace from '../Components/Modules/ModulePlace';
import Profil from '../Components/Auth/Profil';
import ModuleProfil from '../Components/Auth/ModuleProfil';
import SearchDoctors from '../Components/Doctors/SearchDoctors';
import Calendar from '../Components/Modules/Calendar';
import DoctorChoice from '../Components/Doctors/DoctorChoice';
import ChooseModulesToSend from '../Components/Doctors/ChooseModulesToSend';
import DetailNote from '../Components/Modules/DetailNote';
import EditNote from '../Components/Modules/EditNote';
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
	Calendar: {
		screen : Calendar
	},
	AddNote: {
		screen: Note
	},
	DetailNote: {
		screen: DetailNote
	},
	EditNote: {
		screen: EditNote
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
	ModuleProfil: {
		screen: ModuleProfil,
	}
}, {
		headerMode: 'none'
})

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

const HomePrincipaleTabs = createBottomTabNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="apps"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Profil: {
		screen: Profil,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="account-circle"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, {
	headerMode: 'none',
	tabBarOptions: {
	    showLabel: false, // hide labels
	    activeTintColor: '#F8F8F8', // active icon color
	    inactiveTintColor: colors.secondary,  // inactive icon color
	    style: {
		backgroundColor: colors.primary // TabBar background
	    }
	},
});

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
	Calendar: {
		screen : CalendarStackNavigator,
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
				name="account-circle"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Home: {
		screen : HomePrincipaleTabs,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="home"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, {
	tabBarOptions: {
	    showLabel: false, // hide labels
	    activeTintColor: '#F8F8F8', // active icon color
	    inactiveTintColor: colors.secondary,  // inactive icon color
	    style: {
		backgroundColor: colors.primary // TabBar background
	    }
	},
});

const StackNavigtorWhithModule = createStackNavigator({
	Module: {
		screen: Tabs
	},
},{
	headerMode: 'none'
})

const StackNavigtorGlobalHome = createStackNavigator({
	HomeTabs: {
		screen: HomePrincipaleTabs,
	},
	Module: {
		screen: StackNavigtorWhithModule,
	},
	Stack: {
		screen: ModulePlace, navigationOptions: { title:'ModulPlace' }
	},
	ProfilStackNavigator : {
		screen: ProfilStackNavigator
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
	headerMode: 'none'
});


const LoginStack = createStackNavigator({
	Login : Login,
	SignIn : SignIn,
	Logout : Logout
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