'use strict';

let localStream = null;
let peer = null;
let existingCall = null;

navigator.mediaDevices.getUserMedia({video: false, audio: true})
    .then(function (stream) {
    // Success
    //$('#my-video').get(0).srcObject = stream;
    localStream = stream;
    //const call = peer.call('y-pax_proto', localStream);
    }).catch(function (error) {
    // Error
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
    });

peer = new Peer({
    key: 'ef82b5ff-e40f-4a82-8b04-c0f6e61d902c',
    debug: 3
});

const d1 = new Date();
while (true) {
  const d2 = new Date();
  if (d2 - d1 > 2000) {
    break;
  }
}

peer.on('open', function(){
    const call = peer.joinRoom('y-pax_proto', {mode: 'mesh', stream: localStream});
    setupCallEventHandlers(call);
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
});

peer.on('call', function(call){
    //call.answer(localStream);
    //setupCallEventHandlers(call);
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

