import React from "react";
import * as EmailValidator from "email-validator"; 
import { useFormik } from "formik";
import "./index.css";
import fnSignUp from "./signup";
import fnLogIn from "./login" ;


function App() {

  // TODO: add a const called formik assigned to useFormik()
  const formik = useFormik({   
    initialValues: {
      email: "",
      password: "",
      currentView: "SignUp",
      currentLogin: "logIn" ,
      dirty: false
    },

    onSubmit: (values, submitProps) => {
      submitProps.setSubmitting(false)
      
      //enableReinitialize props on the top Formik components
      //so that you can reset the form
      submitProps.resetForm() ;
      alert("Login Successful ");
    },

    validate: (values) => {   
      let errors = {};

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!EmailValidator.validate(values.email)) {
      errors.email = "Invalid email address.";
    }

    const passwordRegex = /(?=.*[0-9])/;
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters long.";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Invalid password. Must contain one number.";
    }

    return errors;
  }
  
  }); 


   
  
  if (formik.values.currentView === 'signUp' && formik.values.currentLogin == "") {
    let retSignUpView = fnSignUp() ;

    return retSignUpView;
  }
      
    
  if (formik.values.currentLogin === 'logIn') {
    let retLogInVal = fnLogIn();
    return retLogInVal;
  }
     
}


export default App;
