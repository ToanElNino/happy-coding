import React from 'react';

const WebView = ({ url }) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
                src={url}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="WebView"
            ></iframe>
        </div>
    );
};

export default WebView;
