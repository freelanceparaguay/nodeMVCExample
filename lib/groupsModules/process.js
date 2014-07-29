/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * Mail: freelanceparaguay@hotmail.com
 * Git Hub: https://github.com/freelanceparaguay
 * July 2014
 * 
 * */

var MODULE_TABLE='groups';

//firt function
exports.getRowServerHeader = function(req,params, fn){
       
    req.getConnection(function(err,connection){
        
        var if_search = '';
        if(params.qsearch !='' && params.filter_by !='')
            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
        if(params.qsearch !='' && params.filter_by=='')
            if_search +=" AND groupName LIKE '%"+params.qsearch+"%' ";
       
        var query = connection.query('SELECT * FROM '+MODULE_TABLE+' WHERE 1=1 '+if_search+' LIMIT ?,?',[params.offset,params.limit],function(err,rows)
        {            
            if(err)
                return fn(false,err);
     
            countAllUser(req,params,function(total){                
                console.log("Total data : %d",total);
                return fn(true,rows,total);
            });                           
         });         
         console.log(query.sql);
    });  
};


exports.getRowServerDetail = function(req,groupId, fn){
// select * from group_has_module as gm,modules m where gm.module_id=m.id and gm.group_id=2;
	
    req.getConnection(function(err,connection){
               
        var query = connection.query('SELECT * FROM group_has_module as gm,modules m WHERE gm.module_id=m.id and gm.group_id=?',[groupId],function(err,rows)
        {            
            if(err)
                return fn(false,err);
            console.log(rows);
            return fn(true,rows);
                           
         });         
         console.log(query.sql);
    });
   
};

function countAllUser(req,params,fn){
	
    req.getConnection(function(err,connection){        
        var if_search = '';
        if(params.qsearch !='' && params.filter_by !='')
            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
        if(params.qsearch !='' && params.filter_by=='')
            if_search +=" AND groupName LIKE '%"+params.qsearch+"%' ";
        
        var query = connection.query('SELECT COUNT(id) as all_total FROM '+MODULE_TABLE+' WHERE 1=1 '+if_search+' ',function(err,rows)
        {        
            if(err){
            	return fn(err);
            }
            return fn(rows[0].all_total);
        });//query    
    });//getConnection
}//countAllUser


exports.saveRowServer = function (req,fn) {
	console.log("saveeee ---->>>");
    var temp = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
//validar
    	if(temp.idModal!=''){
    		var insert = {
    				group_id: temp.idModal,
    				module_id :temp.field1Modal
    				};
    		connection.query("INSERT INTO group_has_module set ? ",insert, function(err, rows){
    			if (err){
    				return fn(false,err);
    			}
    			return fn(true," group_has_module created");                  
            });//connection.query
            
            }else{                                                         

            }//if(temp.idModal==''){
        });//getConnection()        
};//exports.save

exports.deleteRowServer = function(req,fn){     
     var temp = JSON.parse(JSON.stringify(req.body));

     req.getConnection(function (err, connection) {        
        connection.query("DELETE FROM group_has_module WHERE group_id = ? and module_id = ? ",[temp.group_id,temp.module_id], function(err, rows)
//                connection.query("DELETE FROM group_has_module WHERE group_id = ? and module_id = ? ",[temp.group_id],[temp.module_id], function(err, rows)
        {            
             if(err)
                 return fn(false,err); 
            
             return fn(true," group_has_module deleted");             
        });        
     });

};





10