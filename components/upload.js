import { useState } from 'react';

const fs = require('fs');

function storer(id) {
    let data = JSON.parse(fs.readFileSync('./server/data.json'));
    let users = JSON.parse(fs.readFileSync('./server/users.json'));

    let userId = window.localStorage.session;

    let user = 'Anon';

    if (userId) {
        if (userId in users) {
            user = users[userId];
            data.user.files.push(id);
            setText('Success!');
            return;
        }
    }

    setId(['block', id]);
}

function filer() {
    let f = document.getElementById('file').files[0];

    const form = new FormData();
    form.append('file', f);

    fetch('https://store8.gofile.io/uploadFile', {
        method: 'POST',
        body: form,
    })
        .then(res => res.json())
        .then(data => storer(data.data.fileId));
}

export default function Upload() {
    const [text, setText] = useState('Upload');
    const [id, setId] = useState(['None', '']);

    return (
        <div>
            <h1>Upload</h1>
            <label>Select a file:</label>
            <input type={'file'} name={'file'} id={'file'} />
            <br></br>
            <button onClick={filer}>{text}</button>
            <br></br>
            <p style={{ display: id[0] }}>{id[1]}</p>
        </div>
    );
}
