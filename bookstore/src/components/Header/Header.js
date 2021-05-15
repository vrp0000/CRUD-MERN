import React from 'react'
import adds from "./add.png"
import { Link, useHistory, Redirect } from "react-router-dom"
const closeSession = () =>
{

    localStorage.clear();
    < Redirect to="/" />
}



const Header = (props) =>
{
    const history = useHistory()
    return (
        <>

            <div>
                <div>

                    <h2>Booklist{"   "}
                    </h2>

                </div>

                <div className="header">
                    <div className="hdr2">
                        <div>
                            <h4>Filter</h4>
                        </div>
                        <div className="input-field col s12">
                            <form>
                                <select id="grpby" className="browser-default" defaultValue="None">
                                    <option value="category" >Category</option>
                                    <option value="rating" >Rating</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div className="hdr2"><Link to="/book-add">
                        <img src={adds} alt="Add Books" onClick={props.addBook} /> {"   "}
                        <button className="btn" onClick={props.addBook}>Add</button>
                    </Link>
                    </div>
                    <div>
                        <button className="btn" onClick={() =>
                        {
                            localStorage.clear();
                            history.push("/")
                        }}>Log Out</button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Header