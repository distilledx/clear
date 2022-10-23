import { useState, useEffect } from 'react';

export default function Login() {
    const [err, setErr] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const username = data.get('username');
        const password = data.get('password');
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then(res => {
            console.log(res.json());
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type={'name'} name={'username'} id={'name'} />
                </div>
                <div>
                    <label htmlFor={'password'}>Password</label>
                    <input type={'password'} name={'password'} id={'password'} />
                </div>
                <button type={'submit'}>Submit</button>
            </form>
            <a href={'/register'}>Register</a>
        </div>
    );
}
