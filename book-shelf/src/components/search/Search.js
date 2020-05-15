import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Details from "../details/Details";
import { Link } from "react-router-dom";

function Search({ history }) {
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [books, setBooks] = useState([]); // need to pass these books up to app?
    const [status, setStatus] = useState("");

    useEffect(() => {

        axios(`http://localhost:7000/book/search/${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            // params: {
            //     id: uuid // Passing to the token to the API here, where it is a parameter
            // }
        })
            //.then(resp => console.log(resp.data.books))
            // .then(resp => setStatus(resp.data.status))
            .then(resp => setBooks(resp.data.books))
            .catch(error => setErrorMessage("There's an error loading book.."))
    }, [search]);

    if (books !== undefined) {
        books.map(book => console.log(book));
    }

    function handleBookClick(e) {
        e.precventDefault();
        window.history.pushState({}, document.id, e.target.href);
        // setClickedBook(id);
        // history.push("/Details");
    };
    //  <a href="/url" onClick={handleBookClick} />

    return (
        <>
            <label>Search:</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <div>{search}</div>
            <div>
                {books !== undefined && books.map((book, idx) => {
                    const currBookId = book.id;
                    const link = "/Details/" + currBookId;
                    return (
                        <div className="media mb-3" key={`book-${idx}`}>
                            <img
                                //src={book.imageLinks.smallThumbnail}
                                alt={book.title}
                                width="150"
                                height="220.875"
                                className="mr-3"
                            />
                            <div className="media-body">
                                <h2 className="h3">
                                    <Link to={link}>{book.title}</Link>
                                </h2>
                                {book.authors.map(author => {
                                    return (<div>{author}</div>)
                                })
                                }
                            </div>
                        </div>
                    );
                })}

                {/* {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )} */}
            </div>
        </>
    )
};

export default Search;