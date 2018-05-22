//
//  App
//  SupernovaStudios
//
//  Created by Neha.
//  Copyright © 2018 You.i. All rights reserved.
//

import React from "react"
import { StackNavigator } from "react-navigation"
import Lander from "./App/Lander/Lander"
import PDP from "./App/PDP/PDP"
import  from "./App//"
import { Font } from "expo"
import I18n from "react-native-i18n"

MultiNavigator = (routeConfigs, navigatorConfig) => {
	const CardStackNavigator = StackNavigator(routeConfigs, navigatorConfig);
	const modalRouteConfig = {};
	const routeNames = Object.keys(routeConfigs);
	
	for (let i = 0; i < routeNames.length; i++) {
	   modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
	}
	
	const MultiNavigator = StackNavigator({
	   CardStackNavigator: { screen: CardStackNavigator },
	   ...modalRouteConfig
	}, {
	   mode: 'modal'
	});
	
	return MultiNavigator;
}

const RootStack = MultiNavigator({
	Lander: {
		screen: Lander
	},
	PDP: {
		screen: PDP
	},
	: {
		screen: 
	}
}, {
	initialRouteName: "Lander"
});


export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			fontsReady: false,
			localeReady: false
		}
	}


	async initProjectFonts() {

		// Any additional project fonts can be fetched here.
		await Font.loadAsync({ 'DIN-Light': require('./Assets/fonts/FF DIN-Light'), 'DIN-Bold': require('./Assets/fonts/FF DIN-Bold'), 'DIN-Medium': require('./Assets/fonts/FF DIN-Medium') })
		this.setState({
			fontsReady: true
		})
	}

	async initLocale() {

		I18n.locale = await Expo.Util.getCurrentLocaleAsync()
		this.setState({
			localeReady: true
		})
	}

	componentDidMount() {

		this.initProjectFonts()
		this.initLocale()
		
		// If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	}

	render() {

		if (!this.state.fontsReady || !this.state.localeReady) { return (<Expo.AppLoading/>); }
		return (
			<RootStack />
		)
	}
}
