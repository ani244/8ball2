//declares a list with all the possible responses the 8ball can give
var responses = ["It is certain",	
"Reply hazy, try again",
"Don’t count on it",
"It is decidedly so",
"Ask again later",
"My reply is no",
"Without a doubt",
"Better not tell you now",
"My sources say no",
"Yes, definitely",
"Cannot predict now",
"Outlook not so good",
"You may rely on it",
"Concentrate and ask again",
"Very doubtful",
"As I see it, yes",		
"Most likely",		
"Outlook good",		
"Yes",		
"Signs point to yes"];

//declaring the variables
var question;
var index;
var questionCount = 0;
//hide elements to make the user interface cleaner
hideElement("response");
hideElement("okbutton");
hideElement("badquestionresponse");

//This function checks to see if the user's input has a question mark
//The parameter is a string (the user's input)
//This function returns a number( the number of question marks in the user's input)
function isQuestion(string){
  question = [];
  for (var i = 0; i < string.length; i++) {
appendItem(question, string[i]);
 } 
 for(var j= 0; j<string.length; j++){
  if(question[j] == "?"){
    questionCount++;}
 }
 return questionCount;
}

//when the user clicks the "shake" button, the 8 ball displays a response
//however, if there aren't question marks in the user's input (questionCount = 0), no response is shown
//if there aren't question marks, the user is asked to rewrite their input as a question
onEvent("shakebutton", "click", function(){
    question = getText("questioninput");
  isQuestion(question);
  if(questionCount > 0){
    index = randomNumber(0, responses.length - 1);
    setProperty("response", "text", responses[index]);
  updateScreen();
    setText("badquestionresponse", " ");
  setText("questioninput", " ");
  }else {
    hideElement("shakebutton");
    setText("badquestionresponse", "Please ask a question.");
    showElement("badquestionresponse");
    showElement("okbutton");
  }
});

//if the user's input doesn't have a question mark, they are given a warning and an "OK" button pops up
//once they click "OK", the screen resets to the default where the user can ask questions
onEvent("okbutton", "click", function(){
  hideElement("badquestionresponse");
  hideElement("okbutton");
  showElement("shakebutton");
});

//this clears the 8ball's previous response when the user clicks the box to input a question
onEvent("questioninput", "click", function(){
  setText("response", "");
  showElement("smallcircle1");
  showElement("smallcircle2");
  hideElement("response");
});

//this function displays a random response in the 8ball
//it hides the "8" in the 8ball to allow space for the response
//this function resets the question counter 
//so the function isQuestion works correctly for the user's next question
function updateScreen(){
    showElement("response");
  setProperty("response", "text", responses[index]);
  hideElement("smallcircle1");
  hideElement("smallcircle2");
  questionCount = 0;
}