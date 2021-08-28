// import React, { useState, useEffect, useCallback } from 'react';
// import { Input, Button } from '../../../common/component';
// import { useHistory } from 'react-router-dom';
// import { Col, Row } from 'reactstrap';

// function AddArtist(props) {
//     const history = useHistory();
//     const [params, setParams] = useState([]);
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         setParams(getFields());
//     }, [])

//     const getFields = (editMode) => {
//         return [
//             {
//                 name: 'artistType',
//                 value: editMode && editMode.value ? editMode.value : '',
//                 label: 'Artist Type',
//                 type: 'select',
//                 options: ['comedy', 'sci-fi', 'romantic'],
//                 placeholder: 'select artist'
//             },
//             {
//                 name: 'name',
//                 value: editMode && editMode.value ? editMode.value : '',
//                 label: 'Artist Name',
//                 type: 'text',
//                 placeholder: 'Enter name'
//             },
//             {
//                 name: 'dob',
//                 value: editMode && editMode.value ? editMode.value : '',
//                 label: 'Date Of Birth',
//                 type: 'text',
//                 placeholder: 'Enter name'
//             },

//         ]
//     }

//     return (
//         <>
//             <Button
//                 buttonType='primary'
//                 size='sm'
//                 buttonClick={() => history.push('/home')}
//                 innerContent='Back'
//             />
//             {
//                 params && params.map((item, index) => {
//                     return (
//                         <div className='row' key={index}>
//                             <Input
//                                 onChange={(e) => {
//                                     let oldState = [...params]
//                                     oldState[index].value = e.target.value;
//                                     setParams(oldState);
//                                 }}
//                                 type={item.type}
//                                 value={item.value}
//                                 label={item.label}
//                                 width={4}
//                             />
//                         </div>
//                     )
//                 })
//             }
//             <div className='float-right'>
//                 <Col xl={2} lg={2} md={2} sm={2} xs={2}>
//                     <Button
//                         buttonType='secondary'
//                         size='sm'
//                         buttonClick={() => history.push('/')}
//                         innerContent='Cancel'
//                     />
//                 </Col>
//                 <Col xl={2} lg={2} md={2} sm={2} xs={2}>
//                     <Button
//                         buttonType='primary'
//                         size='sm'
//                         buttonClick={() => { }}
//                         innerContent='Add'
//                     />
//                 </Col>
//             </div>
//         </>
//     )
// }
// export default AddArtist;

import React, { useState, useEffect } from "react";
import { Jumbotron, Card, CardBody, } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Input, Button } from '../../../common/component';
import dataService from "../../../services";

const AddArtist = (props) => {
    const history = useHistory()
    const location = useLocation()
    const [params, setParams] = useState([]);
    const [routeState, setRouteState] = useState()

    useEffect(() => {
        const routeData = location && location.state && location.state.config
        if (location.search) {
            setRouteState(routeData)
        }
        setParams(getFields(routeData));
    }, [routeState, location.search])

    const getFields = (routeState) => {
        return [
            {
                name: 'genres',
                value: routeState && routeState.genres ? routeState.genres : '',
                label: 'Genres',
                type: 'select',
                options: ['comedy', 'sci-fi', 'romantic'],
                placeholder: 'select artist',
                required: true
            },
            {
                name: 'name',
                value: routeState && routeState.name ? routeState.name : '',
                label: 'Artist Name',
                type: 'text',
                required: true,
                expression: /^([a-z0-9]{5,})$/
            },
            // {
            //     name: 'mobile',
            //     value: routeState && routeState.mobile ? routeState.mobile : '',
            //     label: 'Pohone No.',
            //     type: 'number',
            //     required: true,
            //     expression: /^[0-9\b]+$/,
            //     minLength: 10,
            //     maxLength: 10,
            //     messaage: 'Your mobile must be 10 digit'
            // },
            // {
            //     name: 'dob',
            //     value: routeState && routeState.dob ? routeState.dob : '',
            //     label: 'Date Of Birth',
            //     type: 'date',
            //     required: true
            // },
            {
                name: 'time',
                value: routeState && routeState.time ? routeState.time : '',
                label: 'Show Time',
                type: 'time',
                required: true
            },
            {
                name: 'day',
                value: routeState && routeState.day ? routeState.day : '',
                label: 'Day',
                type: 'select',
                options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                required: true
            },
            {
                name: 'language',
                value: routeState && routeState.language ? routeState.language : '',
                label: 'Language',
                type: 'select',
                options: ['Marathi', 'English', 'Hindi', 'Holywood', 'Dutch'],
                required: true
            },
            {
                name: 'location',
                value: routeState && routeState.location ? routeState.location : '',
                label: 'Show Location',
                type: 'text',
                required: true
            },

        ]
    }

    const handleValidSubmit = (event, values) => {
        if (location && location.state && location.state.config) {
            let data = Object.assign(values, { id: routeState._id })
            saveData('update', data)
        } else saveData('create', values)
    };

    const saveData = (method, data) => {
        dataService[method](data)
            .then(response => {
                console.log("response.data", response);
                history.push('/home')
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleInvalidSubmit = (event, errors, values) => {
        console.log(`failed`, errors);
    };

    return (
        <>
            <Button
                buttonType='primary'
                size='sm'
                buttonClick={() => history.push('/home')}
                innerContent='Back'
            />
            <Jumbotron>
                <h3 className='head-name'>
                    <u>Artist Form</u>
                </h3>
                <hr />
                <Card>
                    <CardBody>
                        <AvForm
                            onValidSubmit={handleValidSubmit}
                            onInvalidSubmit={handleInvalidSubmit}
                        >
                            {
                                params.map((item, index) => {
                                    return (
                                        <AvField
                                            key={index}
                                            name={item.name}
                                            label={item.label}
                                            type={item.type}
                                            validate={{
                                                required: item.required,
                                                // pattern: { value: item.expression },
                                                // minLength: { value: item.minLength, errorMessage: item.messaage },
                                                // maxLength: { value: item.maxLength, errorMessage: item.messaage }
                                            }}
                                            value={item.value}
                                        >
                                            {
                                                item.type === 'select' ? item.options.map((opt, i) => {
                                                    return <option key={i}>{opt}</option>
                                                }) : null
                                            }
                                        </AvField>
                                    )
                                })
                            }
                            <Button
                                id="cancel"
                                buttonType='secondary'
                                size='sm'
                                innerContent='Cancel'
                                buttonClick={() => history.push('/home')}
                            />
                            <Button
                                id="submit"
                                buttonType='primary'
                                size='sm'
                                innerContent={location && location.state && location.state.config ? 'Update' : 'Add'}
                            />
                        </AvForm>
                    </CardBody>
                </Card>
            </Jumbotron>
        </>
    );
}

export default AddArtist