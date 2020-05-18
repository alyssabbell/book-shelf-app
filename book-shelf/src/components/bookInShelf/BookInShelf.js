import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CookieContext } from "../../contexts/SessionContext.js";
import nocover from "../../no-cover.png";

const BookInShelf = (props) => {

    const [uuid] = useContext(CookieContext);
    const [currBook, setCurrBook] = useState({});
    // this corresponds with the key (wantToRead, currentlyReading, read)
    const [newShelfOpt, setNewShelfOpt] = useState("");

    const options = ["Want to Read", "Currently Reading", "Read", "Delete"];
    const keys = ["wantToRead", "currentlyReading", "read", "none"];
    // const [, setShelfChange] = useC();

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
            //  .then(() => props.setShelfChange(true))
            .then(/* push to bookshelf or search */)
            .catch(error => console.log(error))

    }, [newShelfOpt]);

    return (
        <>
            <div className="media mb-3">
                {currBook.imageLinks !== undefined &&
                    (
                        <img
                            src={`${currBook.imageLinks.smallThumbnail}`}
                            alt={currBook.title}
                            width="150"
                            height="220.875"
                            className="mr-3"
                        />
                    )
                }
                {currBook.imageLinks === undefined &&
                    (
                        <img
                            src={`${nocover}`}
                            alt={currBook.title}
                            width="150"
                            height="220.875"
                            className="mr-3"
                        />
                    )}
                <div className="media-body">
                    <div className="h5" >{currBook.title} </div>
                    <div className="h6" >Change shelf: </div>
                    <div>
                        <select onChange={(e) => setNewShelfOpt(e.target.value)} name="SelectOption">
                            <option selected>Select an option</option>
                            {
                                options.map((label, idx) => {
                                    // if (label === props.key) {
                                    //     // want to set dropdown option as selected where props.key === label
                                    // }
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