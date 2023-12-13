import { useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId }
    });

    const displayBookData = useCallback(() => {
        if (loading) return <p>Book data is loading...</p>;
        if (error) return <p>Error : {error.message}</p>;
        const { book } = data;

        return (
            <div id="book-details">
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books by this author:</p>
                <ul className='other-books'>
                    {
                        book.author.books.map(({ name, id, }) => {
                            return <li key={id}>{name}</li>
                        })
                    }
                </ul>
                {/* {data.book.author.books} */}
            </div>
        )
    }, [loading, error, data]);

    return displayBookData();
}

export default BookDetails;
