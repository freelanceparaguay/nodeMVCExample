/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * Mail: freelanceparaguay@hotmail.com
 * Git Hub: https://github.com/freelanceparaguay
 * July 2014
 * 
 * */

/**
 * Contain functions of pagination, used in all modules
 * Original function was created by NodeMonkey
 */

//limit total rows to display in html
//used in paging
exports.LIMIT = 10;
var LIMIT = 10;

/*-------------------------------------------------
Just a simple Pagination here, You can wrote your 
own advanced Pagination
---------------------------------------------------*/
exports.paging=function (total,curr_page,url){
    
    var page = '';
    var total_page = Math.ceil(total/LIMIT);
       
    if(total > LIMIT) {
    
       page = '<ul class="pagination">';
        
       if(parseInt(curr_page) >1)
             page +='<li><a href="'+url+(parseInt(curr_page)-1)+'">Prev</a></li>';
       
       for(x = 1;x <= total_page;x++){
            
            var active = '';
            
            if(x == curr_page)
                active = 'class="active"';
              
            page +='<li '+active+'><a href="'+url+x+'">'+x+'</a></li>';
            
        }
        if(parseInt(curr_page) < total_page)
             page +='<li><a href="'+url+(parseInt(curr_page)+1)+'">Next</a></li>';
        
        page +='</ul>';
        
        var x_showed = LIMIT;
        if(total <  LIMIT)
            x_showed = total
       
        page += '<div class="pull-right" style="margin-top:2px">'
                        +'<h5>'
                        +' <small>Displaying '+x_showed+' of Total '+total+' Item(s)</small>' 
                        +'</h5>'
                     +'</div>';
        }
        
    return page;
}