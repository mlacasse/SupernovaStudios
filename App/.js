//
//  
//  SupernovaStudios
//
//  Created by Neha.
//  Copyright © 2018 You.i. All rights reserved.
//

import React from "react"
import { StyleSheet } from "react-native"
import { View, Image, TouchableOpacity, Text } from "react-native"
import { strings } from "./../Locales/i18n"


export default class  extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			header: null,
			headerLeft: null,
			headerRight: null
		}
	}

	constructor(props) {
		super(props)
	}


	onBtnBackPressed = () => {
		this.props.navigation.goBack()
	}

	componentDidMount() {

		// Additional component initialization can go here.
		// If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	}

	render() {

		return (
			<View style={styles.settingsView}>
				<View pointerEvents="box-none" style={{
					position: "absolute",
					width: "100%",
					height: "100%"
				}}>
					<Image style={styles.kidsTabletSettingsImage} source={require("./../../Assets/images/kids-tablet-settings.png")} />
					<TouchableOpacity onPress={this.onBtnBackPressed} style={styles.btnBackButtonTouchable}>
						<Text style={styles.btnBackButton} />
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	settingsView: {
		backgroundColor: "rgba(255, 255, 255, 1)",
		flex: 1
	},
	kidsTabletSettingsImage: {
		resizeMode: "center",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 1025.00,
		height: 769.00,
		left: 0.00,
		top: 0.00,
		position: "absolute"
	},
	btnBackButton: {
		color: "rgba(0, 0, 0, 1)",
		fontSize: 12.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		justifyContent: "center",
		alignSelf: "stretch",
		width: "100%"
	},
	btnBackButtonTouchable: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 16.00,
		height: 17.00,
		left: 57.00,
		top: 36.00,
		position: "absolute",
		justifyContent: "center"
	}
})
