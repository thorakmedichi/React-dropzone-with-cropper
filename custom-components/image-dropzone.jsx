import React from 'react';
import Dropzone from 'react-dropzone';

/**
 * DropzoneImage
 *
 * Custom wrapper for react-dropzone.
 * This will provide a dropzone for a single file.
 * The file must be an image.
 * The preview image will be defined by the parent component.
 * The preview image may not be the same as the original image.
 * 
 */
class DropzoneImage extends React.Component {
    // componentWillMount ES6 style 
    constructor(props) {
        super(props);

        // Bind 'this' to all our functions
        this.onDrop = this.onDrop.bind(this);
        this.postImage = this.postImage.bind(this);
        this.showPreviewImage = this.showPreviewImage.bind(this);
        this.showSubmitButton = this.showSubmitButton.bind(this);
    }

    /**
     * Triggered when a user adds a file to the dropzone
     */
    onDrop (file) {
        this.props.handleDroppedFile(file[0]); // Call parent function
    }

    /**
     * Displays the the cropped image preview OR text asking for file to upload
     * This will only display after the cropper has been applied to the image
     */
    showPreviewImage(){
        if (!this.props.displayCroppedPreview) {
            return <p>Drop an image or click to select a file to upload.</p>;
        }

        return <img src={this.props.displayCroppedPreview} className="drop-zone-image" />;
    }

    /**
     * Post the image to the server
     */
    postImage(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.postImage(); // Call parent function
    }

    /**
     * Display a submit button
     * Only display when the file is ready to be uploaded
     */
    showSubmitButton() {
        if (this.props.displaySubmitButton) {
            return <button onClick={this.postImage} className="btn btn-primary btn-labeled fa fa-upload pull-right dropzone-submit">Upload Image</button>;
        }
    }

    /**
     * React 'render'
     */
    render() {
        return (
            <Dropzone
                ref={dropzone => { this.dropzone = dropzone; }}
                className='drop-zone'
                multiple={false}
                accept='image/*'
                onDrop={this.onDrop}>
                
                    {this.showPreviewImage()}
                    {this.showSubmitButton()}
            </Dropzone>
      );
    }
}

module.exports = DropzoneImage;