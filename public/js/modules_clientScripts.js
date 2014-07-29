/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * Mail: freelanceparaguay@hotmail.com
 * Git Hub: https://github.com/freelanceparaguay
 * July 2014
 * 
 * */

var BASE_URL;
if (!window.location.origin)
     window.location.origin = window.location.protocol+"//"+window.location.host;
     
BASE_URL = window.location.origin;


function headerTable(id){

    $("#search-field").val(id);
    alert($("#search-field").val());
        var t_val = $("#search-field").val();
        alert($("#search-field").val());
        CURR_FILT="id";
        window.location.href =BASE_URL+CURR_MODULE+'?f='+CURR_FILT+'&q='+t_val+'&page='+CURR_PAGE;
}

function deleteC(idF){
    $.ajax({    
        url:CURR_MODULE+"/delete",type:"post",dataType:"json",
        data: {id:idF},
        beforeSend:function(){
        
        },
        success:function(result){        
            if(result.status){            
                $('#modal-window').modal('hide')
                window.location.reload(true);
            }
        },
        error:function(xhr,status,err){            
            console.log(err);
        }    
    });        
}

/*Document ready*/
$(function(){
	//select de busqueda
    $("#sort-by").change(function(){    
        var t_val = $(this).val();
        window.location.href = BASE_URL+CURR_MODULE+'?f='+t_val+'&q='+CURR_SEARCH+'&page='+CURR_PAGE;
    });
    
	//boton de busqueda    
    $("#go-search").on("click keyup",function(){             
        var t_val = $("#search-field").val();
        window.location.href =BASE_URL+CURR_MODULE+'?f='+CURR_FILT+'&q='+t_val+'&page='+CURR_PAGE;       
    });
    
    //campo de busqueda
    $("#search-field" ).on("keydown", function(event) {       
        if(event.which == 13){ 
             var t_val = $("#search-field").val();
             event.preventDefault(); //it doesnt work without this line
             window.location.href =BASE_URL+CURR_MODULE+'?f='+CURR_FILT+'&q='+t_val+'&page='+CURR_PAGE;
        }
    });
    
    $("#saveModal").click(function(){
    	//prepara para el envio mediante un objeto JSON
    	
        $.ajax({        
            url:CURR_MODULE+"/save",type:"post",dataType:"json",
            data: $("#modal-form").serialize(),
            beforeSend:function(){            
            },
            success:function(result){            
                if(result.status){                
                    $('#modal-window').modal('hide')
                    window.location.reload(true);
                }
            },
            error:function(xhr,status,err){                
                console.log(err);
            }
        
        });        
    });
    
    //edit user
    //especifica y ligada al fomulario, dado que tiene campos
    $(".editC").click(function(){
    	//take property of .ejs file dataC contain a id an a field
        var data = $(this).attr('dataC').split(',');
        //put info in modal window's fields
        $("#idModal").val(data[0]);
        $('#field1Modal').val(data[1]);
        $('#field2Modal').val(data[2]);
        $("#modal-window").modal('show');
        $('#modal-window').on('hide.bs.modal', function (e) {  
        	//clean fields
             //$(".pass-info").text("");
//             $("#idModal,#field1Modal").val("");
        });        
    });    
});//end of document ready
