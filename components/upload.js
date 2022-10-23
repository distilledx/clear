function filer() {
    let f = document.getElementById('file').files[0];

    const form = new FormData();
    form.append('file', f);

    fetch('https://store8.gofile.io/uploadFile', {
        method: 'POST',
        body: form,
    })
        .then(res => res.json())
        .then(data => console.log(data.data.downloadPage));
}

export default function Upload() {
    return (
        <div>
            <h1>Upload</h1>
            <input type={'file'} name={'file'} id={'file'} />
            <br></br>
            <input type={'submit'} onClick={filer} />
        </div>
    );
}
