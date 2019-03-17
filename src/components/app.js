import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './appwrapper.jsx'

document.addEventListener('DOMContentLoaded', function () {
    
    ReactDOM.render(
        <div><AppWrapper/></div>,
        document.getElementById('app')
    );
});