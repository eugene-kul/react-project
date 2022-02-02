import React, {Component} from "react";
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";
import {auth} from "../../store/actions/auth";

class Auth extends Component {
	
	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Это чё за нахуй? Пиши нормальный email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Минимум 6 знаков!',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	}
	
	loginHandler = () => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			true
		)
	}
	
	registerHandler = () => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			false
		)
	}
	
	submitHandler = event => {event.preventDefault()};
	
	validateControl(value, validation) {
		if(!validation) { return true }
		
		let isValid = true
		
		if(validation.required) {
			isValid = value.trim() !== '' && isValid
		}
		
		if(validation.email) {
			isValid = is.email(value) && isValid
		}
		
		if(validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}
		
		return isValid
	}
	
	onChangeHandler(event, controlName) {
		const formControls = {...this.state.formControls}
		const control = {...formControls[controlName]}
		
		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)
		
		formControls[controlName] = control
		
		let isFormValid = true
		
		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})
		
		this.setState({
			formControls, isFormValid
		})
	}
	
	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName,index)=> {
			const control = this.state.formControls[controlName]
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					label={control.label}
					valid={control.valid}
					touched={control.touched}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={event=>this.onChangeHandler(event,controlName)}
				/>
			)
		})
	}
	
	render() {
		return (
			<div className={classes.Auth}>
				<h1>Auth</h1>
				<form onSubmit={this.submitHandler}>
					
					{ this.renderInputs() }
					
					<div className={classes.buttonBody}>
						<Button onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
						<Button type={'primary'} onClick={this.registerHandler} disabled={!this.state.isFormValid}>Регистрация</Button>
					</div>
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		auth: (email,password, isLogin) => dispatch(auth(email,password, isLogin))
	}
}

export default connect(null,mapDispatchToProps)(Auth)
