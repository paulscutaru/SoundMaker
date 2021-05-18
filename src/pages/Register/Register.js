import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Logo from '../../components/Logo/Logo'
import '../Login/Login.css'

export default function Registration() {
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4).max(15).required(),
        password: Yup.string().min(4).max(15).required(),
    });


    var history = useHistory()

    const submit = (data) => {
        axios.post("http://localhost:3001/auth/register", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            }
            else {
                alert('Register success! Redirect to login page...')
                history.push('/')
            }
        });
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={validationSchema}
            >
                <Form className="login-container">
                    <Logo />
                    <h2>Register</h2>

                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePostUsername"
                        name="username"
                    />

                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputCreatePostPassword"
                        name="password"
                    />

                    <button className='submit-button' type="submit"> Register</button>
                </Form>
            </Formik>
        </div>
    );
};