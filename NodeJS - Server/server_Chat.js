var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 12345;

var TextAndColor = '';
var Count = 0;
MakeGame();

io.on('connection', function (socket) {
    console.log('user connected'); 
	  
	 io.sockets.emit('toClient message', TextAndColor);
	 	 
	
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    
    socket.on('toServer message', function (msg) {
		
		if (msg == 'MakeNewGame')
		{
			MakeGame();
			io.sockets.emit('toClient message', TextAndColor);
		}
		
		
		if (msg.length != 11){
			var msg1 = 5;	
			var index = parseInt(msg.split('/')[0].split('*')[0]);
			var indexE = parseInt(msg.split('/')[0].split('*')[1]);
			
			var buttonC = msg.split('/')[1].split('*')[0];
			var formC =  msg.split('/')[1].split('*')[1];
			
			  if (Math.abs((index - indexE) % 4) + Math.abs(((index - index % 4) - (indexE - indexE % 4)) / 4) == 1)
				  msg1 = 'rgb(' +  parseInt((parseInt(buttonC.slice(4,7)) + parseInt(formC.slice(4,7)))/ 2) + ',' + parseInt((parseInt(buttonC.slice(9,12)) + parseInt(formC.slice(9,12)))/ 2) + 
						','  + parseInt((parseInt(buttonC.slice(13,17)) + parseInt(formC.slice(13,17)))/ 2) + ')';
			
			console.log('message: ' + msg );
			io.sockets.emit('toClient message',msg1 + '*' + index + '*' + indexE);
			}
    });
});

	function getRandomColor() {
        var letters = '89ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 7)];
        }
        return color;
    }


http.listen(port);
console.log('Server running on port ' + port);

	function MakeGame(){
			var arr = new Array();
			for (var i = 1 ; i <= 16 ; i++)
				arr[i-1] = i;
			
			  var index1, index2,tmp;

				for (var i = 0; i < 50; i++)
				{
					index1 = Math.floor(Math.random()*15);
					index2 = Math.floor(Math.random()*15);
					tmp = arr[index1];
					arr[index1] = arr[index2];
					arr[index2] = tmp;
				}

				if (arr[0] == 1) 
				{
					index1 = Math.floor(Math.random()*14 + 3);
					arr[0] = arr[index1];
					arr[index1] = 1;

				}
				if (arr[14] == 15)
				{
					index1 = Math.floor(Math.random()*14 + 5);
					arr[14] = arr[index1];
					arr[index1] = 15;
				}
				
				for (var i = 0 ; i < 15 ; i++) 
					TextAndColor += arr[i] + '*';
				
				TextAndColor += '/';
				
				for (var i = 0 ; i < 15 ; i++) 
					TextAndColor += getRandomColor() + '*';
	}
			
			
			
