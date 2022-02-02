import React, {Component} from "react";
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizzes} from "../../store/actions/quiz";
import ErrorMassage from "../ErrorMassage/ErrorMassage";

class QuizList extends Component {
	
	renderQuizzes() {
		return this.props.quizzes.map(quiz => {
			return(
				<li
					key={quiz.id}
				>
					<NavLink to={'/quiz/'+ quiz.id}>
						{quiz.name}
					</NavLink>
				</li>
			)
		})
	}
	
	componentDidMount() {
		this.props.fetchQuizzes()
	}
	
	render() {
		return(
			<div className={classes.QuizList}>
				<h1>Список тестов</h1>
				
				{
					//this.props.error !== null
					//? <ErrorMassage errorMassage={this.props.error}/> :
					this.props.loading
						? <Loader/>
						: this.props.quizzes.length === 0
							? <p>НЕТ ТЕСТОВ</p>
							: <ul>
									{ this.renderQuizzes() }
								</ul>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		quizzes: state.quiz.quizzes,
		loading: state.quiz.loading,
		error: state.quiz.error
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizzes: () => dispatch(fetchQuizzes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)