import React from 'react';

const BookSectionTitle = ({ title }) => {
    return (
        <div className="border-b border-primary mb-5">
            <h2 className="md:text-2xl font-bold uppercase bg-primary w-fit px-4 py-1 rounded-t-sm">{title}</h2>
        </div>
    );
};

export default BookSectionTitle;