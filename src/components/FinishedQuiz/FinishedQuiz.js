import React from "react";
import Button from "../UI/Button/Button";
import classes from './FinishedQuiz.module.css'
import { Link } from 'react-router-dom'

const FinishedQuiz = props => {
	const successCount = Object.keys(props.results).reduce((total,key)=>{
		if(props.results[key] === 'success') total++
		return total
	},0)
	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{props.quiz.map((quizItem, index) => {
					const cls = [
						'fa',
						props.results[quizItem.id] === 'error' ? 'fa-times' : null,
						props.results[quizItem.id] === 'success' ? 'fa-check' : null,
						classes[props.results[quizItem.id]]
					]
					return (
						<li key={index}>

							<span>{index + 1}. </span>
							{quizItem.question}
							<i className={cls.join(' ')}/>
						</li>
					)
				})}

			</ul>

			<p>Правильно {successCount} из {props.quiz.length}</p>
			<div>
				<Button	onClick={props.onRetry}	type={'primary'}>Еще раз</Button>
				<Link to={'/'}>
					<Button	type={'success'}>Все тесты</Button>
				</Link>
			</div>
		</div>
	)
}

export default FinishedQuiz