$(function(){
    var layer = layui.layer;
    var form = layui.form;
    var p = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }

    template.defaults.imports.dateForm = function(date){
        var obj = new Date(date);
        var y = obj.getFullYear();
        var m = obj.getMonth() + 1;
        m = m < 10?'0' + m:m;
        var d = obj.getDate();
        h = h < 10?'0' + h:h;
        var h = obj.getHours();
        h = h < 10?'0' + h:h;
        var mm = obj.getMinutes();
        mm = mm < 10?'0' + mm:mm;
        var s = obj.getSeconds();
        s = s < 10?'0' + s:s;

        return y + '-' +  m + '-'+d+' '+h + ":"+mm+':'+s

    }

    function initTable(){
        $.ajax({
            method:'get',
            url:'/my/article/list',
            data:p,
            success:function(res){

                if(res.status!==0) return layer.msg('获取文章列表失败');
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }

        })
    }

    function renderPage(total){
        var laypage = layui.laypage;
        
        //执行一个laypage实例
        laypage.render({
            elem: 'box', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit:p.pagesize,
            curr:p.pagenum,
            limits:[2,3,5,10],
            layout:['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump:function(obj, first){
                p.pagenum=obj.curr;
                p.pagesize=obj.limit;
                if(!first){
                    initTable();
                }
            }
        });
    }

    function initCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0) return layer.msg('获取分类数据失败！')
                var htmlStr = template('tpl-cates', res);
                $('[name=cate_id]').html(htmlStr)
                form.render();
            }
        })
    }

    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        var state = $('[name=state]').val();
        var cate_id = $('[name=cate_id]').val();
        p.state=state;
        p.cate_id=cate_id;

        initTable()
    })

    $('table').on('click', '.deleteBtn', function(){
        var len = $('.deleteBtn').length;
        var id = $(this).attr('data-id');
        layer.confirm('确定删除文章?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/delete' + id,
                function(res){
                    if(res.status!==0){
                        return layer.msg('文章删除失败')
                    }
                    layer.msg('文章删除成功')
                    if(len===1){
                        p.pagenum = p.pagenum===1?1:p.pagenum-1
                    }
                    initTable();
                    
                }

            })
            layer.close(index);
            
        });
    })

    initTable();
    initCate();
    
})