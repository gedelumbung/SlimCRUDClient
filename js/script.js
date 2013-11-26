var URL = "http://localhost/belajar-slim/vendor/slim/slim/customer/d2ba5ac651d985a7fad886044d92b5cd";

showAllData();
$('#DeleteBtn').hide();


$('#ListData a').live('click', function() {
	selectData($(this).data('identity'));
});

$('#AddBtn').click(function() {
	newData();
	return false;
});

$('#SaveBtn').click(function() {
	if ($('#id').val() != '')
		updateData();
	else
		addData();
	return false;
});

$('#DeleteBtn').click(function() {
	deleteData();
	return false;
});

function newData() {
	$('#DeleteBtn').hide();
	setDetail({});
}

function showAllData() {
	$.ajax({
		type: 'GET',
		url: URL,
		dataType: "json",
		success: setDataList
	});
}

function selectData(id_customer) {
	$.ajax({
		type: 'GET',
		url: URL + '/' + id_customer,
		dataType: "json",
		success: function(customer){
			$('#DeleteBtn').show();
			console.log('selectData success: ' + customer.id_customer);
			setDetail(customer);
		}
	});
}

function addData() {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: URL,
		dataType: "json",
		data: parseToJson(),
		success: function(data, status, jqXHR){
			$('#DeleteBtn').show();
			$('#id').val(data.id_customer);
			showAllData();
		},
		error: function(jqXHR, status, errorThrown){
			alert('addData error: ' + status);
		}
	});
}

function updateData() {
	console.log('updateData');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: URL + '/' + $('#id').val(),
		dataType: "json",
		data: parseToJson(),
		success: function(data, status, jqXHR){
			showAllData();
		},
		error: function(jqXHR, status, errorThrown){
			alert('updateData error: ' + status);
		}
	});
}

function deleteData() {
	$.ajax({
		type: 'DELETE',
		url: URL + '/' + $('#id').val(),
		success: function(data, status, jqXHR){
			showAllData();
			setDetail({});
			$('#DeleteBtn').hide();
		},
		error: function(jqXHR, status, errorThrown){
			alert('deleteData error');
		}
	});
}

function setDetail(customer) {
	$('#id').val(customer.id_customer);
	$('#nama_customer').val(customer.nama_customer);
	$('#alamat').val(customer.alamat);
	$('#telepon').val(customer.telepon);
	$('#tempat_lahir').val(customer.tempat_lahir);
	$('#tgl_lahir').val(customer.tgl_lahir);
}

function setDataList(data) {
	var datalist = data == null ? [] : (data.customer instanceof Array ? data.customer : [data.customer]);
	$('#ListData li').remove();
	$.each(datalist, function(index, customer) {
		$('#ListData').append('<li><div>'+customer.nama_customer+'</div><div>'+customer.alamat+'</div><div>'+customer.telepon+'</div><div>'+customer.tempat_lahir+'</div><div>'+customer.tgl_lahir+'</div><div><a href="#" data-identity="' + customer.id_customer + '">Edit</a></div></li>');
	});
}

function parseToJson() {
	var data = JSON.stringify({
		"id_customer": $('#id_customer').val(), 
		"nama_customer": $('#nama_customer').val(), 
		"alamat": $('#alamat').val(),
		"telepon": $('#telepon').val(),
		"tempat_lahir": $('#tempat_lahir').val(),
		"tgl_lahir": $('#tgl_lahir').val()
		});
	return data;
}
