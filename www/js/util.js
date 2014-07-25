/*globals app, document, window, navigator, LocalFileSystem*/
(function (app, document, window, navigator) {
    'use strict';
    var takePictureBtn = document.getElementById('take-picture'),
        selectPictureBtn = document.getElementById('select-picture'),
        logNode = document.getElementById('log');

    function gotFileEntry(fileEntry) {
        log('Got File Entry');
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        log('File Info: name: ' + file.name + 'size: ' + file.size + ' bytes');
    }

    function failCb(msg) {
        return function (evt) {
            log('Fail', msg); 
            logErrorEvent(evt);
        };
    }

    function logErrorEvent(evt) {
        log('Error: ' + evt.code);
        log('Error: ' + JSON.stringify(evt));
    }

    function fail(evt) {
        log('Fail');
        logErrorEvent(evt);
    }

    function getPicture(sourceType) {

        function onPathResolved(entry) {
            log('Resolved Path', entry.fullPath);
            gotFileEntry(entry);
        }

        function onSuccess(imageURI) {
            log('Got Picture: ' + imageURI);
            window.resolveLocalFileSystemURL(imageURI, onPathResolved,
                                             failCb('Resolving File URI'));
        }

        function onFail(message) {
            log('Error getting picture: ' + message);
        }

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            sourceType: sourceType,
            destinationType: window.Camera.DestinationType.FILE_URI
        });
    }

    function onTakePictureClicked() {
      getPicture(window.Camera.PictureSourceType.CAMERA);
    }

    function onSelectPictureClicked() {
      getPicture(window.Camera.PictureSourceType.PHOTOLIBRARY);
    }

    function log() {
        var txt = [].slice.call(arguments).join(' ') + '\n';
        logNode.innerHTML = logNode.innerHTML + txt;
    }

    log('Setting Up Button');
    takePictureBtn.addEventListener('click', onTakePictureClicked);
    selectPictureBtn.addEventListener('click', onSelectPictureClicked);
    log('Setting Up Device Ready');
    document.addEventListener("deviceready", onDeviceReady, false);

}(app, document, window, navigator));
