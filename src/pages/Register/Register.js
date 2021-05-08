import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
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

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/register", data).then(() => {
            console.log(data);
        });
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >   
                <Form className="login-container">
                    <h2>Register</h2>
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePostUsername"
                        name="username"
                        placeholder="(Ex. John123...)"
                    />

                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputCreatePostPassword"
                        name="password"
                        placeholder="Your Password..."
                    />

                    <button type="submit"> Register</button>
                </Form>
            </Formik>
        </div>
    );
};