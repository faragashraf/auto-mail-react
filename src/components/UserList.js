import React from 'react'
import User from './User'
import { useNavigate } from 'react-router-dom';
const UserList = ({ data, currentPage, getAllContacts }) => {
    
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate('/Home')} className='btn'>
                <i className='bi bi-plus-square'></i> Back To Home
            </button>
            <main className='main'>
                {data?.content?.length === 0 && <div>No Contacts. Please add a new contact</div>}

                <ul className='contact__list'>
                    {data?.content?.length > 0 && data.content.map(user => <User user={user} key={user.id} />)}
                </ul>

                {data?.content?.length > 0 && data?.totalPages > 1 &&
                    <div className='pagination'>
                        <a onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                        {data && [...Array(data.totalPages).keys()].map((page, index) =>
                            <a onClick={() => getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                        <a onClick={() => getAllContacts(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
                    </div>
                }

            </main>
        </>
    )
}

export default UserList