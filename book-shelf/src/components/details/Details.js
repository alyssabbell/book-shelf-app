import React, { useEffect, useState, useContext } from 'react';
import { CookieContext } from "../../contexts/SessionContext.js";
import axios from 'axios';
import { Redirect } from "react-router-dom";
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();


function Detail(props) {
    console.log("props from details: ", props);

    let options = ["Want to Read", "Currently Reading", "Read"];
    const [uuid] = useContext(CookieContext);
    const [currBook, setCurrBook] = useState({});
    // this corresponds with the key (wantToRead, currentlyReading, read)
    const [newShelfOpt, setNewShelfOpt] = useState("");
    const keys = ["wantToRead", "currentlyReading", "read"];

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
            // .then(resp => setStatus(resp.data.status))
            .then(resp => setCurrBook(resp.data.book))
            .catch(error => console.log(error))
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
            // .then(resp => setStatus(resp.data.status))
            //.then(resp => setCurrBook(resp.data.book))
            //.then(() => console.log(newShelfOpt))
            .catch(error => console.log(error))

    }, [newShelfOpt]);


    return (
        <div className="container mt-2 mb-5" id="stand-width">
            <h2>{currBook.title}</h2>
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
                        <div>No image available</div>
                    )}

                <div className="media-body">
                    <div className="h5" >Author(s):</div><span>{currBook.authors !== undefined && currBook.authors.map(author => {
                        return (<div>{author}</div>)
                    })}</span>
                    <div className="h5" >Description: </div><span> {currBook.description}</span>
                    <div className="h5" >Publisher: </div><span> {currBook.publisher}</span>
                    <div className="h5" >Publish Date: </div><span> {currBook.publishedDate}</span>
                    <div className="h5" >Change shelf: </div>
                    <div>
                        <select onChange={(e) => {
                            setNewShelfOpt(e.target.value);
                            // I want to push to Bookshelf but this isn't working
                            // history.push("/Bookshelf");
                            return <Redirect to="/Bookshelf" />
                        }} name="SelectOption">
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
    );

};

export default Detail;