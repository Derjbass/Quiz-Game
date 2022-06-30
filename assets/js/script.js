//initializes javascript for use
initialize();

//initialize function
function initialize(){

    //variables to create elements
    var body = document.body;
    var headEl = document.createElement('header');
    var h2El = document.createElement('h2');
    var btnEl = document.createElement('button');
    var hdTimer = document.createElement('h2');
    var stQuizbtn = document.createElement('button');

    //variable elements for the questions and choices
    var stQuizbtnReplace = document.createElement('h4');
    var btnGroup = document.createElement('div');
    var btnOne = document.createElement('button');
    var btnTwo = document.createElement('button');
    var btnThree = document.createElement('button');
    var btnFour = document.createElement('button');

    //appending created elements for html start quiz page
    body.appendChild(headEl);
    body.appendChild(stQuizbtn);
    headEl.appendChild(h2El);
    headEl.appendChild(hdTimer);
    h2El.appendChild(btnEl);
    stQuizbtnReplace.appendChild(btnGroup);
    btnGroup.append(btnOne, btnTwo, btnThree, btnFour);

    //set IDs and Classes for button group and buttons
    btnGroup.setAttribute('id', 'btn-group');
    btnOne.setAttribute('class', 'choice');
    btnTwo.setAttribute('class', 'choice');
    btnThree.setAttribute('class', 'choice');
    btnFour.setAttribute('class', 'choice');

    //style buttons
    btnOne.setAttribute('style', 'margin: 2%');
    btnTwo.setAttribute('style', 'margin: 2%');
    btnThree.setAttribute('style', 'margin: 2%');
    btnFour.setAttribute('style', 'margin: 2%');

    //adds text and button to first page
    btnEl.textContent = 'View Highscore';
    hdTimer.textContent = ' Seconds Left';
    stQuizbtn.setAttribute('id', 'startBtn');
    stQuizbtn.textContent = 'START QUIZ';
    stQuizbtn.setAttribute('style', 'margin-top: 20%');
    body.setAttribute('style', 'text-align: center');

    //initial button to start the quiz
    var element = document.getElementById('startBtn');
    element.addEventListener('click', startQuiz);

    //timer variables for score
    var timeLeft;
    var timer;
    var score;
    //array to hold highScore objects
    var highScore = [];

    //set up variable for the questions and answers for the quiz
    var quizGame = [
        {
            question: 'Inside which HTML element do we put the JavaScript?',
            choices: ['<javascript>', '<scripting>', '<script>', '<js>'],
            correctAns: '<script>',
        },

        {
            question: 'Where is the correct place to insert a JavaScript?',
            choices: ['The <body> section', 'The <head> section', 'Both <body> and <head> sections', 'the <footer> section'],
            correctAns: 'The <body> section',
        },

        {
            question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            choices: ['script name="xxx.js"', 'script src="xxx.js"', 'script href="xxx.js"', 'script class="xxx.js"'],
            correctAns: 'script src="xxx.js"',
        },

        {
            question: 'The external JavaScript file must contain the script tag.',
            choices: ['False', 'True', 'Maybe?', 'Who Knows'],
            correctAns: 'False',
        },

        {
            question: 'How do you create a function in JavaScript?',
            choices: ['function:myFunction()', 'function myFunction()', 'function = myFunction()', 'funct:myFunct()'],
            correctAns: 'function myFunction()',
        }
    ];
    //variable for question index initialized to zero
    var qIndex = 0;
    //end of global scope variables

//function to start the quiz
function startQuiz(){

    //create timer function
    function countdown() {
        timeLeft = 75;
        timer = setInterval(function () {
            hdTimer.textContent = timeLeft + ' Seconds Left';
            timeLeft--;
            if(timeLeft <= 0) {
                score = timeLeft;
                clearInterval(timer);
                endOfQuizGame(score);
            }else if (timeLeft > 0 && qIndex === 5) {
                score = timeLeft;
                clearInterval(timer);
                console.log(score);
                endOfQuizGame(score);
            }
        }, 1000)
    }

    //start timer
    countdown();

    //replace button with an h4 to appropriately show first question
    document.body.replaceChild(stQuizbtnReplace , stQuizbtn);
    stQuizbtnReplace.textContent = quizGame[qIndex].question;
    //add choices buttons
    stQuizbtnReplace.appendChild(btnGroup);
    //btnGroup.append(btnOne, btnTwo, btnThree, btnFour);

    if (qIndex < 5){
    writeQuestion(qIndex);
    }else {
    return;
    }

    var multiClick = document.querySelectorAll('.choice');

    //addEventListener to multiple choice buttons
    for (var i = 0; i < 4; i++) {
        multiClick[i].addEventListener('click', function (button){
            checkAnswer(button.target.textContent);
        });
    }

    //function checks answers to see if they are right or wrong and docks time if wrong
    function checkAnswer(choice){

        if (choice === quizGame[qIndex].correctAns){
            console.log('CORRECT');
            qIndex++;
            writeQuestion(qIndex);
        }else if (choice !== quizGame[qIndex].correctAns){
            console.log('WRONG');
            qIndex++;
            timeLeft = timeLeft - 15;
            writeQuestion(qIndex);
        }else {
            return;
        }
    }

}
//function for writing questions and choices
function writeQuestion(ques){
    if (ques === 5 ){
        btnGroup.innerHTML = '';
        return;
        }

    //for loop creates question and button text
    for (var i = 0; i < 4; i++){
        stQuizbtnReplace.innerHTML = quizGame[ques].question;
        stQuizbtnReplace.appendChild(btnGroup)
        btnGroup.children[i].textContent = quizGame[ques].choices[i];
    }

    //set attributes for created buttons
    btnGroup.setAttribute('style', 'margin-top: 25px, padding: 2%')

};

//function for end of quiz to save initials and high score
function endOfQuizGame(sc){
    //variables for initials input from user
    var initials = document.createElement('input');
    var initialsTag = document.createElement('h4');
    var pcInitials;

    //create submit button
    var submit = document.createElement('button');
    submit.setAttribute('id', 'submit');
    submit.setAttribute('style', 'margin-left: 1%;');
    submit.innerText = 'SUBMIT';

    //addEventListener for submit button
    submit.addEventListener('click', function(){
        pcInitials = initials.value;
        console.log(pcInitials);
        storeScore(pcInitials, sc);
    });


    //attributes for new elements
    initials.setAttribute('type', 'text');
    initials.setAttribute('style', 'margin-top: 3%');
    initialsTag.innerText = 'Input initials to save score';
    document.body.append( initialsTag, initials, submit);
    //change header and attributes
    headEl.innerText = 'Quiz Over!';
    headEl.setAttribute('style', 'display: block;')

    //ensure scores are not negative
    if(sc < 0) {
        sc = 0;
    }
    console.log(sc);

    stQuizbtnReplace.removeChild(btnGroup);
    stQuizbtnReplace.innerText = 'QUIZ OVER!';
    stQuizbtnReplace.innerHTML = '<h2> Final Score: ' + sc + '</h2>';

};

//function to store and show the highscore list
function storeScore (ini, sc){
    //clear screen to create new elements to show high score list
    body.innerHTML = '';

    //store initials and score an object
    var hsObj = {
        initials: ini,
        score: sc,
    }

    //push score to highscore array for later sorting
    highScore.push(hsObj);
    console.log(highScore);

    //create display for high score list
    var hsH2El = document.createElement('h2');
    hsH2El.innerText = 'HIGHSCORE LIST';
    var olEl = document.createElement('ol');
    var ilEl = document.createElement('il');
    body.append(hsH2El, olEl);
    olEl.appendChild(ilEl);
    ilEl.innerText = ini + ':  ' + sc;

};
}
