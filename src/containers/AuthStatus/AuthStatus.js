import React from "react";
import classes from './AuthStatus.module.css'
import { NavLink } from 'react-router-dom'

function AuthStatus(props) {
	let status = (
		<div>
			<NavLink to={"/auth"}>Вход</NavLink>
		</div>
	)
	if(props.mail) {
		status = (<div><span>{props.mail}</span><NavLink to={"/logout"}>Выход</NavLink></div>)
	}
	return (
		<div className={classes.AuthStatus}>{ status }</div>
	)
}

export default AuthStatus