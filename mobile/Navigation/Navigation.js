import React from 'react'
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Login from '../Components/Auth/Login';
import SignIn from '../Components/Auth/SignIn';
import Home from '../Components/Home';
import ModulePlace from '../Components/Modules/ModulePlace';
import Profile from '../Components/Auth/Profile';
import Calendar from '../Components/Modules/Calendar';
import StatisticHypertension from '../Components/Modules/StatisticHypertension';
import StatisticDiabetes from '../Components/Modules/StatisticDiabetes';
import StatisticAsthma from '../Components/Modules/StatisticAsthma';
import AddNote from '../Components/Modules/Note';
import EditNote from '../Components/Modules/EditNote';
import ExportPDF from '../Components/Modules/ExportPDF';
import Logout from '../Components/Auth/Logout'
import Loading from '../Components/Loading'
import Check from '../Components/CheckModule'
import { Transition } from 'react-native-reanimated';

import AProposProfile from '../Components/Auth/Profile/AProposProfile';
import ContactProfile from '../Components/Auth/Profile/ContactProfile';
import FAQProfile from '../Components/Auth/Profile/FAQProfile';
import PasswordProfile from '../Components/Auth/Profile/PasswordProfile';
import SupportProfile from '../Components/Auth/Profile/SupportProfile';
import Settings from '../Components/Auth/Profile/Settings';

import DoctorCard from '../Components/Doctors/DoctorCard';
import SearchDoctors from '../Components/Doctors/SearchDoctors';
import AllDoctors from '../Components/Doctors/AllDoctors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import AccountValidation from "../Components/Auth/AccountValidation";
import { styles, colors, windowSize } from '../Components/StyleSheet'
/*
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

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
	EditNote: {
		screen: EditNote
	},
	ExportPDF: {
		screen: ExportPDF
	},
}, {
	headerMode: 'none'
})

const ProfileStackNavigator = createStackNavigator({
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
	},
	Settings: {
		screen: Settings,
	}
}, {
		headerMode: 'none'
})

const DoctorCardStackNavigator = createStackNavigator({
	DoctorCard: {
		screen: DoctorCard,
	}
}, {
	headerMode: 'none'
})

const AllDoctorsStackNavigator = createStackNavigator({
	AllDoctors: {
		screen: AllDoctors,
	}
}, {
	headerMode: 'none'
})

const SearchDoctorsStackNavigator = createStackNavigator({
	SearchDoctors: {
		screen: SearchDoctors,
	}
}, {
	headerMode: 'none'
})

const StackNavigtorWhithModule = createStackNavigator({
	Check: {
		screen: Check
	},
	StatisticDiabete: {
		screen: StatisticDiabete
	},
	StatisticAsthma: {
		screen: StatisticAsthma
	}
},{
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
	initialRouteName: 'Home',
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

const ModuleTab = createBottomTabNavigator({
	Statistic: {
		screen : StackNavigtorWhithModule,
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

const StackNavigtorGlobalHome = createStackNavigator({
	HomeTabs : HomePrincipaleTabs,
	Module : ModuleTab,
	Stack: {
		screen: ModulePlace, navigationOptions: { title:'ModulePlace' }
	},
	ProfileStackNavigator : ProfileStackNavigator,
	CalendarStackNavigator : CalendarStackNavigator,
	DoctorCardStackNavigator : DoctorCardStackNavigator,
	SearchDoctorsStackNavigator: SearchDoctorsStackNavigator,
	AllDoctorsStackNavigator: AllDoctorsStackNavigator,
	AddNote: {
		screen: AddNote
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
*/

const AllDoctorsStackNavigator = createStackNavigator({
	AllDoctors: {
		screen: AllDoctors,
	}
}, {
	headerMode: 'none'
})

const ProfilBottomTabNavigator = createBottomTabNavigator({
	Infos: {
		screen : Profile,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
					name="person"
					color={tintColor}
					size={40}
			    />
		)})
	},
	Médecins: {
		screen : AllDoctors,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
					name="list"
					color={tintColor}
					size={40}
			    />
		)})
	},
	Paramètres: {
		screen : Settings,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
			    <Icon
					name="settings"
					color={tintColor}
					size={40}
			    />
		)})
	}
}, {
	headerMode: 'none',
	tabBarOptions: {
	    showLabel: false,
	    activeTintColor: colors.secondary,
	},
})

const CalendarStackNavigator = createStackNavigator({
	Calendar: {
		screen : Calendar
	},
	EditNote: {
		screen: EditNote
	},
	ExportPDF: {
		screen: ExportPDF
	},
}, {
	headerMode: 'none'
})

const StackNavigtorWhithModule = createStackNavigator({
	Check: {
		screen: Check
	},
	StatisticDiabetes: {
		screen: StatisticDiabetes
	},
	StatisticAsthma: {
		screen: StatisticAsthma
	},
	StatisticHypertension: {
		screen: StatisticHypertension
	},
	Calendar: {
		screen: CalendarStackNavigator
	},
},{
	headerMode: 'none'
})

const StackNavigtorSearchDoctor = createStackNavigator({
	SearchDoctors: {
		screen: SearchDoctors
	},
	DoctorCard: {
		screen: DoctorCard
	}
},{
	headerMode: 'none'
})

const ModuleTab = createStackNavigator({
	Statistic: {
		screen : StackNavigtorWhithModule,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon
				name="insert-chart"
				color={tintColor}
				size={40}
			    />
			)
		})
	}
},{
	headerMode: 'none'
})
		
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
	Home : Home,
	Module : ModuleTab,
	StackNavigtorSearchDoctor : StackNavigtorSearchDoctor,
	Stack: {
		screen: ModulePlace, navigationOptions: { title:'ModulePlace' }
	},
	AddNote: {
		screen: AddNote
	},
	Profil: {
		screen: ProfilBottomTabNavigator
	}
},{
	headerMode: 'none'
});
		
export default createAppContainer(StackNavigator);