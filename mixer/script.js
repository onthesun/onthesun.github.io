'use strict';

let localStream = null;
let peer = null;
let existingCall = null;

//navigator.mediaDevices.getUserMedia({video: false, audio: true, audioReceiveEnabled: true})
//    .then(function (stream) {
//	// Success
//        $('#my-video').get(0).srcObject = stream;
//        localStream = stream;
//    }).catch(function (error) {
//        // Error
//        console.error('mediaDevice.getUserMedia() error:', error);
//        return;
//    });

//peer = new Peer('y-pax_proto', {
peer = new Peer({
    key: 'ef82b5ff-e40f-4a82-8b04-c0f6e61d902c',
    debug: 3
});

peer.on('open', function(){
    $('#my-id').text(peer.id);
    const call = peer.joinRoom('y-pax_proto', {mode: 'mesh'});
    setupCallEventHandlers(call);
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
});

//$('#make-call').submit(function(e){
//    e.preventDefault();
//    const call = peer.call($('#callto-id').val(), localStream);
//    setupCallEventHandlers(call);
//});

//$('#end-call').click(function(){
//    existingCall.close();
//});

//peer.on('call', function(call){
//    call.answer(localStream);
//    setupCallEventHandlers(call);
//});

function setupCallEventHandlers(call){
    if (existingCall) {
	existingCall.close();
    };

    existingCall = call;
    setupEndCallUI();
    //$('#room-id').text(call.name);
    $('#their-id').text(call.name);    

    call.on('stream', function(stream){
	addVideo(stream);
    });

    call.on('peerLeave', function(peerId){
	removeVideo(peerId);
    });

    call.on('close', function(){
	removeAllRemoteVideos();
	setupMakeCallUI();
    });
//    existingCall = call;

//    call.on('stream', function(stream){
//	addVideo(call,stream);
//	setupEndCallUI();
//	//$('#their-id').text(call.remoteId);
//	$('#their-id').text(call.name);
//    });

//    call.on('close', function(){
//	//removeVideo(call.remoteId);
//	removeVideo(call.name);
//	setupMakeCallUI();
//    });
}

function addVideo(stream){
//    $('#their-video').get(0).srcObject = stream;
    const videoDom = $('<video autoplay>');
    videoDom.attr('id',stream.peerId);
    videoDom.get(0).srcObject = stream;
    $('.pure-g').append(videoDom);
}

function removeVideo(peerId){
//    $('#their-video').get(0).srcObject = undefined;

}

function removeAllRemoteVideos(){
    $('.pure-g').empty();
}

function setupMakeCallUI(){
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
}

