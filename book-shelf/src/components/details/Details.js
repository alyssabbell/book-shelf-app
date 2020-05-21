import React, { useEffect, useState, useContext } from 'react';
import { CookieContext } from "../../contexts/SessionContext.js";
import axios from 'axios';
import nocover from "../../no-cover.png";


function Detail(props) {
    console.log("props from details: ", props);

    let options = ["Want to Read", "Currently Reading", "Read"];
    const keys = ["wantToRead", "currentlyReading", "read"];
    // this corresponds with the key (wantToRead, currentlyReading, read)
    const [newShelfOpt, setNewShelfOpt] = useState("");
    const [uuid] = useContext(CookieContext);
    const [currBook, setCurrBook] = useState({});
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const bookId = props.computedMatch.params.id;

    useEffect(() => {

        axios(`http://localhost:7000/book/${bookId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                id: uuid
            }
        })
            .then(resp => {
                setCurrBook(resp.data.book);
                setStatus(resp.statusText);
            })
            .catch(error => setError(error.message))
    }, []);

    useEffect(() => {
        axios(`http://localhost:7000/bookshelf/${bookId}/${newShelfOpt}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                id: uuid
            }
        })
            .then()
            .catch(error => alert(error.message))

    }, [newShelfOpt]);


    return (
        <div className="container mt-2 mb-5" id="stand-width">
            {status === "OK" &&
                (
                    <div>
                        <h2 className="book-title">{currBook.title}</h2>
                        <div className="media mb-3 background-color">
                            {currBook.imageLinks &&
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
                                <div className="h5 sub-info" >Author(s):</div><span>{currBook.authors && currBook.authors.map((author, index) => {
                                    return (<div key={index}>{author}</div>)
                                })}</span>

                                {currBook.description && (
                                    <>
                                        <div className="h5 mt-3 sub-info" >Description: </div><span> {currBook.description}</span>
                                    </>
                                )}

                                {currBook.publisher && (
                                    <>
                                        <div className="h5 mt-3 sub-info" >Publisher: </div><span> {currBook.publisher}</span>
                                    </>
                                )}
                                {currBook.publishedDate && (
                                    <>
                                        <div className="h5 mt-3 sub-info" >Publish Date: </div><span> {currBook.publishedDate}</span>
                                    </>
                                )}

                                <div className="h5 mt-3 sub-info" >Change shelf: </div>
                                <div>
                                    <select onChange={(e) => {
                                        setNewShelfOpt(e.target.value);
                                        window.location.href = "/Bookshelf";
                                    }}
                                        name="SelectOption">
                                        <option selected>Select an option</option>
                                        {
                                            options.map((label, idx) => {
                                                return <option value={keys[idx]} key={label + idx}>{label}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    );

};

export default Detail;