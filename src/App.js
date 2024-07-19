import React from 'react';
import WebView from './WebView';

function App() {
    const url = 'https://poe.com'; // Thay thế bằng URL trang web của bạn

    return (
        <div className="App" style={{ width: '100vw', height: '100vh' }}>
            <WebView url={url} />
        </div>
    );
}

export default App;
