/*globals app, document, window, navigator, LocalFileSystem*/
(function (app, document, window, navigator) {
    'use strict';
    var takePictureBtn = document.getElementById('take-picture'),
        logNode = document.getElementById('log'),
        rootfs;

    function onDeviceReady() {
        log('Requesting File System');
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        log('Got File System');
        rootfs = fileSystem;
    }

    function gotFileEntry(fileEntry) {
        log('Got File Entry');
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        log('File Info: name: ' + file.name + 'size: ' + file.size + ' bytes');
    }

    function fail(evt) {
        log('Fail');
        log('Error: ' + evt.code);
        log('Error: ' + JSON.stringify(evt));
    }

    function getPicture(sourceType) {
      function onSuccess(imageURI) {
          var path = imageURI.slice(7);
          log('Got Picture: ' + path);
          rootfs.root.getFile(path, null, gotFileEntry, fail);
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

    function log() {
        var txt = [].slice.call(arguments).join(' ') + '\n';
        logNode.innerHTML = logNode.innerHTML + txt;
    }

    log('Setting Up Button');
    takePictureBtn.addEventListener('click', onTakePictureClicked);
    log('Setting Up Device Ready');
    document.addEventListener("deviceready", onDeviceReady, false);

}(app, document, window, navigator));
