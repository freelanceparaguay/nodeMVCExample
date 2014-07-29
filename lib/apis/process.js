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


