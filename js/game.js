    const quizData = [
        {
        question: 'Which technology company is known for its iPhones, MacBooks, and iPads?',
        options: ['Microsoft', 'Google', 'Apple', 'Amazon'],
        answer: 'Apple',
        },
        {
        question: 'Who is the founder of FaceBook?',
        options: ['Mark Zuckerberg', 'Elon Mask', 'Kairat Nurtas', 'Bill Gates'],
        answer: 'Mark Zuckerberg',
        },
        {
        question: 'What online marketplace is recognized for its vast selection of products and fast shipping services?',
        options: ['Alibaba', 'Amazon', 'eBay', 'Walmart'],
        answer: 'Amazon',
        },
        {
        question: 'Which automobile company is known for its electric cars, including the Model S and Model 3?',
        options: ['Toyota', 'Tesla', 'LADA', 'Mersedes'],
        answer: 'Tesla',
        },
        {
        question: 'What search engine is the most widely used on the internet?',
        options: [
            'Bing',
            'Yahoo',
            'Google',
            'Yandex',
        ],
        answer: 'Google',
        },
        {
        question: 'Who is the CEO of Microsoft?',
        options: ['Tim Cook', 'Satya Nadella', 'Bill Gates', 'Jack Dorsey'],
        answer: 'Satya Nadella',
        },
        {
        question: 'What company is known for its streaming platform and producing original content like "Stranger Things" and "The Crown"?',
        options: [
            'Netflix',
            'Nulu',
            'Amazon Prime Video',
            'Disney+',
        ],
        answer: 'Netflix',
        },
        {
        question: 'Which social media platform is limited to 280 characters per tweet?',
        options: ['Twitter', 'Instagram', 'Facebook', 'LinkedIn'],
        answer: 'Twitter',
        },
        {
        question: 'What multinational technology company develops and sells computer software, hardware, and other products?',
        options: [
            'Apple',
            'Microsoft',
            'IBM',
            'Samsung',
        ],
        answer: 'Microsoft',
        },
        {
        question: 'Which fast-food chain is globally recognized for its golden arches logo?',
        options: ['KFC', 'McDonalds', 'BurgerKing', 'Salam Bro'],
        answer: 'McDonalds',
        },
    ];
    
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retry');
    const showAnswerButton = document.getElementById('showAnswer');
    
    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function displayQuestion() {
        const questionData = quizData[currentQuestion];
    
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = questionData.question;
    
        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';
    
        const shuffledOptions = [...questionData.options];
        shuffleArray(shuffledOptions);
    
        for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';
    
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];
    
        const optionText = document.createTextNode(shuffledOptions[i]);
    
        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
        }
    
        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsElement);
    }
    
    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
            question: quizData[currentQuestion].question,
            incorrectAnswer: answer,
            correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
        }
    }
    
    function displayResult() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
        resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}! So you have ${score*10}% dicount`;
    }
    
    function retryQuiz() {
        currentQuestion = 0;
        score = 0;
        incorrectAnswers = [];
        quizContainer.style.display = 'block';
        submitButton.style.display = 'inline-block';
        retryButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        resultContainer.innerHTML = '';
        displayQuestion();
    }
    
    function showAnswer() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'none';
    
        let incorrectAnswersHtml = '';
        for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
            <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
            <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
            <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
        }
    
        resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
        `;
    }
    
    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);
    
    displayQuestion();