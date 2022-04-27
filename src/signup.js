import React from "react";
import * as EmailValidator from "email-validator"; 
import { useFormik } from "formik";
import "./index.css";
import fnLogIn from "./login";
import { render } from "react-dom";


function fnSignUp() {   
  
    const formik = useFormik({   
        initialValues: {
          email: "",
          password: "",
          currentView: "signUp",
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
            errors.password = "Password must be 8 characters long";
          } else if (!passwordRegex.test(values.password)) {
            errors.password = "Invalid password. Must contain one number";
          }
          return errors;
        }

    }); 
    

    let varSignupView = (
    <div>  
    <form onSubmit={formik.handleSubmit}>
      <h2>Sign Up!</h2>
      <fieldset>
        <legend>Create Account</legend>
        <div>             
              <input
                id="emailField"
                type="text"
                name="email"
                placeholder="Enter your email!"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <div id="emailError" className="input-feedback">
                  {formik.errors.email}
                </div>
              ) : null}
        </div>
        <div>
              
                <input
                  id="pswField"
                  type="text"
                  name="password"
                  placeholder="Enter Your Password!"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              <br />
              {formik.errors.password ? (
                <div id="pswError" className="input-feedback">
                  {formik.errors.password}
                </div>
              ) : null}
        </div>
        
      </fieldset>

      <button id="submitBtn" type="submit" 
      disabled={!(formik.dirty && formik.isValid) || (formik.isSubmitting)}>
         Submit </button>

      <button  type="button" onClick={()=> { formik.values.currentView = "logIn"} } >Have an Account?</button>
  
    </form>
    </div>
    )

    return varSignupView ;
   
}

export default fnSignUp;

    