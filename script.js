'use strict';

let localStream = null;
let peer = null;
let existingCall = null;
let room = null;

navigator.mediaDevices.getUserMedia({video: false, audio: true})
    .then(function (stream) {
    // Success
    //$('#my-video').get(0).srcObject = stream;
    localStream = stream;
    //const call = peer.call('y-pax_proto', localStream);
    //setupCallEventHandlers(call);
    }).catch(function (error) {
    // Error
    console.log(`mediaDevice.getUserMedia() error: ${error.message}`);
    return;
    });

peer = new Peer({
    key: 'ef82b5ff-e40f-4a82-8b04-c0f6e61d902c',
    debug: 3
});

peer.on('open', function(){
    //$('#my-id').text(peer.id);
    room = peer.joinRoom('y-pax_proto', {
        mode: 'mesh',
        stream: localStream,
    });

    $('#my-id').text(room.name);
    console.log(`${room.name}`);

    room.on('stream', function(stream){
        console.log('on stream');
        setupEndCallUI();
    });

    room.on('peerJoin', function(peerId){
        console.log(`on peerJoin: ${peerId}`);
        $('#their-id').text(peerId);
    });
});

peer.on('error', function(err){
    alert(err.message);
    console.log(`${err.type}: ${err.message}`);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
});

//$('#make-call').submit(function(e){
//    e.preventDefault();
//    const call = peer.call('y-pax_proto', localStream);
//    setupCallEventHandlers(call);
//});

//$('#end-call').click(function(){
//    existingCall.close();
//});

peer.on('call', function(call){
    call.answer(localStream);
    setupCallEventHandlers(call);
});

function setupCallEventHandlers(call){
    if (existingCall) {
	existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
	//addVideo(call,stream);
	//setupEndCallUI();
	//$('#their-id').text(call.remoteId);
    });

    call.on('close', function(){
	//removeVideo(call.remoteId);
	//setupMakeCallUI();
    });
}

function addVideo(call,stream){
    //$('#their-video').get(0).srcObject = stream;
}

function removeVideo(peerId){
    //$('#their-video').get(0).srcObject = undefined;
}

function setupMakeCallUI(){
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
}

