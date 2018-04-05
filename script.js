$(document).ready(function(){

	var iduser=null;
	function getUsers(){
		$.get('/allusers', function(data){
			console.log(data);
			createTable(data,'#mastable');
		});
	}
	getUsers();

	function createTable(mas, container){
		$(container).empty();

		$("<table>").addClass("table").appendTo(container);

		$('<td>').addClass("tr1").appendTo('.table').text("name");
		$('<td>').addClass("tr1").appendTo('.table').text("age");
		$('<td>').addClass("tr1").appendTo('.table').text("salary");

		$('.tr1').click(function(){
			var prop=$(this).text();
			sortprop(mas, prop);
			createTable(mas, '#mastable');
		}) 


		for (var i = 0; i < mas.length; i++) {
			$("<tr>").addClass('tr').appendTo(".table");
			for(var key in mas[i]) {
				$("<td>").appendTo('.tr:last').text(mas[i][key]);
				}
			for (var j = 1; j <= 2; j++) {
				$('<td>').appendTo('.tr:last');
				var btn = $("<button>");
				if (j == 1) {
					btn.text('Delete').addClass('delete');				
				}
				else
				btn.text('Update').addClass('update');
				$('.table .tr td:last').append(btn);
			}
		$('.tr').children().filter(':first-child').hide();
				
		}

		$('.delete').click(function(){
			console.log(this);
		var id = $(this).parent().parent().children().filter(':first').text();
		console.log(id);
		var obj={id:id};
		$.post('/delete', obj, function(data){
			console.log(data);
			getUsers();
		})
		})

		$('.update').click(function(){
			console.log(this);
		var tds = $(this).parent().parent().children();
			console.log(tds);
		var name = $(tds[1]).text();
		console.log(name);
		$('#name').val(name);
		$('#btn').val('Update user');

		iduser = $(tds[0]).text();
		console.log(iduser)
		})


		$('.update').click(function(){
			console.log(this);
		var tds1 = $(this).parent().parent().children();
			console.log(tds1);
		var age = $(tds1[2]).text();
		console.log(age);
		$('#age').val(age);
		})

		$('.update').click(function(){
			console.log(this);
		var tds2 = $(this).parent().parent().children();
			console.log(tds2);
		var salary = $(tds2[3]).text();
		console.log(salary);
		$('#salary').val(salary);
		})

	}

	$('#btn').click(function(){

	var obj={
		name:$('#name').val(),
		age:$('#age').val(),
		salary:$('#salary').val()
	}
	if ($(this).val == 'Update user');
	obj.id = iduser;
	$.post('/send',obj, function(data){
		console.log(data);
		getUsers();
	})
	$(this).val('Send');
	})

	function sortprop(mas, prop){
		mas.sort(function(a,b){
			if (a[prop]> b[prop]) 
				return 1;
				return -1;
		})
	}
	

})