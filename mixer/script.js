'use strict';

let peer = null;
let existingCall = null;

peer = new Peer({
    key: 'ef82b5ff-e40f-4a82-8b04-c0f6e61d902c',
    debug: 3
});

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
    setupCallEventHandlers(existingCall);
});

function setupCallEventHandlers(call){
    if (existingCall) {
	existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
	addVideo(call,stream);
    });

    call.on('peerLeave', function(peerId){
	removeVideo(peerId);
    });

    call.on('close', function(){
	removeVideo(call.remoteId);
    });
}

function addVideo(call,stream){
    const videoDom = $('<video autoplay>');
    videoDom.attr('id',call.remoteId);
    videoDom.get(0).srcObject = stream;
    $('.y-pax').append(videoDom);
}

function removeVideo(peerId){
    $('#'+peerId).remove();

}

