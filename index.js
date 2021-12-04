let infix = [];
let number = "";
let screenShow = "";
let output = [];
let operator = [];
let postCalStack = [];
$("input").val(0);
$(".during-cal").click(function(){
  let unit = $(this).text();
  screenShow += unit;
  $("input").val(screenShow);
  if(!isNaN(unit) || unit == "."){
    number += unit;
  }else if(isNaN(unit) && unit != "÷"){
      infix.push(parseFloat(number));
      infix.push(unit);
      number = "";
    }else if(unit === "÷"){
      unit = "/";
      infix.push(parseFloat(number));
      infix.push(unit);
      number = "";
    }
});

$(".equal-button").click(function(){
  infix.push(parseFloat(number));
  toPostfix(infix);
  console.log(infix);
  let result = evaluatePostfix(output);
  console.log(output);
  console.log(result);
  $("input").val(result);
});

$(".clear").click(function(){
  infix = [];
  number = "";
  screenShow = "";
  output = [];
  operator = [];
  postCalStack = [];
  $("input").val(0);
});
// below method evaluate the postfix
function evaluatePostfix(postfix){
  //scan the whole postfix string
  for(let i = 0 ; i < postfix.length ; i++){
    //check whether the letter is a number
    //if it is a number push to the stack
    if(!isNaN(postfix[i])){
      let number = parseFloat(postfix[i]);
      postCalStack.push(number);
    }else{
      //if not the number check the operator and do the corresponding calculation
      if(postfix[i] === "+"){
        let behind = postCalStack.pop();
        let front = postCalStack.pop();
        postCalStack.push(front + behind);
      }else if(postfix[i] === "-"){
        let behind = postCalStack.pop();
        let front = postCalStack.pop();
        postCalStack.push(front - behind);
      }else if(postfix[i] === "x"){
        let behind = postCalStack.pop();
        let front = postCalStack.pop();
        postCalStack.push(front * behind);
      }else if(postfix[i] === "/"){
        let behind = postCalStack.pop();
        let front = postCalStack.pop();
        postCalStack.push(front / behind);
      }
    }
  }
  //after scan all the whole string the top is the answer
  let evaluation = postCalStack.pop();
  return evaluation;
}

function toPostfix(inf){
  for(let i = 0 ; i < infix.length ; i++){
    //check whether it is a number
    if(inf[i] != "+" && inf[i] != "-" && inf[i] != "x" && inf[i] != "/"){
      output.push(inf[i]);
      //if it is a operator then if the operator stack is empty then push if the priority is less than the stack top
      // then pop the operator top until the coming operator is the highest priority
      //after all of this pop the last operator in the operator stack
    }else{
      while(operator.length != 0 && (operatorPriority(inf[i]) <= operatorPriority(operator[operator.length - 1]))){
        output.push(operator.pop());
      }
      operator.push(inf[i]);
    }
  }
  while(operator.length != 0){
    output.push(operator.pop());
  }
}

function operatorPriority(operator){
  if(operator === "+" || operator === "-"){
    return 1;
  }else if(operator === "x" || operator === "/"){
    return 2;
  }return 0;
}
