import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import BookList from "./components/Booklist/BookList"
import { Route, Switch } from "react-router-dom"
import BookDelete from "./components/Booklist/BookDelete";
import form from "./components/BookForm/form";
import ManageBooks from "./components/ManageBooks/Managebooks";
import { BrowserRouter, useHistory } from "react-router-dom";


const Routing = () =>
{
  const history = useHistory();
  useEffect(() =>
  {
    const token = localStorage.getItem("token")
    if (!token) {
      history.push("/")
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/book-list" component={BookList} />
      <Route exact path="/book-delete" component={BookDelete} />
      <Route exact path="/book-add" component={ManageBooks} />
      <Route exact path="/book-update/:name" component={ManageBooks} />
    </Switch>
  )

}


const App = () =>
{
  return (
    <Routing />
  )
}

export default App