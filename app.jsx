// Load JS and JSX files needed to compile react classes
import React from 'react';
import ReactDOM from 'react-dom';

import ImageUploadCropper from './custom-components/image-upload-cropper.jsx';
import EditableInput from './custom-components/editable-input.jsx';

// RENDER functions only on specific pages
if ( document.getElementById('page-location') ) {
    ReactDOM.render(<EditableInput />, document.getElementById('title'));
    ReactDOM.render(<ImageUploadCropper />, document.getElementById('dropZone'));
}

// import DropzoneImage from './dropzone-example.jsx';
// ReactDOM.render(<DropzoneImage />, document.getElementById('dropZone'));