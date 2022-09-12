$(function(){
    getUserMsg()

    $('#logOut').on('click', function(){
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

function getUserMsg() {
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status === 0){
                renderUser(res.data);
            }
        },
        
    })
}

function renderUser(data){
    var name = data.nickname || data.username;
    $('#welUser').html('欢迎&nbsp;&nbsp;' + name);
    if(data.user_pic){
        $(".layui-nav-img").attr('src', data.user_pic).show();
        $('.userpic').hide();
    }else{
        $(".layui-nav-img").hide();
        $('.userpic').html(name[0]).show();
    }
}