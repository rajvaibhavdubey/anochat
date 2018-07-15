$(document).ready(function(){
    var socket = io();
    
    var room = $('#groupName').val();
    var sender = $('#sender').val();
    
    var userPic = $('#name-image').val();
    
    socket.on('connect', function(){
        
        var params = {
            room: room,
            name: sender
        }
        socket.emit('join', params, function(){
            console.log(params);
        });
    });
    
    socket.on('usersList', function(users){
        var ol = $('<ol></ol>');
        
        for(var i = 0; i < users.length; i++){
            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+users[i]+'<span class="fa fa-circle online_friend"></span></a></p>');
        }
        
        $(document).on('click', '#val', function(){
            $('#name').text('@'+$(this).text());
            $('#receiverName').val($(this).text());
            $('#nameLink').attr("href", "/profile/"+$(this).text());
        });
        
        $('#numValue').text('('+users.length+')');
        $('#users').html(ol);
    });
    
    socket.on('newMessage', function(data){
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.from,
            userImage: data.image
        });
        
        $('#messages').append(message);
    });
    
    
    
    $('#message-form').on('submit', function(e){
        e.preventDefault();
        
        var msg = $('#msg').val();
        console.log(msg);
        if(msg.trim().length>0){
        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender,
            userPic: userPic
        }, function(){
            $('#msg').val('');
        });
    }
    });

    $('#message-form').keydown(function() {
        var key = e.which;
        if (key == 13) {
        // As ASCII code for ENTER key is "13"
        $('#message-form').submit(); // Submit form code
        }
        });

});