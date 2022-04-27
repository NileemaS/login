import React from "react";
import * as EmailValidator from "email-validator"; 
import { useFormik } from "formik";
import "./index.css";
import { render } from "react-dom";


function fnLogIn() {

    const formik = useFormik({   
        initialValues: {
          email: "",
          password: "",
          currentView: "",
          currentLogin: "",
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

let rtnLoginView = (
    <div>
    <form onSubmit={formik.handleSubmit}>
      <h2>Welcome Back!</h2>
      <fieldset>
        <legend>Log In</legend>
                                                  
        <div>           
            <input
                id="emailFieldLogin"
                type="text"
                name="email"
                placeholder="Enter your email!"
                onChange={formik.handleChange}
                value={formik.values.email}             
            />
            {formik.errors.email ? (
                <div id="emailErrorLogin" className="input-feedback">
                    {formik.errors.email}
                </div>
            ) : null}
        </div> 
        <div>
            <input
                id="pswFieldLogin"
                type="text"
                name="password"
                placeholder="Enter Your Password!"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <br />
            {formik.errors.password ? (
                <div id="pswErrorLogin" className="input-feedback">
                    {formik.errors.password}
                </div>
            ) : null}
        </div>

        <a onClick={()=>{formik.values.currentView = ""}} href="#">Forgot Password?</a>
    </fieldset>

    <button type="submit"
      disabled={!(formik.dirty && formik.isValid) || (formik.isSubmitting)}>Login
    </button>

    <button type="button" onClick={()=> {formik.values.currentView = "signUp";}}>Create an Account</button>

    </form>
    </div>
  )

  return rtnLoginView;
} 

export default fnLogIn;
