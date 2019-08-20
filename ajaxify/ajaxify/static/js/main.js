$('#myTable').hide();
$('.form').submit(function(event){
    event.preventDefault();
    $.ajax({
        url: 'save/',
        method: "POST",
        data : {
            title: $('#title').val(),
            description: $('#desc').val()
        },
        success:function(post){
            $('#title').val('');
            $('#desc').val('');
            alert(post.result)
            var rows='';
            rows += 
            '<tr>'+
                '<td>'+post.postpk+'</td>'+
                '<td id="tdT'+post.postpk+'"><input type="text" class="form-control" style="border:none" id="tit'+post.postpk+'" value="'+post.title+'"></td>'+
                '<td id="tdD'+post.postpk+'"><input type="text" class="form-control" style="border:none" id="des'+post.postpk+'" value="'+post.desc+'"></td>'+
                '<td><button class="btn btn-outline-danger deleteBtn" onclick="deletePost(this)" data-id='+post.postpk+'>Delete</button></td>'+
                '<td id="tdB'+post.postpk+'"><button class="btn btn-outline-warning" id="editBtn'+post.postpk+'" onclick="editPost(this)" data-id='+post.postpk+'>Update</button></td>'+
            '</tr>';
            $('#myTable').show();
            $('#myTBody').append(rows);

        }
    })
});

function list(){
    $.ajax({
        url: 'listv/',
        method: "GET",
        datatype: 'json',
        success:function(data){
            let rows =  '';
            data.posts.forEach(post => {
            rows += 
            '<tr>'+
                '<td>'+post.id+'</td>'+
                '<td id="tdT'+post.id+'"><input type="text" class="form-control" style="border:none" id="tit'+post.id+'" value="'+post.title+'"></td>'+
                '<td id="tdD'+post.id+'"><input type="text" class="form-control" style="border:none" id="des'+post.id+'" value="'+post.description+'"></td>'+
                '<td><button class="btn btn-outline-danger deleteBtn" onclick="deletePost(this)" data-id='+post.id+'>Delete</button></td>'+
                '<td id="tdB'+post.id+'"><button class="btn btn-outline-warning" id="editBtn'+post.id+'" onclick="editPost(this)" data-id='+post.id+'>Update</button></td>'+
            '</tr>';
            });
            $('#myTable').show();
            $('#myTBody').empty();
            $('#myTBody').append(rows);
        }
    })
}
function  deletePost(el){
    var Id = el.dataset.id
    $.ajax({
        url: 'delete/'+Id+'/',
        method: "POST",
        success:  function (data) {
            alert(data);
            el.closest('tr').remove()
        }
    });
}
function editPost(e){
    var Id = e.dataset.id
    $.ajax({
        url: 'update/'+Id+'/',
        method: "POST",
        data:{
            title: $('#tit'+Id).val(),
            desc: $('#des'+Id).val()
        },
        success:  function (data) {
            alert(data);
        list();
        }      
    });
}

