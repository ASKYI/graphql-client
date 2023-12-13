import { useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { getBooksQuery } from '../queries/queries';

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);

    const displayBooks = useCallback(() => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : {error.message}</p>;

        return data.books.map(({ id, name }) => (
            <li key={id}>
                {name}
            </li>
        ))
    }, [loading, error, data]);

    return (
        <div>
            <ul id='book-list'>
                {displayBooks()}
            </ul>
        </div>
    );
}

export default BookList;
