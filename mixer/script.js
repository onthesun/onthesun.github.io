'use strict';

let peer = null;
let existingCall = null;

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
    const call = peer.joinRoom('y-pax_proto', {mode: 'mesh', audioReceiveEnabled: true});
    setupCallEventHandlers(call);
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
});

$('#reload').click(function(){
    const call = peer.joinRoom('y-pax_proto', {mode: 'mesh', audioReceiveEnabled: true});
    setupCallEventHandlers(call);
});

function setupCallEventHandlers(call){
    if (existingCall) {
	existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
	addAudio(call,stream);
    });

    call.on('peerLeave', function(peerId){
	removeAudio(peerId);
    });

    call.on('close', function(){
	removeAudio(call.remoteId);
    });
}

function addAudio(call,stream){
    const audioDom = $('<audio autoplay>');
    audioDom.attr('id',call.remoteId);
    audioDom.get(0).srcObject = stream;
    $('.y-pax').append(audioDom);
}

function removeAudio(peerId){
    $('#'+peerId).remove();

}

