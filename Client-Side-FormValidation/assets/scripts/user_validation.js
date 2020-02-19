/*
    Author: Logan Doughty
    Written: 19/02/2020
    Last Updated: 19/02/2020
    Title: New User Form Validation - Beginner
    Revision : V1.0
    Completion: TBC
    Description:
        Script to check form validation is correct for new user sign up.
        Current State - incomplete
        Current Support:
            -   Validation checks that email is in a valid email format
            -   Password is checked that:
                    -   Does not exceded Maximum Character Limit specified
                    -   Does not fall short of Minimum Character Limit specified
                    -   Both User Entered Passwords Match
                    -   Password contains atleast 1 Uppercase letter, 1 Lowercase letter and atleast 1 number
                    -   Password does not contain these special characters: - + ! $ ^ & * ; , (whitespace)
                    -   Does not contain words such as 'SELECT', 'INSERT', 'DELETE' , 'UPDATE', 'FROM', 'WHERE', 'OR', 'AND', 'SET'
*/

const form = document.getElementById("myForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const verify = document.getElementById("verify-password");
const CHAR_LIMIT = 10; //set character maximum
const CHAR_MIN = 6; //set character minimum

let charRemaining = CHAR_MIN; //initilize remaining character counter to character minimum
let currentCharCount = 0; //current character input count
let userPassword = ""; //used for learning purposes, wouldnot store user information globally

let passwordValid = false; //password boolean value for valid or invalid
let passwordVerified = false; //password boolean value for whether verification password matchs existing password input
let emailVerified = false; //email verification boolean


/* FUNCTIONS */

/* Check Character Limit on Password */
let checkCharLimit = () => currentCharCount <= CHAR_LIMIT ? false : true; //return false if havent reached limit, true if exceeded character limit

/* Check Character Minimum Reached on Password */
let checkCharMin = () => currentCharCount >= CHAR_MIN ? true : false; //return true if threshhold reached, else false

/* Check password character inputs are allowed and valid*/
let checkChar = () => {
    let string = password.value;
    let checkBool = false;
    const expression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/; //password characters that must be found in the password
    const Noexpress = /(?=.*[-+!$^&*;,\s])/; //excluded special characters
    const wordSearch = /(SELECT|INSERT|DELETE|UPDATE|FROM|WHERE|OR|AND|SET)/i; //make sure password doesnt contain certain words

    let checkCharacter = expression.test(string);
    let checkSpecial = Noexpress.test(string);
    let checkWords = wordSearch.test(string);
    
    if(checkCharacter && !checkSpecial && !checkWords) {
        checkBool = true;
    } else {
        checkBool = false;
    }
   return checkBool;
};

/*Check expression against input to make sure email is in valid format - returns boolean value*/
const validateEmail = () => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(document.getElementById("email").value).toLowerCase());
};


/* validate password is within character limit and the characters are all correct - returns boolean value*/
const validatePassword = () => {
    charRemaining = CHAR_MIN - password.value.length;
    currentCharCount = password.value.length;

    let charCheckMin = checkCharMin(); //check min length is reached
    let charCheckMax = checkCharLimit(); //check maximum length not exceded
    let checkCharacters = checkChar(); //check password has no illegal characters

    if(charCheckMin && !charCheckMax && checkCharacters){
        return true;
    } else {
        return false;
    }
};


/* verify that entered passwords match eachother*/
const verifyPassword = target => target === userPassword ? true : false;


/*Check that all inputs are valid before submission*/
const validate = (e) => {

   if(emailVerified && passwordValid && passwordVerified){
        alert("Welcome Aboard!");
        return true;
   } else {
        alert("An Error has occured please check all inputs before proceeding");
        e.preventDefault(); //prevent submission if inputs are invalid
   }
};



/*EVENT LISTENERS*/

/*Listener for submission of form*/
form.addEventListener('submit', (e) => {
    validate(e);
});


/*Email Validation which reveals a message that the input is invalid if incorrect or not an email address*/
email.addEventListener('change', () => {
    let emailBool = validateEmail();
    if(!emailBool){
        emailVerified = false;
        document.getElementById("email-msg").innerText = "Invalid Email Input";
    } else {
        document.getElementById("email-msg").innerText = "";
        emailVerified = true;
    }
});


/*Password event listener that checks the enterd password is valid */
password.addEventListener('change', () => {
    userPassword = password.value; //get users entered password
    let pw = validatePassword(); //run validation
    let output = ""; //output string
    
    //if the password is found to be invalid
    if(!pw){
        passwordValid = false; //ensure password is set to invalid in system
        output = "Invalid Password Input";
        if(charRemaining > 0){//if there are still characters remaining
            output += "\nCharacters Remaining: " + charRemaining;
        }
        if(currentCharCount > CHAR_LIMIT){ //if the character limit has been reached
            output += "\nMaximum Characters exceded";
        }

        output += "\nPassword must contain atleast:\n 1 Uppercase Letter\n 1 Lowercase Letter \n 1 number" +
                        "\n Can also contain special characters excl. - + ! $ ^ & * ; ,";
        document.getElementById("pw-msg").innerText = output; //insert output into html file
    } else {
        if(charRemaining > 0){ //if there are still characters remaining
            output += "\nCharacters Remaining: " + charRemaining;
        }
        document.getElementById("pw-msg").innerText = output;//insert output into html file
        passwordValid = true; //ensure password is set to valid in system
    }
});


/*Checks that password is identical*/
verify.addEventListener('change', (e) => {
    passwordVerified = verifyPassword(e.target.value);

    if(!passwordVerified){
        document.getElementById("verify-msg").innerText = "Passwords do not match";
    } else {
        document.getElementById("verify-msg").innerText = "";
    }
});



