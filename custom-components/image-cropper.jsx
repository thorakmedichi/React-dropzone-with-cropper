import React from 'react';
import Cropper from 'react-cropper';

/**
 * MyCropper
 *
 * Custom wrapper for react-cropper, a cropper.js wrapper.
 * 
 */
class MyCropper extends React.Component {
    /**
     * React 'componentWillMount'
     * Add props to component
     * Set initial state
     * Add event listeners
     * Bind 'this' to functions
     */
    constructor(props) {
        super(props);

        this.state = {
            cropData: {}
        }

        // Listen for when the user is done cropping
        window.addEventListener('cropend', function (e) {
            this.cropUpdate();
            this.props.handleCroppedImage(this.state.cropData); // Update parent component
        }.bind(this));

        this.cropImage = this.cropImage.bind(this);
        this.cropUpdate = this.cropUpdate.bind(this);
    }

    /**
     * React 'componentDidMount'
     * remove the event listener so it doesnt keep adding on top of itself
     */
    componentDidMount(){
        window.removeEventListener('cropend', cropper);
    }

    /**
     * Set the component state based on the current crop selection
     */
    cropUpdate(){
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        this.setState({
            cropData: {
                'preview': this.cropper.getCroppedCanvas().toDataURL(),
                'data': this.cropper.getData(true)
            }
        });
    }

    /**
     * Crop the image when the user presses the crop button
     */
    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        var cropData = {
            'preview': this.cropper.getCroppedCanvas().toDataURL(),
            'data': this.cropper.getData(true)
        }

        this.props.handleCroppedImage(cropData);
    }

    // Opted on auto update of dropzone for now. May be slow and clunky though
    // If I want to force people to click a button first before a preview 
    // simply add this back in just after the <Cropper /> tag
    // {this.showCropButton()} 
    showCropButton() {
        if (typeof this.props.originalUploadFile.preview !== 'undefined') {
            return <button onClick={this.cropImage} className="btn btn-primary btn-labeled fa fa-crop pull-right cropper-submit">Crop Image</button>;
        }
    }

    /**
     * React 'render'
     */
    render() {
        return (
            <div>
                <Cropper
                    ref={cropper => { this.cropper = cropper; }}
                    src={this.props.originalUploadFile.preview}
                    className="cropper-preview"
                    
                    // Cropper.js options
                    aspectRatio={16 / 9}
                    guides={true}
                    dragMode="move"
                    zoomOnWheel={false} />
            </div>
        );
    }
}

module.exports = MyCropper;