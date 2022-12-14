 



const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeOff = document.querySelector("header .time_text");
 const timeCount = document.querySelector(".timer .timer_sec");

 // if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
 }

 // if exitQuiz button clicked
exit_btn.onclick = ()=>{
     info_box.classList.remove("activeInfo"); //hide info box
 }

 // if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
     showQuestions(0); //calling showQestions function
     queCounter(1);   //passing 1 parameter to queCounter
     startTimer(15); //calling startTimer function
     startTimerLine(0); //calling startTimerLine functin 
}


let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;


 const next_btn = quiz_box.querySelector(".next_btn");
 const result_box = document.querySelector(".result_box");
 const restart_quiz = result_box.querySelector(".buttons .restart");
 const quit_quiz = result_box.querySelector(".buttons .quit");

 
  restart_quiz.onclick = ()=>{
    result_box.classList.remove("activeResult"); //hide result box
    quiz_box.classList.add("activeQuiz"); 
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter);  
    startTimer(timeValue); 
    clearInterval(counterLine); 
    startTimerLine(widthValue); 
    next_btn.style.display = "none";
    timeOff.textContent = "Time left"; 
  }
  quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

// if Next Que button clicked
 next_btn.onclick = ()=>{
     if(que_count < questions.length - 1){ //if question count is less than total question length
         que_count++;               //increment the que_count value
         que_numb++;            //increment the que_numb value
        showQuestions(que_count); //calling showQestions function
        queCounter(que_numb); 
        clearInterval(counter); //clear counter
        startTimer(timeValue); //calling startTimer function
        clearInterval(counterLine); //clear counterLine
        startTimerLine(widthValue); //calling startTimerLine function
        next_btn.style.display = "none";
        timeOff.textContent = "Time left"; 
    }else{
         console.log ('Questions completed')
         showResultBox();
        clearInterval(counter);
        clearInterval(counterLine); //clear counterLine
         
    }
}

// // getting questions and options from array
     function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
     let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
     que_text.innerHTML = que_tag; //adding new span tag inside que_tag
     option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
     const option = option_list.querySelectorAll(".option");
     // set onclick attribute to all available options
     for(i=0; i < option.length; i++){
             option[i].setAttribute("onclick", "optionSelected(this)");
         }

     }

     let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
     let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';




     function optionSelected(answer){
        clearInterval(counter); 
        clearInterval(counterLine); 
        let userAns = answer.textContent;
        let correctAns = questions[que_count].answer;
        let allOptions = option_list.children.length; //getting all option items
        
        if(userAns == correctAns){ //if user selected option is equal to array's correct answer
            userScore += 1;
            console.log(userScore);
            answer.classList.add("correct");
            console.log("Answer is correct");
            answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
     } else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option

     //if answer is incorrect then automatically select the correct answer
        for(let i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
              

            }
        }
     }

      //once user select an option then disabled all options

     for (let i = 0; i < allOptions; i++){
         option_list.children[i].classList.add("disabled"); 
         
            }
      next_btn.style.display = "block";   
    }

    function showResultBox(){
             info_box.classList.remove("activeInfo"); //hide info box
             quiz_box.classList.remove("activeQuiz"); //hide quiz box
             result_box.classList.add("activeResult"); //show result box
             const scoreText = result_box.querySelector(".score_text");
      if (userScore > 15){ 
            let scoreTag = '<span> congrats! ???? , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
             scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
      }
      else if(userScore > 7){ 
             let scoreTag = '<span> nice???? You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
           scoreText.innerHTML = scoreTag;
        }
     else{
        let scoreTag = '<span> sorry ????  You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
       scoreText.innerHTML = scoreTag;
       }
    }
    function startTimer(time){
            counter = setInterval(timer, 1000);
            function timer(){
            timeCount.textContent = time; //changing the value of timeCount with time value
            time--; //decrement the time value
            if(time < 9){ //if timer is less than 9
                let addZero = timeCount.textContent; 
                timeCount.textContent = "0" + addZero; //add a 0 before time value
                }
            if(time < 0){  //if timer is less than 0     
            clearInterval(counter); //clear counter
            timeCount.textContent = "00";
            timeOff.textContent = "Time off"; 

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;


            for(let i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                   
    
                }
            }

            for(let i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
           next_btn.style.display = "block"; 
         }
       }
    }
    function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ 
            clearInterval(counterLine); //clear counterLine
        }
    }
}

 
     function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
     let totalQueCounTag =  '<span><p>'+ index + '</p>of<p>'+ questions.length +'</p>Questions</span>';
     bottom_ques_counter.innerHTML = totalQueCounTag;


     }





