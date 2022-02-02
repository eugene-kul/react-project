import React from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import {withRouter} from '../../hoc/WithRouter'
import Loader from "../../components/UI/Loader/Loader";
import { connect } from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";
import answerItem from "../../components/ActiveQuiz/AnswersList/AnswerItem/AnswerItem";

class Quiz extends React.Component {
	componentDidMount() {
		this.props.fetchQuizById(this.props.params.id)
	}
	
	componentWillUnmount() {
		this.props.retryQuiz()
	}
	
	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1 className={classes.QuizTitle}>Ответьте на вопросы</h1>
					<div className={classes.center}>
						{
							this.props.loading || !this.props.quiz
								? <Loader/>
								: this.props.isFinished
									? <FinishedQuiz
										results={this.props.results}
										quiz={this.props.quiz}
										onRetry={this.props.retryQuiz}
									/>
									: <ActiveQuiz
										question={this.props.quiz[this.props.activeQuestion].question}
										answers={this.props.quiz[this.props.activeQuestion].answers}
										onAnswerClick={this.props.quizAnswerClick}
										quizLength={this.props.quiz.length}
										answerNumber={this.props.activeQuestion+1}
										state={this.props.answerState}
									/>
						}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		results: state.quiz.results,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		isFinished: state.quiz.isFinished,
		quiz: state.quiz.quiz,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz))