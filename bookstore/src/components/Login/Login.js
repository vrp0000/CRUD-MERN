import React, { useState } from 'react'
import TextInput from "./TextInput";
import '../../../src/App.css'
import { useHistory } from 'react-router-dom';


const Login = (props) =>
{

    const history = useHistory()
    const [user, setUser] = useState("username")
    const [password, setPassword] = useState("")
    const onChange = (event) =>
    {
        event.target.id === "usr"
            ? setUser(event.target.value)
            : (event.target.id === "passwd"
                ? setPassword(event.target.value)
                : console.log()
            )

    }

    const onbtnClick = (event) =>
    {
        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user,
                password
            })
        }).then((response) =>
        {
            return response.json()
        }).then(data =>
        {
            console.log("Token ", data.token)
            if (data.token === undefined)
                console.log("token", data.token)
            else
                localStorage.setItem("token", data.token)
            history.push("/book-list")
        })
    }
    return (
        <>
            <div className=" card auth-card" >
                <div>
                    <TextInput
                        id="usr"
                        type="text"
                        label="Username"
                        change={onChange}
                        intialValue="Username"
                    />
                    <TextInput
                        id="passwd"
                        type="password"
                        label="Password"
                        change={onChange}
                        intialValue="Password"
                    />
                    <div className="bttn">
                        <button className=" btn waves-effect waves-light " onClick={onbtnClick}>Login

                        </button>

                    </div>
                </div>
            </div >
        </>
    );
}

export default Login;
