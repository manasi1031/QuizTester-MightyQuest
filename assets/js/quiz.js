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
    console.log('populate questions by type');
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
                <button class="quit" onclick="exitQuiz()">Exit Quiz</button>
                <button class="restart" onclick="continueQuiz()">Start Quiz</button>
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
    //Declare variables for Science Quiz
    let start_btn = document.querySelector(".start_btn button");
    let info_box = document.querySelector(".info_box");
    let exit_btn = info_box.querySelector(".buttons .quit");
    let continue_btn = info_box.querySelector(".buttons .restart");
    let quiz_box = document.querySelector(".quiz_box");
    let result_box = document.querySelector(".result_box");
    let option_list = document.querySelector(".option_list");
    let time_line = document.querySelector("header .time_line");
    let timeText = document.querySelector(".timer .time_left_txt");
    let timeCount = document.querySelector(".timer .timer_sec");
        
    // show info box
    document.getElementsByTagName(start_btn).onclick = info_box.classList.add("activeInfo");

    // if exitQuiz button clicked
    if (document.getElementsByTagName(exit_btn).onclick) {  
        function exitQuiz(_exit_btn) {
            info_box.classList.remove("activeInfo"); //hide info box
            window.location.reload(); 
            console.log('Clicked Exit btn'); //testing
        };
    } else {
        function continueQuiz(_start_btn, _continue_btn) {
            document.getElementsByTagName(continue_btn).onclick
            info_box.classList.remove("activeInfo");
            quiz_box.classList.add("activeQuiz");
            console.log('Clicked continue quiz btn'); //testing

            //showing functions that will be initiated
            showQuestions(question_count); //calling showQuestions function
            questionCounter(question_numb); //passing question_numb value to queCounter
            startTimer(timeValue); //calling startTimer function
            startTimerLine(widthValue); //calling startTimerLine function
            timeText.textContent = "Time Left"; //change the text of timeText to Time Left
            next_btn.classList.remove("show"); //hide the next button
            console.log('start quiz function initiate'); //testing
        }
    };
};

// getting questions and options from array
function showQuestions(index, type) {
    let question_text = document.querySelector(".question_text");
    
    //creating a new span and div tag for question and option and passing the value using array index
    let question_tag = '<span>'+ quizQuestions(type[0]).questions[index].numb + ". " + quizQuestions(type[0]).questions[index].question +'</span>';
    let option_tag = 
        '<div class="option"><span>'+ quizQuestions(type[0]).questions[index].options[0] +'</span></div>' + 
        '<div class="option"><span>'+ quizQuestions(type[0]).questions[index].options[1] +'</span></div>' + 
        '<div class="option"><span>'+ quizQuestions(type[0]).questions[index].options[2] +'</span></div>' + 
        '<div class="option"><span>'+ quizQuestions(type[0]).questions[index].options[3] +'</span></div>';
    question_text.innerHTML = question_tag; //adding new span tag inside question_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    let option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    console.log('qts loaded correctly for ${subject}')
}

// if startQuiz button is clicked
function start() {
    document.getElementsByTagName(restart).onclick;
    info_box.classList.add("activeInfo"); //show info box
    console.log('clicked start button for quiz.');
    startQuiz();
    showQuestions();
    questionCounter(1); 
    startTimer(25); 
    startTimerLine(0); 
};

// if exitQuiz button clicked
function exitQuiz() {
    info_box.getElementsByTagName(exit_btn).onclick;
    info_box.classList.remove("activeInfo"); //hide info box
    window.location.reload(); 
    console.log('Clicked Exit btn'); //testing
};


// if continueQuiz button clicked
document.getElementsByClassName(continue_btn).onclick = function continueQuiz(){ 
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
function continueButton() {
    document.getElementsByTagName(next_btn).onclick;
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

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAnswer = answer.textContent; //getting user selected option
    let correcAnswer = questions[question_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAnswer == correcAnswer){ //if user selected option is equal to array's correct answer
        userScore += 1; //increment score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");
        console.log("Your wrong answers = " + userScore);

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAnswer){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

// Show Result function
function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    let scoreText = result_box.querySelector(".score_text");
    if (userScore > 5){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ quiz(type[0]).questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 3){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ quiz(type[0]).questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ quiz(type[0]).questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
};

// Function to start Quiz timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrease the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            let allOptions = option_list.children.length; //getting all option items
            let correcAnswer = questions[question_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAnswer){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
};

// Function to start timer
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
};

// Function for counting questions
function questionCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ quiz(type[0]).questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
};