$.ajax({
	url: '/users',
	method: 'GET'
}).then(function(data){

    // var p, id, answers;
    for (i=0; i<data.length; i++){
        user = data[i].user;
        id = i + 1;
        answers = data[i].answers;
        p = $('<p>');
        
    }
});