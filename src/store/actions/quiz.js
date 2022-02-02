import axios from "../../axios/axios-quiz";
import {
	FETCH_QUIZ_SUCCESS,
	FETCH_QUIZZES_ERROR,
	FETCH_QUIZZES_START,
	FETCH_QUIZZES_SUCCESS,
	FINISH_QUIZ,
	QUIZ_SET_STATE,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizzes() {
	return async dispatch => {
		dispatch(fetchQuizzesStart())
		try {
			const response = await axios.get('/quizzes.json')

			const quizzes = []
			Object.keys(response.data).forEach((key,index)=> {
				quizzes.push({
					id: key,
					name: `Тест #${index + 1}`
				})
			})

			dispatch(fetchQuizzesSuccess(quizzes))
		} catch (e) {
			dispatch(fetchQuizzesError(e))
		}
	}
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export function fetchQuizById(quizId) {
	return async dispatch => {
		dispatch(fetchQuizzesStart())
		
		try {
			const response = await axios.get(`/quizzes/${quizId}.json`)
			const quiz = response.data
			
			dispatch(fetchQuizSuccess(quiz))
			
		} catch (e) {
			dispatch(fetchQuizzesError(e))
		}
	}
}

export function fetchQuizzesStart() {
	return {
		type: FETCH_QUIZZES_START
	}
}

export function fetchQuizzesSuccess(quizzes) {
	return {
		type: FETCH_QUIZZES_SUCCESS,
		quizzes
	}
}

export function fetchQuizzesError(e) {
	return {
		type: FETCH_QUIZZES_ERROR,
		error: e
	}
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ
	}
}

export function getNextQuestion(activeQuestion) {
	return {
		type: QUIZ_NEXT_QUESTION,
		activeQuestion
	}
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY
	}
}

export function quizAnswerClick(answerId) {
	return (dispatch, getState) => {
		const state = getState().quiz
		
		if(state.answerState) {return}
		
		const results = state.results
		const question = state.quiz[state.activeQuestion]
		
		
		
		if(question.rightAnswerId === answerId) {
			results[question.id] = 'success'
			dispatch(quizSetState({[answerId]: 'success'}, state.results))
		} else {
			results[question.id] = 'error'
			dispatch(quizSetState({[answerId]: 'error'}, state.results))
		}
		const timeout = window.setTimeout(() => {
			if(state.activeQuestion+1 === state.quiz.length) {
				dispatch(finishQuiz())
			} else {
				dispatch(getNextQuestion(state.activeQuestion + 1))
			}
		}, 600)
	}
}