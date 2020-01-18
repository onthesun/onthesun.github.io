'use strict';

let localStream = null;
let peer = null;
let existingCall = null;

peer = new Peer({
    key: 'ef82b5ff-e40f-4a82-8b04-c0f6e61d902c',
    debug: 3
});

//const d1 = new Date();
//while (true) {
//  const d2 = new Date();
//  if (d2 - d1 > 2000) {
//    break;
//  }
//}

navigator.mediaDevices.getUserMedia({video: false, audio: {echoCancellation: true}})
    .then(function (stream) {
        // Success
        localStream = stream;
        //const call = peer.joinRoom('y-pax_proto', {mode: 'mesh', stream: localStream});
        const call = peer.joinRoom('y-pax_proto', {mode: 'sfu', stream: localStream});
        setupCallEventHandlers(call);
    }).catch(function (error) {
        // Error
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });

peer.on('open', function(){
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
});

peer.on('call', function(call){
});

function setupCallEventHandlers(call){
    if (existingCall) {
	existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
    });

    call.on('close', function(){
    });
}

