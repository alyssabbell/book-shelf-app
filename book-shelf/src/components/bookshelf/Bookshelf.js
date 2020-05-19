import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CookieContext } from "../../contexts/SessionContext.js";
import BookInShelf from "../bookInShelf/BookInShelf.js";

function Bookshelf({ history }) {

    const [uuid] = useContext(CookieContext);
    const [myShelf, setMyShelf] = useState([]);
    const options = ["Want to Read", "Currently Reading", "Read"];
    const [status, setStatus] = useState("");
    let newShelf = [...myShelf];

    useEffect(() => {
        axios(`http://localhost:7000/bookshelf`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                id: uuid // Passing to the token to the API here, where it is a parameter
            }
        })
            .then(resp => {
                setMyShelf(Object.entries(resp.data.books));
                setStatus(resp.statusText);
            })
            .catch(error => console.log(error))
    }, [newShelf]);


    return (
        <div className="container mt-2 mb-5" id="stand-width">
            {status === "OK" && myShelf.map(([key, books], index) => {
                return (
                    <div className="border border-info">
                        <h3 className="shelf-title">{options[index]}</h3>
                        {books.length === 0 && (
                            <div>No titles exist</div>
                        )}
                        {books.map((book, idx) => {
                            return (
                                <div>
                                    <BookInShelf book={book.id} key={key + idx} />
                                </div>)
                        })}
                    </div>
                )
            })}
        </div>
    )
};

export default Bookshelf;