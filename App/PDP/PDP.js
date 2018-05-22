//
//  PDP
//  SupernovaStudios
//
//  Created by Neha.
//  Copyright © 2018 You.i. All rights reserved.
//

import React from "react"
import { StyleSheet } from "react-native"
import { View, Image, Text, TouchableOpacity } from "react-native"
import { strings } from "./../Locales/i18n"


export default class PDP extends React.Component {

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
			<View style={styles.pdpView}>
				<View pointerEvents="box-none" style={{
					position: "absolute",
					width: "100%",
					height: "100%"
				}}>
					<Image style={styles.heroImageImage} source={require("./../../Assets/images/hero-image.png")} />
					<View style={styles.detailsView}>
						<View pointerEvents="box-none" style={{
							position: "absolute",
							width: "100%",
							height: "100%"
						}}>
							<Text numberOfLines={1} style={styles.titleText}>{strings("PDP.titleTextText")}</Text>
							<Text numberOfLines={1} style={styles.subtitleText}>{strings("PDP.subtitleTextText")}</Text>
							<Text numberOfLines={1} style={styles.descriptionText}>{strings("PDP.descriptionTextText")}</Text>
						</View>
					</View>
					<View style={styles.btnPlayView}>
						<View pointerEvents="box-none" style={{
							position: "absolute",
							width: "100%",
							height: "100%"
						}}>
							<Text numberOfLines={1} style={styles.labelPlayText}>{strings("PDP.labelPlayTextText")}</Text>
						</View>
					</View>
					<View style={styles.btnSaveView}>
						<View pointerEvents="box-none" style={{
							position: "absolute",
							width: "100%",
							height: "100%"
						}}>
							<Text numberOfLines={1} style={styles.saveText}>{strings("PDP.saveTextText")}</Text>
						</View>
					</View>
					<View style={styles.listView}>
						<View pointerEvents="box-none" style={{
							position: "absolute",
							width: "100%",
							height: "100%"
						}}>
							<View style={styles.template1View}>
								<View pointerEvents="box-none" style={{
									position: "absolute",
									width: "100%",
									height: "100%"
								}}>
									<Text numberOfLines={1} style={styles.titleTwoText}>{strings("PDP.titleTwoTextText")}</Text>
								</View>
							</View>
							<View style={styles.template2View}>
								<View pointerEvents="box-none" style={{
									position: "absolute",
									width: "100%",
									height: "100%"
								}}>
									<Text numberOfLines={1} style={styles.titleThreeText}>{strings("PDP.titleThreeTextText")}</Text>
								</View>
							</View>
							<View style={styles.template3View}>
								<View pointerEvents="box-none" style={{
									position: "absolute",
									width: "100%",
									height: "100%"
								}}>
									<Text numberOfLines={1} style={styles.titleFourText}>{strings("PDP.titleFourTextText")}</Text>
								</View>
							</View>
							<View style={styles.template4View}>
								<View pointerEvents="box-none" style={{
									position: "absolute",
									width: "100%",
									height: "100%"
								}}>
									<Text numberOfLines={1} style={styles.titleFiveText}>{strings("PDP.titleFiveTextText")}</Text>
								</View>
							</View>
							<View style={styles.template5View}>
								<View pointerEvents="box-none" style={{
									position: "absolute",
									width: "100%",
									height: "100%"
								}}>
									<Text numberOfLines={1} style={styles.titleSixText}>{strings("PDP.titleSixTextText")}</Text>
								</View>
							</View>
						</View>
					</View>
					<TouchableOpacity onPress={this.onBtnBackPressed} style={styles.btnBackButtonTouchable}>
						<Text style={styles.btnBackButton} />
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	pdpView: {
		backgroundColor: "rgba(255, 255, 255, 1)",
		flex: 1
	},
	heroImageImage: {
		resizeMode: "center",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 343.00,
		height: 431.00,
		left: 57.00,
		top: 90.00,
		position: "absolute"
	},
	detailsView: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 456.00,
		height: 336.00,
		left: 420.00,
		top: 90.00,
		position: "absolute"
	},
	titleText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Bold",
		fontSize: 20.00,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 48.00,
		height: 21.00,
		left: 0.00,
		top: 0.00,
		position: "absolute"
	},
	subtitleText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Medium",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 43.00,
		height: 19.00,
		left: 0.00,
		top: 31.00,
		position: "absolute"
	},
	descriptionText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 14.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 33.00,
		height: 15.00,
		left: 0.00,
		top: 64.00,
		position: "absolute"
	},
	btnPlayView: {
		backgroundColor: "rgba(216, 216, 216, 1)",
		borderWidth: 1.00,
		borderColor: "rgba(151, 151, 151, 1)",
		borderStyle: "solid",
		width: 184.00,
		height: 41.00,
		left: 428.00,
		top: 482.00,
		position: "absolute"
	},
	labelPlayText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 40.00,
		height: 19.00,
		left: 55.00,
		top: 11.00,
		position: "absolute"
	},
	btnSaveView: {
		backgroundColor: "rgba(216, 216, 216, 1)",
		borderWidth: 1.00,
		borderColor: "rgba(151, 151, 151, 1)",
		borderStyle: "solid",
		width: 184.00,
		height: 41.00,
		left: 648.00,
		top: 482.00,
		position: "absolute"
	},
	saveText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 44.00,
		height: 19.00,
		left: 53.00,
		top: 11.00,
		position: "absolute"
	},
	listView: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 940.00,
		height: 172.00,
		left: 55.00,
		top: 585.00,
		position: "absolute"
	},
	template1View: {
		backgroundColor: "rgba(216, 216, 216, 1)",
		borderWidth: 1.00,
		borderColor: "rgba(151, 151, 151, 1)",
		borderStyle: "solid",
		width: 172.00,
		height: 172.00,
		left: 0.00,
		top: 0.00,
		position: "absolute"
	},
	titleTwoText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 41.00,
		height: 19.00,
		left: 7.00,
		top: 146.00,
		position: "absolute"
	},
	template2View: {
		backgroundColor: "rgba(216, 216, 216, 1)",
		borderWidth: 1.00,
		borderColor: "rgba(151, 151, 151, 1)",
		borderStyle: "solid",
		width: 172.00,
		height: 172.00,
		left: 192.00,
		top: 0.00,
		position: "absolute"
	},
	titleThreeText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 41.00,
		height: 19.00,
		left: 7.00,
		top: 146.00,
		position: "absolute"
	},
	template3View: {
		backgroundColor: "rgba(216, 216, 216, 1)",
		borderWidth: 1.00,
		borderColor: "rgba(151, 151, 151, 1)",
		borderStyle: "solid",
		width: 172.00,
		height: 172.00,
		left: 384.00,
		top: 0.00,
		position: "absolute"
	},
	titleFourText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 41.00,
		height: 19.00,
		left: 7.00,
		top: 146.00,
		position: "absolute"
	},
	template4View: {
		backgroundColor: "rgba(216, 216, 216, 1)",
		borderWidth: 1.00,
		borderColor: "rgba(151, 151, 151, 1)",
		borderStyle: "solid",
		width: 172.00,
		height: 172.00,
		left: 576.00,
		top: 0.00,
		position: "absolute"
	},
	titleFiveText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 41.00,
		height: 19.00,
		left: 7.00,
		top: 146.00,
		position: "absolute"
	},
	template5View: {
		backgroundColor: "rgba(216, 216, 216, 1)",
		borderWidth: 1.00,
		borderColor: "rgba(151, 151, 151, 1)",
		borderStyle: "solid",
		width: 172.00,
		height: 172.00,
		left: 768.00,
		top: 0.00,
		position: "absolute"
	},
	titleSixText: {
		color: "rgba(0, 0, 0, 1)",
		fontFamily: "DIN-Light",
		fontSize: 18.00,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 41.00,
		height: 19.00,
		left: 7.00,
		top: 146.00,
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
