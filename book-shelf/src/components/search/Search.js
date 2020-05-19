import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { CookieContext } from "../../contexts/SessionContext.js";
import nocover from "../../no-cover.png";

function Search({ history }) {
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState("");
    const [uuid] = useContext(CookieContext);

    useEffect(() => {

        axios(`http://localhost:7000/book/search/${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                id: uuid
            }
        })
            .then(resp => {
                setBooks(resp.data.books);
                setStatus(resp.data.status);
                console.log(books);
            })
            .catch(error => setErrorMessage(error.message))
    }, [search]);

    console.log(uuid);

    return (
        <div className="container mt-2 mb-5" id="stand-width">
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="form-control mr-sm-2 mb-4" type="search" placeholder="Search" aria-label="Search"></input>
            <div>
                {status === "complete" && books !== undefined && books.map((book, idx) => {
                    const link = "/Details/" + `${book.id}`;

                    return (
                        <div className="media mb-3" key={`book-${idx}`}>
                            {book.imageLinks !== undefined &&
                                (
                                    <img
                                        src={`${book.imageLinks.smallThumbnail}`}
                                        alt={book.title}
                                        width="150"
                                        height="220.875"
                                        className="mr-3"
                                    />
                                )
                            }
                            {book.imageLinks === undefined &&
                                (
                                    <img
                                        src={`${nocover}`}
                                        alt={book.title}
                                        width="150"
                                        height="220.875"
                                        className="mr-3"
                                    />
                                )}

                            <div className="media-body">
                                <h2 className="h4">
                                    <Link to={link}><a href="#" class="text-dark">{book.title}</a></Link>
                                </h2>
                                {book.authors !== undefined && book.authors.map(author => {
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
            {status === "complete" && books && books.length === 0 &&
                (
                    <div>No titles found that match that criteria.</div>
                )}
        </div>
    )
};

export default Search;