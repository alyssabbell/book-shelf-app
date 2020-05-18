import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CookieContext } from "../../contexts/SessionContext.js";
import BookInShelf from "../bookInShelf/BookInShelf.js";

function Bookshelf({ history }) {

    const [uuid] = useContext(CookieContext);
    const [myShelf, setMyShelf] = useState([]);

    let options = ["Want to Read", "Currently Reading", "Read"];
    // might be best to store this in a context (or regular js file) and import it for
    // the components with dropdowns. set up as....
    /*
    {
        wantToRead: "Want To Read",
        currentlyReading: "Currently Reading",
        read: "Read"
    }
    */

    // this seems silly but if I rerender the useEffect based on myShelf in state,
    // the rerender goes into a loop. This prevented the loop.
    let currentShelf = myShelf;

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
            //.then(resp => console.log(resp.data.books))
            // .then(resp => setStatus(resp.data.status))

            //.then(resp => handleShelf(resp.data.books))
            .then(resp => setMyShelf(Object.entries(resp.data.books)))
            .catch(error => console.log(error))
    }, [currentShelf]);


    return (
        <div className="container mt-2 mb-5" id="stand-width">
            {myShelf.map(([key, books], index) => {
                return (
                    <div>
                        <h3>{options[index]}</h3>
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