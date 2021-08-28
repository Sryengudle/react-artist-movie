import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AddArtist, Movies } from './containers';
import { Header, LoginForm } from './common/container';
import { ConfirmBox } from './common/container'
import { isUserExist } from './utils/users';

export const Context = React.createContext();

const App = () => {

    const [hideConfirm, setHideConfirm] = useState(false)
    const [confirmPayload, setConfirmPayload] = useState({});
    const [userAuth, setUserAuth] = useState(false)
    useEffect(() => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { email: '', password: '' }
        setUserAuth(isUserExist(user))
    }, [userAuth, localStorage.getItem("user")]);

    const showConfirm = (content = 'tset', onOk = () => { }, onCancle = () => { }) => {
        let payload = {
            content,
            open: true,
            onOk,
            onCancle,
        }
        setConfirmPayload(payload)
    }

    const hideConfirmBox = () => setHideConfirm(!hideConfirm)

    console.log('isUserExist(JSON.parse(localStorage.getItem("user")))',)
    return (
        <BrowserRouter>
            <div className="col-md-12 app-wrapper">
                <h1 className="text-center" style={style}></h1>
                <Context.Provider value={{
                    confirm: {
                        show: showConfirm,
                    },
                    userExist: userAuth
                }}>
                    <Header />
                    <Switch>
                        <Route exact path={["/", "/home"]} exact component={Movies} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/add-artist" component={AddArtist} />
                    </Switch>
                    {<ConfirmBox showConfirmBox={confirmPayload} hideConfirmBox={hideConfirmBox} />}
                </Context.Provider>
            </div>
        </BrowserRouter>
    );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;
