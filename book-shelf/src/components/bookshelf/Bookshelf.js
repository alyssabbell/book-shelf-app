import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CookieContext } from "../../contexts/SessionContext.js";
import BookInShelf from "../bookInShelf/BookInShelf.js";
import "./bookshelf.css";

function Bookshelf({ history }) {

    const [uuid] = useContext(CookieContext);
    const [myShelf, setMyShelf] = useState([]);
    const options = ["Want to Read", "Currently Reading", "Read"];
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    let newShelf = [...myShelf];
    useEffect(() => {
        axios(`http://localhost:7000/bookshelf`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                id: uuid
            }
        })
            .then(resp => {
                setMyShelf(Object.entries(resp.data.books));
                setStatus(resp.statusText);
            })
            .catch(error => setError(error.message));
    }, [newShelf]);

    return (
        <div className="container mt-1 mb-5" id="stand-width">
            {status === "OK" && myShelf.map(([key, books], index) => {
                const currentShelf = key;
                return (
                    <div>
                        <h3 className="shelf-title">{options[index]}</h3>
                        <div className="background-color">
                            {books.length === 0 && (
                                <div>No titles exist</div>
                            )}
                            {books.map((book, idx) => {
                                return (
                                    <div>
                                        <BookInShelf book={book.id} key={book.id} />
                                    </div>)
                            })}
                        </div>
                    </div>
                )
            })}

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    )
};

export default Bookshelf;