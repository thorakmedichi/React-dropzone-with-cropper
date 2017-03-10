import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

var DropzoneImage = React.createClass({
    getInitialState: function () {
        return {
              files: []
        };
    },

    onDrop: function (files) {
        console.log('Received files: ', files);
        this.setState({
            files: files
        });

        this.handleImageUpload(files);
    },

    handleImageUpload: function (files){
        var url = window.reactSettings.laravelRoutes['location::image.upload'].path;
        let upload = request.post( url )
                            .set('X-CSRF-TOKEN', document.head.querySelector('meta[name="csrf-token"]').content);
        
        console.log (this.state.files);

        files.forEach( (file) => {
            console.log (file);
            upload.attach('image', file, file.name);
            //upload.attach(file.name, file);
        });

        upload.end(function(err, res){
            console.log (res);
            if (err) {
                console.error(err);
            }
        });
    },

    render: function () {
        return (
            <Dropzone
                ref='dropzone'
                className='drop-zone'
                multiple={false}
                accept='image/*'
                onDrop={this.onDrop}>
                {
                    this.state.files.length > 0  

                    ? <div>{this.state.files.map((file) => <img src={file.preview} className="drop-zone-image" /> )}</div>
                    : <p>Drop an image or click to select a file to upload.</p>
                }

            </Dropzone>
      );
    }
});

module.exports = DropzoneImage;