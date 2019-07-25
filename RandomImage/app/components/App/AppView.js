import React from 'react';
import Layout from '../Layout';
import Title from '../Title';
import * as SHARED from '../../common/shared.js';

// Cosmetic = disable blue outline on button
document.addEventListener('click', function(e) { 
if( document.activeElement.toString() === '[object HTMLButtonElement]') { document.activeElement.blur(); } 
})

export default () =>
<div className="container">
    <Title />
    <Layout />
</div>;