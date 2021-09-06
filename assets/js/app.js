const triviaForm = document.querySelector('.trivia');
let mainForm = document.querySelector('#trivia-form');
const triviaQuestionClass = document.querySelector('.trivia-questions');
const triviaQuestion = document.querySelector('#trivia-questions');
let questions,
	correctAnswer,
	answers = [],
	q = 0,
	score = 0;

// Funciones
const createApiUrl = e => {
	e.preventDefault();

	let amount = document.querySelector('#amount').value;
	let difficulty = document.querySelector('#difficulty').value;
	let type = document.querySelector('#type').value;
	let category = document.querySelector('#category').value;

	const mostrarError = mensaje => {
		const mensajeError = document.createElement('P');
		mensajeError.textContent = mensaje;
		mensajeError.classList.add('error');
		mainForm.appendChild(mensajeError);
		setTimeout(() => {
			mensajeError.style.display = 'none';
		}, 2000);
	};
	const error = document.querySelector('.error');

	if (amount < 1) {
		mostrarError('Número de preguntas no puede ser 0');
	} else {
		const API = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`;
		fetchDataAPI(API);
	}
};

const fetchDataAPI = url => {
	fetch(url)
		.then(response => response.json())
		.then(result => fillQuestions(result.results))
		.catch(err => console.log(err));
};

const fillQuestions = questionsAPI => {
	questions = questionsAPI;
	triviaForm.classList.add('hidden');
	triviaQuestionClass.classList.remove('hidden');
	showQuestions();
};

const showQuestions = () => {
	correctAnswer = questions[q].correct_answer;
	answers = [...questions[q].incorrect_answers, correctAnswer].sort();

	if (answers.length > 2) {
		triviaQuestion.innerHTML = `
		<div>
			<h4>${questions[q].question}</h4>
			<ul>
				<li><button class="answerBtn" onClick="handleCheckAnswer(this)">${answers[0]}</button></li>
				<li><button class="answerBtn" onClick="handleCheckAnswer(this)">${answers[1]}</button></li>
				<li><button class="answerBtn" onClick="handleCheckAnswer(this)">${answers[2]}</button></li>
				<li><button class="answerBtn" onClick="handleCheckAnswer(this)">${answers[3]}</button></li>
			</ul>
		</div>
		`;
	} else {
		triviaQuestion.innerHTML = `
		<div>
			<h4>${questions[q].question}</h4>
			<ul>
				<li><button class="answerBtn" onClick="handleCheckAnswer(this)">${answers[0]}</button></li>
				<li><button class="answerBtn" onClick="handleCheckAnswer(this)">${answers[1]}</button></li>
			</ul>
		</div>
		`;
	}
};

const handleCheckAnswer = button => {
	if (button.innerText === correctAnswer) {
		score++;
		button.classList.add('right-answer');
	} else {
		button.classList.add('wrong-answer');
	}

	if (questions.length - 1 !== q) {
		q++;
		setTimeout(() => {
			showQuestions();
		}, 1000);
	} else {
		triviaFinish();
	}
};

const triviaFinish = () => {
	triviaQuestion.innerHTML = `
		<div class="trivia-finish">
			<img class="finish-img" src="./assets/img/stars.png" alt="Estrellas" />
			<h4 class="finish-h4">El juego ha terminado.</h4>
			<h4 class="finish-h4">Tu puntuación es de: ${score} puntos.</h4>
			<button class="reload-trivia" onClick="document.location.reload()">Volver a Jugar</button>
		</div>
		`;
};

// const handleReloadGame = () => {
// 	triviaForm.classList.remove('hidden');
// 	triviaQuestionClass.classList.add('hidden');
// 	mainForm.reset();
// 	createApiUrl();
// };

mainForm.onsubmit = createApiUrl;
