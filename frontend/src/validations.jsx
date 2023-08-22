function validations(values) {

    let error = {};

 

    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const name_regex = /^[A-Za-z\s'-]+$/;

    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;

 

    if(values.name === "") error.name = "Name field cannot be empty.";

    else if(!(name_regex.test(values.name))) error.name = "This user name is not valid";

 

    if(values.email === "") error.email = "Email field cannot be empty";

    else if(!(email_regex.test(values.email))) error.email = "This is not a valid email format";

   

    if(values.password === "") error.password = "Password field cannot be empty";

    else if(!password_regex.test(values.password)) error.password = "This is not a valid password";

 

    if((values.confirm_password) === "" || String(values.confirm_password) != String(values.password) ) error.confirm_password = "Password doesn't match";

 

   

    return error;

}

 

export default validations;