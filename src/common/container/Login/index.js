import React from "react";
import { Jumbotron, Card, CardBody, } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from '../../component';
import './login.scss';


const LoginForm = () => {
    const history = useHistory()

    const handleValidSubmit = (event, values) => {
        localStorage.setItem("user", JSON.stringify(values))
        history.push('/home')
    };

    const handleInvalidSubmit = (event, errors, values) => {
        console.log(`Login failed`, errors);
    };

    return (
        <Jumbotron>
            <h3 className='head-name'>
                <u>Login Form</u>
            </h3>
            <hr />
            <Card>
                <CardBody>
                    <AvForm
                        onValidSubmit={handleValidSubmit}
                        onInvalidSubmit={handleInvalidSubmit}
                    >
                        <AvField
                            name="email"
                            label="Email"
                            type="text"
                            validate={{
                                required: true,
                                email: true
                            }}
                        />
                        <AvField
                            name="password"
                            label="Password"
                            type="password"
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: "Please enter your password"
                                },
                                // pattern: {
                                //     value: "^[A-Za-z0-9]+$",
                                //     errorMessage:
                                //         "Your password must be composed only with letter and numbers"
                                // },
                                // minLength: {
                                //     value: 6,
                                //     errorMessage: "Your password must be between 6 and 16 characters"
                                // },
                                // maxLength: {
                                //     value: 16,
                                //     errorMessage: "Your password must be between 6 and 16 characters"
                                // }
                            }}
                        />
                        <Button
                            id="submit"
                            buttonType='primary'
                            size='sm'
                            // buttonClick={handleValidSubmit}
                            innerContent='Login'
                        />
                    </AvForm>
                </CardBody>
            </Card>
        </Jumbotron>
    );
}

export default LoginForm