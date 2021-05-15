import React from 'react'
import { useHistory } from 'react-router-dom'

const BookDelete = () =>
{
    const history = useHistory();
    history.push("/book-list")

}

export default BookDelete