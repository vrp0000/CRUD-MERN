import React, { useState } from 'react'
import PageScroller from "./PageScroller"
import BookData from "./Bookdata"
import Header from "../Header/Header"
import { useHistory, Redirect } from 'react-router-dom'




const HomePage = (props) =>
{



    const history = useHistory()
    const [data, setData] = useState([])
    const [Page, setPage] = useState(0)
    const [Current, setCurrentDataSet] = useState(0)
    const [pageContent, setContent] = useState([])

    console.log(props.books === "")
    if (props.books !== "") {
        for (let i = 0; i < props.books.length; i++) {
            data[i] = props.books[i]
        }
    }
    const changePage = (event) =>
    {
        if (event.target.id === "Previous") {

            setCurrentDataSet(Current =>
            {
                if ((Page - 1) <= 0)
                    return 0
                return (Current - 5)
            })


            setPage(Page =>
            {
                if ((Page - 1) < 0) {
                    return 0
                }
                return (Page - 1)
            })

        }

        else if (event.target.id === "Next") {
            if ((Current + 5) < data.length) {
                setPage((Page) => { return Page + 1 })
                setCurrentDataSet((Current => { return Current + 5 }))
            }
        }
        console.log("Slicied data = ", Current, data.slice(Current, Current + 5))
        console.log("Length = ", data.length)
        setContent(data.slice(Current, (Current + 5) < data.length - 1 ? Current + 5 : data.length))

    }


    const deleteRecord = (book, event) =>
    {


        console.log(book)
        fetch('/deletebook', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: book })
        }).then((response) =>
        {
            return response.json()

        }).then(response =>
        {
            console.log(response.message)
            if (response.status === 200)
                history.forward("/book-delete")
        })
    }





















    return (
        <>
            {console.log("Rendering")}
            <Header />
            <BookData books={pageContent} deleteRecord={deleteRecord} />
            <PageScroller change={changePage} />
        </>
    )

}

export default HomePage