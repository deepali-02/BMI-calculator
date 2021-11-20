//console.log("What does process.argv contain?", process.argv);
var weightInKg = parseInt(process.argv[2]);
var heightInM = parseFloat(process.argv[3]);
var age =  parseInt(process.argv[4]);
var dailyExercise = process.argv[5];
var gender = process.argv[6];

//check correct number of inputs and in correct format by user

if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} arguments(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      whether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
  }

  if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
    console.log(`
      Please make sure weight, height and age are numbers:
  
      weight (kg) example: 82 | your input: ${process.argv[2]}
      height (m) example 1.79 | your input: ${process.argv[3]}
      age (years) example 32  | your input: ${process.argv[4]} 
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
  }

  if (age < 20){
      console.log(`This BMI calaculator is designed for people over age 20.
      `);

      process.exit();
  }

  if (weightInKg > 300 || weightInKg < 30){
      console.log(`Please enter a weight in kgs
    
      Your weight of ${weightInKg} kgs does not fall in the range between 30 kg and 300 kg

      If you weight is below 30 kg or over 300 kg seek professional medical help
      `);

      process.exit();
  }

  if (dailyExercise !== "yes" && dailyExercise !== "no") {
    console.log(`
      Please specify wether you exercise daily with yes or no
  
      You entered: ${dailyExercise}
  
      (Don't worry, we won't judge you if you enter no)
    `);
  
    process.exit();
  }
  

//BMI calculation

var BMI = weightInKg / (heightInM * heightInM);

var roundBMI =Math.round(BMI);

//Caculate Ideal Weight for user

var idealWeight = 22.5 * heightInM * heightInM;

var roundidealWeight =Math.round(idealWeight);

// Check gender to calculate BMR



//To achieve weight goal calculate BMR and daily calories intake.

var heightIncm = heightInM * 100; 

let bmr;

if (gender === "m"){
    bmr = 10 * weightInKg + 6.25 * heightIncm - 5 * age + 50;
} else {
  bmr = 10 * weightInKg + 6.25 * heightIncm - 5 * age - 150;
}
/*
// using ternary oprator
var bmr = gender === "m" ? 10 * weightInKg + 6.25 * heightIncm - 5 * age + 50 : 10 * weightInKg + 6.25 * heightIncm - 5 * age - 150  ;
*/



let dailyCalories;

if (dailyExercise === "yes"){
    dailyCalories = bmr * 1.6;   //run on true value
} else {
    dailyCalories = bmr * 1.4;  // run on false value
    
}

/* using ternary operator

var dailyCalories = dailyExercise === "yes" ? bmr * 1.6 : bmr * 1.4;*/

//Calculate weight need to loose

var looseWeight = weightInKg - idealWeight;

//console.log(looseWeight);

//Calculate time(weeks) to reach our goals

var reqTime = Math.abs(looseWeight / 0.5);

//Calculate daily calaries intake too reach our goal

let dietCalories;

if(looseWeight > 0){
    dietCalories = dailyCalories - 500;
} else {

    dietCalories = dailyCalories + 500;
    console.log(`Diet Calories= ${dietCalories}`);
}



//print output

console.log(`
**************
BMI CALCULATOR
**************

Age: ${age}
Height: ${heightInM}
Weight: ${weightInKg}
Gender: ${gender}
Do you Exercise daily: ${dailyExercise}

****************
FACING THE FACTS
****************

Your BMI is ${roundBMI}.

A BMI under 18.5 is considered underweight.
A BMI above 25 is considered overweight.

Your Ideal weight is ${roundidealWeight}
With normal life style you burn ${Math.round(dailyCalories)} calories a day.

**********
DIET PLAN
**********

If you want to reach your ideal weight of ${roundidealWeight} :
Eat ${Math.round(dietCalories)} calories a day.
For ${Math.round(reqTime)} weeks.
`);

