import { useState } from 'react';

export default function Upload() {
    const [text, setText] = useState('Upload');
    const [disId, setId] = useState(['None', '']);

    function storer(fileId) {
        let session = window.localStorage.session;

        fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session,
                fileId,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.body == 'Verified') {
                    setText('Success!');
                } else if (data.body == 'Unverified') {
                    setText('Success! Please copy the ID');
                }
            });

        setId(['block', fileId]);
        console.log(disId);
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

    return (
        <div>
            <h1>{text}</h1>
            <label>Select a file:</label>
            <input type={'file'} name={'file'} id={'file'} />
            <br></br>
            <button onClick={filer}>Submit</button>
            <br></br>
            <p style={{ display: disId[0] }}>{disId[1]}</p>
        </div>
    );
}
