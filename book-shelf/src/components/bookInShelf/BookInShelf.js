import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CookieContext } from "../../contexts/SessionContext.js";
import { Link } from "react-router-dom";
import nocover from "../../no-cover.png";
import "./bookinshelf.css";

const BookInShelf = (props) => {

    const [uuid] = useContext(CookieContext);
    const [currBook, setCurrBook] = useState({});
    // this corresponds with the key (wantToRead, currentlyReading, read)
    const [newShelfOpt, setNewShelfOpt] = useState("");
    const [status, setStatus] = useState("");
    const options = ["Want to Read", "Currently Reading", "Read", "Delete"];
    const keys = ["wantToRead", "currentlyReading", "read", "none"];
    const link = "/Details/" + `${currBook.id}`;


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
            .then(resp => {
                setCurrBook(resp.data.book);
                setStatus(resp.statusText)
            })
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
            {status === "OK" && (
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
                        <Link to={link}><a href="#" class="text-dark"><h5 className="h5" >{currBook.title} </h5></a></Link>
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
            )}
        </>
    )
};

export default BookInShelf;