//
//  Lander
//  SupernovaStudios
//
//  Created by Neha.
//  Copyright © 2018 You.i. All rights reserved.
//

import React from "react"
import { StyleSheet } from "react-native"
import { View, FlatList, TouchableHighlight, Image, Text, TouchableOpacity } from "react-native"
import { strings } from "./../Locales/i18n"
import Template1 from "./Template1"
import Template2 from "./Template2"
import Template3 from "./Template3"
import Template4 from "./Template4"


export default class Lander extends React.Component {

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


	createCellForListFlatList = ({ item }) => {
		switch(item.cellType) {
			case 0: return this.renderTemplate1(item);
			case 1: return this.renderTemplate2(item);
			case 2: return this.renderTemplate3(item);
			case 3: return this.renderTemplate4(item);
		}
	}

	listFlatListMockData = [{
			key: "0",
			cellType: 0
		}, {
			key: "1",
			cellType: 1
		}, {
			key: "2",
			cellType: 2
		}, {
			key: "3",
			cellType: 3
		}, {
			key: "4",
			cellType: 0
		}, {
			key: "5",
			cellType: 1
		}, {
			key: "6",
			cellType: 2
		}, {
			key: "7",
			cellType: 3
		}, {
			key: "8",
			cellType: 0
		}, {
			key: "9",
			cellType: 1
		}, {
			key: "10",
			cellType: 2
		}, {
			key: "11",
			cellType: 3
		}, {
			key: "12",
			cellType: 0
		}, {
			key: "13",
			cellType: 1
		}, {
			key: "14",
			cellType: 2
		}, {
			key: "15",
			cellType: 3
		}, {
			key: "16",
			cellType: 0
		}, {
			key: "17",
			cellType: 1
		}, {
			key: "18",
			cellType: 2
		}, {
			key: "19",
			cellType: 3
		}]

	onFEATUREDPressed = () => {
		const { navigate } = this.props.navigation
		navigate("PDP", {})
	}

	onMOVIESPressed = () => {
		const { navigate } = this.props.navigation
		navigate("PDP", {})
	}

	onSHOWSPressed = () => {
		const { navigate } = this.props.navigation
		navigate("PDP", {})
	}

	onBtnSettingsPressed = () => {
		const { navigate } = this.props.navigation
		navigate("Modal", {})
	}

	componentDidMount() {

		// Additional component initialization can go here.
		// If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	}

	render() {

		return (
			<View style={styles.landerView}>
				<View pointerEvents="box-none" style={{
					position: "absolute",
					width: "100%",
					height: "100%"
				}}>
					<FlatList renderItem={this.createCellForListFlatList} data={this.listFlatListMockData} numColumns={2} style={styles.listFlatList} />
					<Image style={styles.featureImageImage} source={require("./../../Assets/images/feature-image.png")} />
					<View style={styles.navbarView}>
						<View pointerEvents="box-none" style={{
							position: "absolute",
							width: "100%",
							height: "100%"
						}}>
							<Image style={styles.kaboomTabletLanderLogoImage} source={require("./../../Assets/images/kaboom-tablet-lander-logo.png")} />
							<TouchableOpacity onPress={this.onFEATUREDPressed} style={styles.featuredButtonTouchable}>
								<Text numberOfLines={1} style={styles.featuredButton}>{strings("Lander.featuredButtonText")}</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.onMOVIESPressed} style={styles.moviesButtonTouchable}>
								<Text numberOfLines={1} style={styles.moviesButton}>{strings("Lander.moviesButtonText")}</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.onSHOWSPressed} style={styles.showsButtonTouchable}>
								<Text numberOfLines={1} style={styles.showsButton}>{strings("Lander.showsButtonText")}</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.onBtnSettingsPressed} style={styles.btnSettingsButtonTouchable}>
								<Text style={styles.btnSettingsButton} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		)
	}

	renderTemplate1(item) {

		return (
			<Template1 />
		)
	}

	renderTemplate2(item) {

		return (
			<Template2 />
		)
	}

	renderTemplate3(item) {

		return (
			<Template3 />
		)
	}

	renderTemplate4(item) {

		return (
			<Template4 />
		)
	}
}

const styles = StyleSheet.create({
	landerView: {
		backgroundColor: "rgba(72, 23, 93, 1)",
		flex: 1
	},
	listFlatList: {
		backgroundColor: "rgba(73, 22, 91, 1)",
		shadowOffset: {width: 2.0, height: 2.0},
		shadowColor: "rgba(0, 0, 0, 0.30)",
		shadowRadius: 2.00,
		shadowOpacity: 1,
		width: 717.00,
		height: 417.00,
		left: 271.00,
		top: 468.00,
		position: "absolute"
	},
	featureImageImage: {
		resizeMode: "stretch",
		backgroundColor: "rgba(0, 0, 0, 0)",
		shadowOffset: {width: 1.0, height: 1.0},
		shadowColor: "rgba(0, 0, 0, 0.50)",
		shadowRadius: 2.00,
		shadowOpacity: 1,
		width: 714.00,
		height: 402.00,
		left: 271.00,
		top: 38.00,
		position: "absolute"
	},
	navbarView: {
		backgroundColor: "rgba(237, 230, 239, 1)",
		width: 246.00,
		height: 771.00,
		left: 0.00,
		top: -2.00,
		position: "absolute"
	},
	kaboomTabletLanderLogoImage: {
		resizeMode: "center",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 146.00,
		height: 40.00,
		left: 41.00,
		top: 131.00,
		position: "absolute"
	},
	featuredButton: {
		color: "rgba(106, 36, 136, 1)",
		fontFamily: "DIN-Bold",
		fontSize: 14.00,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		justifyContent: "center",
		alignSelf: "stretch",
		width: "100%"
	},
	featuredButtonTouchable: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 77.00,
		height: 15.00,
		left: 35.00,
		top: 299.00,
		position: "absolute",
		justifyContent: "center"
	},
	moviesButton: {
		color: "rgba(106, 36, 136, 1)",
		fontFamily: "DIN-Bold",
		fontSize: 14.00,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		justifyContent: "center",
		alignSelf: "stretch",
		width: "100%"
	},
	moviesButtonTouchable: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 57.00,
		height: 15.00,
		left: 36.00,
		top: 363.00,
		position: "absolute",
		justifyContent: "center"
	},
	showsButton: {
		color: "rgba(106, 36, 136, 1)",
		fontFamily: "DIN-Bold",
		fontSize: 14.00,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		justifyContent: "center",
		alignSelf: "stretch",
		width: "100%"
	},
	showsButtonTouchable: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 55.00,
		height: 15.00,
		left: 37.00,
		top: 425.00,
		position: "absolute",
		justifyContent: "center"
	},
	btnSettingsButton: {
		color: "rgba(0, 0, 0, 1)",
		fontSize: 12.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		justifyContent: "center",
		alignSelf: "stretch",
		width: "100%"
	},
	btnSettingsButtonTouchable: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 32.00,
		height: 32.00,
		left: 39.00,
		top: 488.00,
		position: "absolute",
		justifyContent: "center"
	}
})
