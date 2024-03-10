import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	ImageBackground,
	Image,
	Alert,
	ToastAndroid,
	KeyboardAvoidingView,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config';
import {
	collection,
	query,
	where,
	getDocs,
	Timestamp,
	limit,
	addDoc,
	doc,
	updateDoc,
	increment,
} from 'firebase/firestore';

const bgImage = require('../assets/background2.png');
const appIcon = require('../assets/appIcon.png');
const appName = require('../assets/appName.png');

export default class LoginScreen extends React.Component{
    constructor(props){
        super();
        this.state = {
            email: "",
            password: "",
        }
    }

    handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(email, password, auth)
        .then(() => {
            this.props.navigation.navigate('BottomTab')
        })
        .catch((error) => {
            Alert.alert(error.message);
        })
    }

    render() {
        const{email,password}this.state({
            return(
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
				<ImageBackground source={bgImage} style={styles.bgImage}>
					<View style={styles.upperContainer}>
						<Image source={appIcon} style={styles.appIcon} />
						<Image source={appName} style={styles.appName} />
					</View>
					<View style={styles.lowerContainer}>
						<View style={styles.textinputContainer}>
							<TextInput
								style={styles.textinput}
								placeholder={'Email'}
								placeholderTextColor={'#FFFFFF'}
								onChangeText={(text) => this.setState({ email: text })}
							/>
						</View>
						<View style={[styles.textinputContainer, { marginTop: 25 }]}>
							<TextInput
								style={styles.textinput}
								placeholder={'Password'}
								placeholderTextColor={'#FFFFFF'}
								secureTextEntry
                            />
							
						</View>
						<TouchableOpacity
							style={[styles.button, { marginTop: 25 }]}
							onPress={this.handleLogin(email,password)}>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
            )
        })
    }
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    },
    bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    },
    
    upperContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    },
    appIcon: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginTop: 80,
    },
    appName: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    },
    lowerContainer: {
    flex: 0.5,
    alignItems: 'center',
    },
    textinput: {
    width: '75%',
    height: 55,
    padding: 10,
    borderColor: '#FFFFFF',
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Rajdhani_600SemiBold',
    backgroundColor: '#5653D4',
    },
    button: {
    width: '43%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F48D20',
    borderRadius: 15,
    },
    buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Rajdhani_600SemiBold',
    },
    });