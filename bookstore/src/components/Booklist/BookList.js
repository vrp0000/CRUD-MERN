import React, { useEffect, useState } from "react"

import HomePage from "./HomePage"



const BookList = (props) =>
{


    const [lengths, setLen] = useState(0)
    const [data, setData] = useState("");


    useEffect(() =>
    {
        console.log("Data is empty", data === "")
        if (data === "")
            getData()

    });






    const getData = async () =>
    {
        await fetch("/getbooks")
            .then(resp => resp.json())
            .then((list) =>
            {
                setData(list.booklist)
                setLen(list.booklist.length)
                for (let i = 0; i < list.booklist.length; i++) {
                    data[i] = list.booklist[i]
                }
            })
            .catch(error => console.error())
    }





    return (

        <div>
            {console.log("Sending data = ", data)}
            <HomePage books={data} />

        </div>

    )
}

export default BookList