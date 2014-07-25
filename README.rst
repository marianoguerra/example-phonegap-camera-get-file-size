phonegap camera file size
=========================

simple example on how to get the file size from a picture selected with the
camera plugin.

phonegap installation is assumed (3.5.0-0.20.7 in my case), tested on a nexus
10 tablet.

create project
--------------

::

    phonegap create camerafilesize

add plugins
-----------

::

    phonegap plugin add org.apache.cordova.file
    phonegap plugin add org.apache.cordova.camera

add code
--------

see commit history for details, the www/js/util.js contains almost all the code

license
-------

MIT
