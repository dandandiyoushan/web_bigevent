$(function(){
    // 去注册按钮
    $("#linkReg").on('click', function(){
        $(".login_box").hide();
        $(".reg_box").show();
    })

    // 去登录按钮
    $("#linkLogin").on('click', function(){
        $(".login_box").show();
        $(".reg_box").hide();
    })
   
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            const pwd = $(".reg_box [name=password]").val();
            if(value!==pwd) return '两次输入的密码不一致'
        }
    })

    // 提交注册表单
    $('#form_reg').on('submit', function(e){
        e.preventDefault();
        $.post('/api/reguser', {
            username:$('.reg_box [name=user]').val(),
            password:$('.reg_box [name=password]').val()
        },function(res){
            if(res.status!==0){layer.msg(res.message, {time:2000});
                return
            };
            layer.msg(res.message, {time:2000});
            $('#linkLogin').click();
        })
    })

    // 登录区块
    $("#form_login").submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/login',
            data: {
                username:$('.login_box [name=user]').val(),
                password:$('.login_box [name=password]').val()
            },
            success:function(res){
                console.log(res);
                if(res.status!==0)return layer.msg('登录失败',{time:2000})
                layer.msg('登录成功',{time:2000})
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})