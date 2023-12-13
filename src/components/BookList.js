import { useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBook, setSelectedBook] = useState();

    const displayBooks = useCallback(() => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : {error.message}</p>;

        return data.books.map(({ id, name }) => (
            <li key={id} onClick={() => setSelectedBook(id)}>
                {name}
            </li>
        ))
    }, [loading, error, data]);

    return (
        <div>
            <ul id='book-list'>
                {displayBooks()}
            </ul>
            {selectedBook ? <BookDetails bookId={selectedBook} /> : <div>No book selected</div>}
        </div>
    );
}

export default BookList;
