# Readme

This Mini Project Exercise simulates form validation on a sign up form.
The main components are an email input, password input and a password repeat verification input.

The current version has:       
- Validation checks that email is in a valid email format
- Password validation includes:
  - Does not exceded Maximum Character Limit specified as Global constant
  - Does not fall short of Minimum Character Limit specified as Global constant
  - Both User Entered Passwords Match
  - Password contains atleast 1 Uppercase letter, 1 Lowercase letter and atleast 1 number
  - Password does not contain these special characters: - + ! $ ^ & * ; , (whitespace)
  - Does not contain words such as 'SELECT', 'INSERT', 'DELETE' , 'UPDATE', 'FROM', 'WHERE', 'OR', 'AND', 'SET' (My Current and possibly naive attempt at avoiding/reducing SQL injection attacks via Client-Side Validation).

