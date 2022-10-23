import { useState, useEffect } from 'react';

export default function _Home() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetch('/api/names')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUsername(data['testing']);
            });
    }, []);
    return (
        <div>
            <h1>Hi {username}</h1>
        </div>
    );
}
