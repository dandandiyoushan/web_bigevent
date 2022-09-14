$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function(value){
            if(value.length > 6){
              return '昵称长度必须在1~6个字符之间！';
            }
        }
    })
    initUser();  

    function initUser(){
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('用户信息获取失败！')
                }
                form.val('formUserInfo', res.data) 
            }
        })
    }

    $('#resetBtn').on('click',function(e){
        e.preventDefault();
        initUser();
    })

    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    layer.msg('信息上传失败！')
                }
                initUser();
                window.parent.getUserMsg();
            }
        })
    })
})

