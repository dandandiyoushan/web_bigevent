$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd:[/^[\S]{6,12}$/, '输入的密码必须在6~12位之间'],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
        },
        dePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次输入的密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})