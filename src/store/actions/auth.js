import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function authSuccess(token) {
	return {
		type: AUTH_SUCCESS,
		token
	}
}

export function autoLogOut(expiresIn) {
	return dispatch => {
		setTimeout(()=>{
			dispatch(logOut())
		}, expiresIn*1000)
	}
}

export function logOut() {
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
	localStorage.removeItem('expirationDate')
	return {
		type: AUTH_LOGOUT
	}
}

export function autoLogIn() {
	return dispatch => {
		const token = localStorage.getItem('token')
		if(!token) {
			dispatch(logOut())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate <= new Date()) {
				dispatch(logOut())
			} else {
				dispatch(authSuccess(token))
				dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime())/1000))
			}
		}
	}
}

export function auth(email,password, isLogin) {
	return async dispatch => {
		const authData = {
			email, password,
			returnSecureToken: true
		}
		
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCguHZ_k-jAbMPMOu9mXsU0WocNMGZ4Zqs'
		
		if(isLogin) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCguHZ_k-jAbMPMOu9mXsU0WocNMGZ4Zqs'
		}
		
		const response = await axios.post(url, authData)
		
		const data = response.data
		const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
		
		localStorage.setItem('token', data.idToken)
		localStorage.setItem('userId', data.localId)
		localStorage.setItem('expirationDate', expirationDate)
		localStorage.setItem('mail', data.email)
		
		console.log(data)
		
		dispatch(authSuccess(data.idToken))
		dispatch(autoLogOut(data.expiresIn))
	}
}