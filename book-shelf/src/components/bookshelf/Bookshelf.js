import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CookieContext } from "../../contexts/SessionContext.js";
import BookInShelf from "../bookInShelf/BookInShelf.js";

function Bookshelf({ history }) {

    const [uuid] = useContext(CookieContext);
    const [myShelf, setMyShelf] = useState([]);

    let options = ["Want to Read", "Currently Reading", "Read"];

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
    }, [myShelf]);


    return (
        <>
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



                // (function () {
                //     if (books.length === 0) {
                //         return <p>No books here!</p>
                //     }
                //     else {
                //         books.map((book, idx) => {
                //             return (
                //                 <div>
                //                     <BookInShelf book={book.id} key={key + idx} />
                //                 </div>)
                //         })
                //     }
                // })

                // if (books.length === 0) {
                //    return (<p>No books here!</p>)
                // }
                // else {
                //     books.map((book, idx) => {
                //         return (
                //             <div>
                //                 <BookInShelf book={book.id} key={key + idx} />
                //             </div>)
                //     })
                // } // end of else

            })}
            {/* {myShelf.map(([key, books]) => {
                if (key === "wantToRead") {
                    //return (<h3>Want To Read</h3>)

                    if (books.length === 0) {
                        return (<p>No books here!</p>)
                    }
                    else {
                        books.map((book, idx) => {
                            return (
                                <div>
                                    <BookInShelf book={book.id} key={"wantToRead" + idx} />
                                </div>)
                        })
                    }
                }
                // -------
                if (key === "currentlyReading") {
                    //return (<h3>Currently Reading</h3>)

                    if (books.length === 0) {
                        return (<p>No books here!</p>)
                    }
                    else {
                        books.map((book, idx) => {
                            return (
                                <div>
                                    <BookInShelf book={book.id} key={"currentlyReading" + idx} />
                                </div>)
                        })
                    }
                }
                // ---------
                if (key === "read") {
                    // return (<h3>Read</h3>)

                    if (books.length === 0) {
                        return (<p>No books here!</p>)
                    }
                    else {
                        books.map((book, idx) => {
                            return (
                                <div>
                                    <BookInShelf book={book.id} key={"read" + idx} />
                                </div>)
                        })

                    }
                }
            })} */}
            {/* // Object.keys(handleShelf()).map(shelf => {
                //     return (<div>{shelfOption[shelf]}</div>)
                //     //console.log
                // }) */}
            {/* {myShelf.map(shelf => {
                return (<h3>{shelf.header}</h3>)

                if (shelf.books.length > 0) {
                    shelf.books.map(book => {
                        return (
                            <div>
                                <BookInShelf book={book} />
                            </div>
                        )
                    })

                }
            })} */}
        </>
    )
};

export default Bookshelf;