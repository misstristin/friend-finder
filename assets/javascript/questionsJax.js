$.ajax({
	url: '/questionsData',
	method: 'GET'
}).then(function(data){

    // adds data to foods/foodsData route
    var p, select, number, option0, option1, option2, option3, option4, option5;
    for (i=0; i<data.length; i++){
        question = data[i].question;
        number = i + 1;
        p = $('<p>');
        
        // make select field
        select = $('<select>');
        select.attr('name', number)

        // make options for each question
        option0 = $('<option>');
        option0.attr('value', 0);
        option0.text('-');

        option1 = $('<option>');
        option1.attr('value', 1);
        option1.text('Strongly Agree');

        option2 = $('<option>');
        option2.attr('value', 2);
        option2.text('Somewhat Agree');

        option3 = $('<option>');
        option3.attr('value', 3);
        option3.text('Neutral');

        option4 = $('<option>');
        option4.attr('value', 4);
        option4.text('Somewhat Disagree');

        option5 = $('<option>');
        option5.attr('value', 5);
        option5.text('Strongly Disagree');
     

        select.append(option0).append(option1).append(option2).append(option3).append(option4).append(option5);

        $('#questionsHere').append(p).append(number + '. ').append(question).append(select);
    }
});