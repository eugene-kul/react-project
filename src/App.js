import React from "react";
import Layout from './hoc/Layout/Layout'
import {Routes, Route, Navigate} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {withRouter} from "./hoc/WithRouter";
import {autoLogIn} from "./store/actions/auth";
import AuthStatus from "./containers/AuthStatus/AuthStatus";

class App extends React.Component {
	
	componentDidMount() {
		this.props.autoLogin()
	}
	
	render() {
		console.log(localStorage.getItem('mail'))
		let routes = (
			<React.Fragment>
				<AuthStatus/>
				<Routes>
					<Route path={'/auth'} element={<Auth/>}/>
					<Route path={'/quiz/:id'} element={<Quiz/>}/>
					<Route path={'/'} element={<QuizList/>}/>
					<Route path="*" element={<Navigate replace to="/" />} />
				</Routes>
			</React.Fragment>
		)
		
		if (this.props.isAuthenticated) {
			routes = (
				<React.Fragment>
					<AuthStatus mail={localStorage.getItem('mail')}/>
					<Routes>
						<Route path={'/logout'} element={<Logout/>}/>
						<Route path={'/quiz-creator'} element={<QuizCreator/>}/>
						<Route path={'/quiz/:id'} element={<Quiz/>}/>
						<Route path={'/'} element={<QuizList/>}/>
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				</React.Fragment>
			)
		}
		
		return (
			<Layout>
				{ routes }
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token
	}
}

function mapDispatchToProps(dispatch) {
	return {
		autoLogin: () => dispatch(autoLogIn())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
