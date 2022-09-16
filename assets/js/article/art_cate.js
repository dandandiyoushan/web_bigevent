$(function(){
    var layer = layui.layer;
    var form = layui.form;
    function initArtList() {
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0) return
                var htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null; 
    $('#addBtn').on('click', function(){
        indexAdd = layer.open({
          type: 1,
          title: ['添加文章分类'],
          area: ['500px', '300px'],
          shadeClose: true, //点击遮罩关闭
          content: $('#tpl-form').html()
        });
    });
    
    $('body').on('submit', '#formAdd', function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$('#formAdd').serialize(),
            success:function(res){
                if (res.status!==0) {
                    layer.msg('文章添加失败')
                }
                layer.msg('文章添加成功')
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null;
    $('tbody').on('click', '.form-edit', function(){
        indexEdit = layer.open({
            type: 1,
            title: ['修改文章分类'],
            area: ['500px', '300px'],
            shadeClose: true, //点击遮罩关闭
            content: $('#tpl-formedit').html()
        });
        var id = $(this).attr('data-Id');
        $.ajax({
            method:'get',
            url:'/my/article/cates/' + id,
            success:function(res){
                form.val('formEdit', res.data)
                
            }
        })
    })

    $('body').on('submit', '#formEdit', function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功');
                layer.close(indexEdit);
                initArtList()
            }
        })
    })

    $('tbody').on('click', '.form-del', function(){
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            
            console.log(id);
            $.ajax({
                method:'get',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除数据失败')
                    }
                    layer.msg('删除数据成功')
                    initArtList()
                    layer.close(index);

                }
            })
            
            
          });
    })

    initArtList()
})