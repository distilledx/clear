import { useState } from 'react';

function fetcher() {
    let contentId = document.getElementById('contentId').value;
    // let token = document.getElementById('token').value;
    token = '7dLAJeTawUbOnVOD0qCUyUYumtqAHCNq';

    fetch(`https://api.gofile.io/getContent?contentId=${contentId}&token=${token}&websiteToken=12345&cache=true`, {
        credentials: 'omit',
        headers: {
            Accept: '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Sec-GPC': '1',
        },
        method: 'GET',
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => setData([block, data.data.childs[0]]));
}

export default function Download() {
    const [data, setData] = useState([None, '']);
    return (
        <div>
            <h1>Download</h1>
            <p>contentId</p>
            <input id={'contentId'} />
            <br></br>
            {/*<p>token</p>
            <input id={'token'} />*/}
            <button onClick={fetcher}>Submit</button>
            <br></br>
            <a href={data[1]}>
                <button style={{ display: data[0] }}>Download</button>
            </a>
        </div>
    );
}
