import React from "react";
import {connect} from "react-redux";
import {logOut} from "../../store/actions/auth";
import {Navigate, Route, Routes} from "react-router-dom";

class Logout extends React.Component {
	componentDidMount() {
		this.props.logOut()
	}
	
	render() {
		return (
			<div></div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logOut: () => dispatch(logOut())
	}
}

export default connect(null, mapDispatchToProps)(Logout)