function startQuiz() {
    let name = document.getElementById("username").value;
    if (name == "") {
        alert("Please enter your name");
        return;
    } else if (name == undefined) {
        name = document.getElementById("username").innerText;
    }
    localStorage.setItem("user_name", name);
    document.getElementById("username").value = "";
    window.location.href = "quiz.html";
}

function getuser() {
    let name = localStorage.getItem("user_name");
    document.getElementById("username").innerText = name;
}

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyper Text Preprocessor",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language",
        ],
        answer: 0,
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2,
    },
    {
        question: "Which is not a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Django"],
        answer: 3,
    },
    {
        question: "Which tag is used for JavaScript?",
        options: ["js", "script", "javascript", "code"],
        answer: 1,
    },
    {
        question: "Which company developed Bootstrap?",
        options: ["Microsoft", "Google", "Twitter", "Apple"],
        answer: 2,
    },
];

let question_no = 0;
let score = 0;
let selected_answer = null;
let timeLeft = 20;
let timer;

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 20;

    document.getElementById("clock").innerText = timeLeft;

    const q = questions[question_no];

    document.getElementById("questionText").innerText = q.question;
    document.getElementById("questionCount").innerText = "Question " + (question_no + 1) + " / " + questions.length;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    selected_answer = null;

    for (let i = 0; i < q.options.length; i++) {
        optionsDiv.innerHTML +=
            '<div class="form-check text-start my-2 option-btn" id="optionbtn' +
            i +
            '" onclick="selectOption(' +
            i +
            ')"><input class="form-check-input" type="radio" name="option" id="option' +
            i +
            '" value="' +
            i +
            '" ><label class="form-check-label" for="option' +
            i +
            '">' +
            q.options[i] +
            "</label></div>";
    }
    startTimer();
}

function selectOption(number) {
    for (let i = 0; i < 4; i++) {
        document.getElementById("optionbtn" + i).classList.remove("option-selected");
        document.getElementById("option" + i).classList.remove("radio-active");
    }
    document.getElementById("optionbtn" + number).classList.add("option-selected");
    document.getElementById("option" + number).classList.add("radio-active");

    selected_answer = number;
}

function nextQuestion() {
    if (selected_answer == questions[question_no].answer) {
        score++;
    }
    question_no++;
    if (question_no < questions.length) {
        loadQuestion();
    } else {
        localStorage.setItem("score", score);
        localStorage.setItem("total_questions", questions.length);
        window.location.href = "result.html";
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft < 10) {
            document.getElementById("clock").innerText = "0" + timeLeft;
        } else {
            document.getElementById("clock").innerText = timeLeft;
        }
        if (timeLeft == 0) {
            nextQuestion();
        }
    }, 1000);
}

function loadscore() {
    const score = localStorage.getItem("score");
    const total_questions = localStorage.getItem("total_questions");
    document.getElementById("score").innerText = score + " / " + total_questions;
}