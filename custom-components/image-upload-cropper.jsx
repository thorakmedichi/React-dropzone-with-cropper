import React from 'react';
import DropzoneImage from './image-dropzone.jsx';
import MyCropper from './image-cropper.jsx';
import request from 'superagent';

/**
 * ImageUploadCropper
 * 
 * Parent wrapper component for image-cropper and image-dropzone components.
 *
 * Displays a dropzone that will only accept a single image file.
 * Upon adding image to dropzone the cropper will be rendered.
 * After the user adjusts the crop bounds the dropzone will preview the cropped file.
 * When the user confirms they want to upload the file:
 *     - The submit button will be hidden
 *     - The cropper will be hidden
 *     - The file will be uploaded to server
 *     - The file upload progress will be shown
 */
class ImageUploadCropper extends React.Component {
    /**
     * React 'componentWillMount'
     * Add props to component
     * Set initial state
     * Bind 'this' to functions
     */
    constructor(props) {
        super(props);
        
        this.state = {
            uploadFile: [],
            originalFile: [],
            cropData: {},
            preview: null,
            displaySubmitButton: false,
            displayCropper: false
        };

        this.postImage = this.postImage.bind(this);
        this.handleDroppedFile = this.handleDroppedFile.bind(this);
        this.handleCroppedImage = this.handleCroppedImage.bind(this);
    }

    /**
     * Post the image to the server and hide specific DOM elements
     */
    postImage(){
        this.setState({
            displaySubmitButton: false,
            displayCropper: false
        });

        // Get the Laravel route
        var url = window.reactSettings.laravelRoutes['location::image.upload'].path;

        // Upload file to server using superagent
        let upload = request.post( url )
                            .set('X-CSRF-TOKEN', document.head.querySelector('meta[name="csrf-token"]').content)
                            .field('cropData', JSON.stringify(this.state.cropData))
                            .attach('image', this.state.uploadFile, this.state.uploadFile.name);

        // Show user the progress of the upload
        upload.on('progress', function(e) {
            var thisComponent = document.getElementsByClassName('image-upload-cropper')[0];
            var progressBar = thisComponent.getElementsByClassName('progress-bar')[0];
            progressBar.setAttribute("style", "width:"+e.percent+"%");
        });

        // Handle the server response after AJAX upload attempt
        upload.end(function(err, res){
            if (err) {
                console.error(err);
            }

            var responseText = JSON.parse(res.text);

            $.niftyNoty({
                type: 'success',
                container : "floating",
                title : 'Success',
                message : responseText.message,
                closeBtn : false,
                timer : 5000
            });  

            this.setState({
                originalFile: []
            });

        }.bind(this));
    }

    /**
     * Set component state when file added to dropzone
     */
    handleDroppedFile(file) {
        this.setState({
            uploadFile: file,
            originalFile: file,
            displayCropper: true
        });
    }

    /**
     * Set component state when user finishes setting crop bounds
     */
    handleCroppedImage(cropData){
        this.setState({
            cropData: cropData.data,
            preview: cropData.preview,
            displaySubmitButton: true
        });
    }

    /**
     * React 'render'
     */
    render() {
        var myCropper   = this.state.displayCropper
                        ? <MyCropper 
                            originalUploadFile={this.state.originalFile} 
                            handleCroppedImage={this.handleCroppedImage} />
                        : '';

        return (
            <div className="image-upload-cropper">
                <div className="progress progress-xs"><div className="progress-bar progress-bar-danger"></div></div>
                <DropzoneImage 
                    handleDroppedFile={this.handleDroppedFile} 
                    displayCroppedPreview={this.state.preview} 
                    displaySubmitButton={this.state.displaySubmitButton}
                    postImage={this.postImage}/>
                
                {myCropper}
            </div>
        );
    }
}

module.exports = ImageUploadCropper;