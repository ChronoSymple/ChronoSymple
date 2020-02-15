import React from 'react'
import {createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Login from '../Components/Auth/Login';
import SignIn from '../Components/Auth/SignIn';
import Home from '../Components/Home';
import ModulePlace from '../Components/Modules/ModulePlace';
import Profile from '../Components/Auth/Profile';
import ModuleProfile from '../Components/Auth/ModuleProfile';
import SearchDoctors from '../Components/Doctors/SearchDoctors';
import Calendar from '../Components/Modules/Calendar';
import DoctorChoice from '../Components/Doctors/DoctorChoice';
import ChooseModulesToSend from '../Components/Doctors/ChooseModulesToSend';
import DetailNote from '../Components/Modules/DetailNote';
import EditNote from '../Components/Modules/EditNote';
import StatisticDiabete from '../Components/Modules/StatisticDiabete';
import StatisticAsthma from '../Components/Modules/StatisticAsthma';
import Export from '../Components/Modules/Export';
import Note from '../Components/Modules/Note';
import Logout from '../Components/Auth/Logout'
import Loading from '../Components/Loading'
import Check from '../Components/CheckModule'
import InfoProfile from '../Components/Auth/Profile/InfoProfile';
import PasswordProfile from '../Components/Auth/Profile/PasswordProfile';
import SupportProfile from '../Components/Auth/Profile/SupportProfile';
import ContactProfile from '../Components/Auth/Profile/ContactProfile';
import AProposProfile from '../Components/Auth/Profile/AProposProfile';
import FAQProfile from '../Components/Auth/Profile/FAQProfile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyDoctorChoice from '../Components/Doctors/MyDoctorChoice';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import AccountValidation from "../Components/Auth/AccountValidation";
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

const ProfileStackNavigator = createStackNavigator({
	InfoProfile: {
		screen: InfoProfile,
	},
	ModuleProfile: {
		screen: ModuleProfile,
	},
	PasswordProfile: {
		screen: PasswordProfile,
	},
	SupportProfile: {
		screen: SupportProfile,
	},
	FAQProfile: {
		screen: FAQProfile,
	},
	ContactProfile: {
		screen: ContactProfile,
	},
	AProposProfile: {
		screen: AProposProfile,
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
	Profile: {
		screen: Profile,
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
	    showLabel: false,
	    activeTintColor: '#F8F8F8',
	    inactiveTintColor: colors.secondary,
	    style: {
		backgroundColor: colors.primary
	    }
	},
});

const TabsAsthma = createBottomTabNavigator({
	Statistic: {
		screen : StatisticAsthma,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="insert-chart"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Calendar: {
		screen : StatisticAsthma,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon2
				name="notes-medical"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Export: {
		screen : StatisticAsthma,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="cloud-upload"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Profile: {
		screen : Profile,
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
		screen : Home,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="apps"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, {
	
	tabBarOptions: {
	    showLabel: false,
	    activeTintColor: '#F8F8F8',
	    inactiveTintColor: colors.secondary,
	    style: {
		backgroundColor: colors.primary
	    }
	},
});

const TabsDiabete = createBottomTabNavigator({
	Statistic: {
		screen : StatisticDiabete,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="insert-chart"
				color={tintColor}
				size={40}
			    />
		)})
	},
	Calendar: {
		screen : CalendarStackNavigator,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon2
				name="notes-medical"
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
	Profile: {
		screen : Profile,
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
		screen : Home,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
				name="apps"
				color={tintColor}
				size={40}
			    />
		)})
	},
}, {
	
	tabBarOptions: {
	    showLabel: false,
	    activeTintColor: '#F8F8F8',
	    inactiveTintColor: colors.secondary,
	    style: {
		backgroundColor: colors.primary
	    }
	},
});

const StackNavigtorWhithModule = createStackNavigator({
	Check: {
		screen: Check
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
		screen: ModulePlace, navigationOptions: { title:'ModulePlace' }
	},
	ProfileStackNavigator : {
		screen: ProfileStackNavigator
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
	},
	ModuleDiabete: {
		screen: TabsDiabete
	},
	ModuleAsthma: {
		screen: TabsAsthma
	}
}, {
	headerMode: 'none'
});


const LoginStack = createStackNavigator({
	Login : Login,
	SignIn : SignIn,
	Logout : Logout,
	AccountValidation : AccountValidation,
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