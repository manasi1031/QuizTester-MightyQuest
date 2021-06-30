/*jshint esversion: 6 */
// Function wide declarations
let start_btn, info_box, exit_btn, activeInfo, continue_btn, quiz_box, result_box, option_list, time_line, timeText, timeCount;
let timeValue =  25,
 question_count = 0,
 question_numb = 1,
 userScore = 0,
 counter,
 counterLine,
 widthValue = 0;
/** Function to view quiz by subject 
 * This should initiate the subject view only
*/
function openQuiz(event, subject) {
    let questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = "";
    populateQuestions(questionsDiv, subject);
    console.log('populate questions by type')
}
// Function to populate questions by
function populateQuestions(questionsDiv, subject) {
    questionsDiv.innerHTML += 
        `<div class="start_btn">
        </div>
        <div class="info_box activeInfo">
            <div class="info-title"><span>Rules of the ${subject} Quiz</span></div>
            <div class="info-list">
                <div class="info">You will have only <span>25 seconds</span> per each question.</div>
                <div class="info">Once you select your answer, it cannot be changed.</div>
                <div class="info">You cannot select any option once the time is up.</div>
                <div class="info">You will get points on the basis of your correct answers.</div>
            </div>
            <div class="buttons">
                <button class="quit">Exit Quiz</button>
                <button class="restart">Start Quiz</button>
            </div>
        </div>
        <!-- Quiz Box -->
        <div class="quiz_box">
            <header>
                <div class="title">${subject} Quiz</div>
                <div class="timer">
                    <div class="time_left_txt">Time Left</div>
                    <div class="timer_sec">25</div>
                </div>
                <div class="time_line"></div>
            </header>
            <section>
                <div class="question_text">
                    <!-- Inserted question from JavaScript -->
                </div>
                <div class="option_list">
                    <!-- Inserted options from JavaScript -->
                </div>
            </section>
            <!-- footer section of Quiz Box -->
            <section class="footer">
                <div class="total_question">
                    <!-- Inserted Question Count Number from JavaScript -->
                </div>
                <button class="next_btn">Next Question</button>
            </section>
        </div>
        <!-- Result Box -->
        <div class="result_box">
            <div class="icon">
                <i class="fas fa-medal"></i>
            </div>
            <div class="complete_text">You have completed the Quiz!</div>
            <div class="score_text">
                <!-- Inserted Score Result from JavaScript -->
            </div>
            <div class="buttons">
                <button class="restart">Replay Quiz</button>
                <button class="quit">Quit Quiz</button>
            </div>
        </div>
    </div>`;
}

function startQuiz() {
    console.log('hello'); //testing
    //Declare variables for Science Quiz
    start_btn = getElementsByClassName("restart");
    info_box = document.querySelector(".info_box");
    active_info = info_box.querySelector(".activeInfo");
    exit_btn = document.getElementsByClassName("quit");
    continue_btn = document.getElementsByClassName("next_btn");
    quiz_box = document.getElementsByClassName("quiz_box");
    result_box = document.querySelector(".result_box");
    option_list = document.querySelector(".option_list");
    time_line = document.querySelector("header .time_line");
    timeText = document.querySelector(".timer .time_left_txt");
    timeCount = document.querySelector(".timer .timer_sec");
    
    // show info box
    info_box.classList.add("activeInfo");
    // if exitQuiz button clicked
    exit_btn.onclick = (e)=>{
        e.preventDefault();
        //hide info box
        info_box.classList.remove("activeInfo"); 
    };
    // if continueQuiz button clicked
    continue_btn.onclick = (e)=>{
        e.preventDefault();
        info_box.classList.remove("activeInfo");
        quiz_box.classList.add("activeQuiz");
        //calling showQuestions function
        showQuestions(0); 
        questionCounter(1); 
        startTimer(25); 
        startTimerLine(0); 
    };
}

// getting questions and options from array
function showQuestions(index, type) {
    let question_text = document.querySelector(".question_text");
    
    //creating a new span and div tag for question and option and passing the value using array index
    let question_tag = '<span>'+ quizQuestions(type).questions[index].numb + ". " + quizQuestions(type).questions[index].question +'</span>';
    let option_tag = 
        '<div class="option"><span>'+ quizQuestions(type).questions[index].options[0] +'</span></div>' + 
        '<div class="option"><span>'+ quizQuestions(type).questions[index].options[1] +'</span></div>' + 
        '<div class="option"><span>'+ quizQuestions(type).questions[index].options[2] +'</span></div>' + 
        '<div class="option"><span>'+ quizQuestions(type).questions[index].options[3] +'</span></div>';
    question_text.innerHTML = question_tag; //adding new span tag inside question_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    let option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// if startQuiz button is clicked
document.getElementsByClassName(start_btn).onclick = function(){ 
    info_box.classList.add("activeInfo"); //show info box
    console.log('clicked start button for quiz.');
    startQuiz();
};

// if exitQuiz button clicked

document.getElementsByClassName(exit_btn).onclick = function() {
    document.getElementsByClassName.remove("activeInfo exit_btn"); //remove pop up
    console.log('clicked exit button for quiz.');
    }, false;


// if continueQuiz button clicked
document.getElementsByClassName(continue_btn).onclick = function(){ 
    document.getElementsByClassName.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    //calling showQuestions function
    showQuestions(0); 
    questionCounter(1); 
    startTimer(25); 
    startTimerLine(0); 
};

let restart_quiz = document.getElementsByClassName("restart");
let quit_quiz = document.getElementsByClassName("quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    //show quiz box
    quiz_box.classList.add("activeQuiz"); 
    //hide result box
    result_box.classList.remove("activeResult"); 
    timeValue = 25; 
    question_count = 0;
    question_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(question_count); //calling showQuestions function
    questionCounter(question_numb); //passing question_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
};

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    //reload the current window
    window.location.reload(); 
    console.log('Quit Quiz');
};

let next_btn = document.getElementsByClassName("next_btn");
let bottom_ques_counter = document.getElementsByClassName("total_question");

// if Next Question button clicked
next_btn.onclick = ()=>{
    if (question_count < questions.length - 1){ 
        question_count++; //increment the question_count value
        question_numb++; //increment the question_numb value
        showQuestions(question_count); //calling showQuestions function
        questionCounter(question_numb); //passing question_numb value to questionCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
};

// creating the new div tags for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

