const questions = [
    {
        question: "Who is known as the father of the computer?",
        options: ["Steve Jobs", "Bill Gates", "Charles Babbage", "Alan Turing"],
        answer: "Charles Babbage"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "Which company developed the Windows operating system??",
        options: ["Apple", "Microsoft ", "IBM", "Google"],
        answer: "Microsoft "
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        answer: "Blue Whale"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        answer: "Oxygen"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining;
let userAnswers = [];

function startQuiz() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeRemaining = 15;
    document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
    
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-container').innerText = questionData.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    questionData.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.className = 'option';
        optionButton.onclick = () => selectOption(option);
        optionsContainer.appendChild(optionButton);
    });
}

function selectOption(selectedOption) {
    const questionData = questions[currentQuestionIndex];
    userAnswers.push({question: questionData.question, selectedOption, correctAnswer: questionData.answer});
    clearInterval(timer);
    const options = document.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
        if (options[i].innerText === questionData.answer) {
            options[i].classList.add('correct-answer');
            if (options[i].innerText === selectedOption) {
                score++;
            }
        } else if (options[i].innerText === selectedOption) {
            options[i].classList.add('wrong-answer');
        }
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('next-button').disabled = true;
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('score').innerText = `Your score: ${score} / ${questions.length}`;
    const correctReviewContainer = document.getElementById('correct-review');
    const wrongReviewContainer = document.getElementById('wrong-review');
    correctReviewContainer.innerHTML = '';
    wrongReviewContainer.innerHTML = '';
    userAnswers.forEach(answer => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        const icon = document.createElement('span');
        icon.className = 'icon';
        const text = document.createTextNode(`${answer.question} - Correct Answer: ${answer.correctAnswer}`);
        if (answer.selectedOption === answer.correctAnswer) {
            icon.innerHTML = '&#10004;'; // Tick symbol for correct answer
            reviewItem.appendChild(icon);
            reviewItem.appendChild(text);
            correctReviewContainer.appendChild(reviewItem);
        } else {
            icon.innerHTML = '&#10060;'; // Cross symbol for wrong answer
            const wrongText = document.createTextNode(` - Your Answer: ${answer.selectedOption}`);
            reviewItem.appendChild(icon);
            reviewItem.appendChild(text);
            reviewItem.appendChild(wrongText);
            wrongReviewContainer.appendChild(reviewItem);
        }
    });
}

function resetQuiz() {
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'block';
}

document.getElementById('next-button').disabled = true;
