import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CookieContext } from "../../contexts/SessionContext.js";


const BookInShelf = (props) => {

    const [uuid] = useContext(CookieContext);
    const [currBook, setCurrBook] = useState({});
    // this corresponds with the key (wantToRead, currentlyReading, read)
    const [newShelfOpt, setNewShelfOpt] = useState("");

    const options = ["Want to Read", "Currently Reading", "Read"];
    const keys = ["wantToRead", "currentlyReading", "read"];

    // retrieves the book from the Id that was passed in
    useEffect(() => {

        axios(`http://localhost:7000/book/${props.book}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                id: uuid
            }
        })
            // .then(resp => setStatus(resp.data.status))
            .then(resp => setCurrBook(resp.data.book))
            //.then(resp => console.log(resp.data.book))
            .catch(error => console.log(error))
    }, []);

    // adds book to shelf shelf when dropdown is changed
    useEffect(() => {
        axios(`http://localhost:7000/bookshelf/${props.book}/${newShelfOpt}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                id: uuid
            }
        })
            // .then(resp => setStatus(resp.data.status))
            //.then(resp => setCurrBook(resp.data.book))
            //.then(() => console.log(newShelfOpt))
            .catch(error => console.log(error))

    }, [newShelfOpt]);

    return (
        <>
            <div>You've reached a book inside the shelf.</div>
            <div className="media mb-3">
                <img
                    //src={book.imageLinks.smallThumbnail}
                    alt={currBook.title}
                    width="150"
                    height="220.875"
                    className="mr-3"
                />
                <div className="media-body">
                    <div className="h5" >{currBook.title} </div>
                    <div className="h6" >Change shelf: </div>
                    <div>
                        <select onChange={(e) => setNewShelfOpt(e.target.value)} name="SelectOption">
                            <option disabled>Select an option</option>
                            {
                                options.map((label, idx) => {
                                    return <option value={keys[idx]} key={label + idx}>{label}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BookInShelf;