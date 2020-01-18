'use strict';

let localStream = null;
let peer = null;
let existingCall = null;

peer = new Peer({
    key: 'ef82b5ff-e40f-4a82-8b04-c0f6e61d902c',
    debug: 3
});

peer.on('open', function(){
    $('#my-id').text(peer.id);
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

function setupCallEventHandlers(call){
    if (existingCall) {
	existingCall.close();
    };

    existingCall = call;

    $('#their-id').text(call.name);    

    call.on('stream', function(stream){
	addVideo(call,stream);
	setupEndCallUI();
    });

    call.on('peerLeave', function(peerId){
	removeVideo(peerId);
    });

    call.on('close', function(){
	removeVideo(call.remoteId);
	setupMakeCallUI();
    });
}

function addVideo(call,stream){
    const videoDom = $('<video autoplay>');
    videoDom.attr('id',call.remoteId);
    videoDom.get(0).srcObject = stream;
    $('.pure-g').append(videoDom);
}

function removeVideo(peerId){
    $('#'+peerId).remove();

}

//function removeAllRemoteVideos(){
//    $('.pure-g').empty();
//}

function setupMakeCallUI(){
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
}

