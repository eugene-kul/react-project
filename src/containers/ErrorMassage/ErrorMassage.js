import React from "react";
import classes from "./ErrorMassage.module.css";

const ErrorMassage = props => {
	return (
		<div className={classes.ErrorMassage}>
			<h1>ERROR</h1>
			<p>{String(props.errorMassage)}</p>
		</div>
	)
}

export default ErrorMassage