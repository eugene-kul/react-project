import axios from "axios";

export default axios.create({
	baseURL: 'https://react-quiz-c2d38-default-rtdb.europe-west1.firebasedatabase.app/'
})