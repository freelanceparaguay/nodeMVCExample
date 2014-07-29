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

//get by parameters info from server
function detailsGetServer(id){
        window.location.href = BASE_URL+CURR_MODULE+'?f=id&q='+id+'&page='+CURR_PAGE;
}

//draw in a iframe info from server
function detailsGET(id){
        $("#detailsMarco").attr("src", BASE_URL+"/apis/detail?idQuery="+id);
}

//make something with JSON info
// url:"http://127.0.0.1:3720/groupsmodules/detailsJSON",type:"get",dataType:"json",
function detailsJSON(idF){
    console.log(BASE_URL);
    $.ajax({    
        url:BASE_URL+"/apis/detailJSON?",type:"get",dataType:"json",
        data: {idQuery:idF},
        beforeSend:function(){
        
        },
        success:function(dataRec){        
                alert("Make something with this object"+JSON.stringify(dataRec));            
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
        
});//end of document ready
