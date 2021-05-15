import React from "react";
import edit from "./edit.png"
import deletes from "./delete.png"
import { Link } from "react-router-dom";




const BookData = (props) =>
{
    const { books } = props
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>

                        <th>Title</th>
                        <th>Price</th>
                        <th>Author</th>
                        <th>Rating</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((element) =>
                        {
                            return (
                                <tr key={element["_id"]}>

                                    <td>{element["title"]}</td>
                                    <td>{element["price"]}</td>
                                    <td>{element["author"]}</td>
                                    <td>{element["rating"]}</td>
                                    <td>{element["category"]}</td>
                                    <td>{element["description"]}</td>
                                    <td>
                                        <Link to={"/book-update/" + element["title"]}>  <img id={element["_id"]} src={edit} alt="Edit" /></Link>
                                    </td>
                                    <td>  <button onClick={() => props.deleteRecord(element["_id"])}><img id={element["_id"]} src={deletes} alt="Delete" /></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default BookData