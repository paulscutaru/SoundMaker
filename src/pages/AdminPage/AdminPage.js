import React, { useState } from 'react'
import axios from 'axios'
import './AdminPage.css'

export default function AdminPage() {
    const [users, setUsers] = useState()
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    function checkPassword(pass) {
        setPassword(pass)

        if (pass === 'admin123') {

            axios.get('http://localhost:3001/auth/getUsers', {
                headers: { password: pass }
            }).then((response) => {
                if (response.data.error)
                    console.log(response.data.error)
                else {
                    setUsers(response.data)
                    setIsAdmin(true)
                    console.log('Users:', response.data)
                }
            })
        }
    }


    function deleteUser(user_id) {
        axios.delete(`http://localhost:3001/auth/delete/${user_id}`, {
            headers: { password: password },
        })
            .then((response) => {
                if (response.data.error)
                    console.log(response.data.error)
                else {
                    setUsers(users.filter((val) => {
                        return val.id !== user_id
                    }))
                    console.log('Deleted user:', response.data)
                }
            })
    }

    return (
        <div className='admin-container'>
            {!isAdmin ? (
                <div className='login-container'>
                    <p>You are trying to access the admin page.</p>
                    <p>Leave this page if you are not the admin!</p>
                    <label>Enter password:</label>
                    <input type='password' onChange={(event) => {
                        checkPassword(event.currentTarget.value);
                    }}></input>
                </div>
            ) : (
                <div className='admin-options'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Created</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.createdAt.toString().substr(0, 10)}</td>
                                    <td>
                                        <button className='button-primary button-delete' onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

