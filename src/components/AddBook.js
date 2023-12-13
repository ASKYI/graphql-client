import { useQuery, useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {
    const [newBook, setNewBook] = useState({ name: '', genre: '', authorId: '' });
    const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(getAuthorsQuery);

    const [addBook, { addBookData, addBookLoading, addBookError }] = useMutation(addBookMutation);

    const displayAuthors = useCallback(() => {
        if (authorsLoading) return <option disabled>Loading authors...</option>
        if (authorsError) return <p>Error : {authorsError.message}</p>;

        return authorsData.authors.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
        ))
    }, [
        authorsLoading, authorsError, authorsData
    ]);

    const submitForm = useCallback((e) => {
        e.preventDefault();
        addBook({
            variables: {
                name: newBook.name,
                genre: newBook.genre,
                authorId: newBook.authorId,
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }, [newBook, addBook]);

    return (
        <form id='add-book' onSubmit={submitForm}>
            <div className='field'>
                <label>Book name:</label>
                <input type='text' onChange={(e) => setNewBook(prevState => ({ ...prevState, name: e.target.value }))}></input>
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type='text' onChange={(e) => setNewBook(prevState => ({ ...prevState, genre: e.target.value }))}></input>
            </div>
            <div className='field'>
                <label>Author:</label>
                <select onChange={(e) => setNewBook(prevState => ({ ...prevState, authorId: e.target.value }))}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button type='submit' className='add-book-button'>Add book</button>
        </form>
    )
}

export default AddBook;
