//
//  Template2
//  SupernovaStudios
//
//  Created by Neha.
//  Copyright © 2018 You.i. All rights reserved.
//

import React from "react"
import { StyleSheet } from "react-native"
import { View, TouchableHighlight, Image, Text } from "react-native"
import { strings } from "./../Locales/i18n"


export default class Template2 extends React.Component {

	constructor(props) {
		super(props)
	}


	componentDidMount() {

		// Additional component initialization can go here.
		// If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	}

	render() {

		return (
			<TouchableHighlight style={styles.template2Touchable}>
				<View style={styles.template2}>
					<View pointerEvents="box-none" style={{
						position: "absolute",
						width: "100%",
						height: "100%"
					}}>
						<Image style={styles.imageImage} source={require("./../../Assets/images/image.png")} />
						<Text numberOfLines={1} style={styles.titleText}>{strings("Lander.titleTextText")}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	template2: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 346.00,
		height: 194.00
	},
	imageImage: {
		resizeMode: "stretch",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 346.00,
		height: 194.00,
		left: 0.00,
		top: 0.00,
		position: "absolute"
	},
	titleText: {
		color: "rgba(255, 255, 255, 1)",
		fontFamily: "DIN-Bold",
		fontSize: 20.00,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "rgba(0, 0, 0, 0)",
		width: 48.00,
		height: 21.00,
		left: 14.00,
		top: 165.00,
		position: "absolute"
	}
})
