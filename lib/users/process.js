/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * Mail: freelanceparaguay@hotmail.com
 * Git Hub: https://github.com/freelanceparaguay
 * July 2014
 * 
 * */

exports.getUser = function(req,params, fn){      
    req.getConnection(function(err,connection){        
        var if_search = '';
        if(params.qsearch !='' && params.filter_by !='')
            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
        if(params.qsearch !='' && params.filter_by=='')
            if_search +=" AND username LIKE '%"+params.qsearch+"%' ";
       
        var query = connection.query('SELECT * FROM users WHERE 1=1 '+if_search+' LIMIT ?,?',[params.offset,params.limit],function(err,rows)
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
   
}; //exports.getUser


function countAllUser(req,params,fn){

    req.getConnection(function(err,connection){
        
        var if_search = '';
        if(params.qsearch !='' && params.filter_by !='')
            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
        if(params.qsearch !='' && params.filter_by=='')
            if_search +=" AND username LIKE '%"+params.qsearch+"%' ";
        
        var query = connection.query('SELECT COUNT(id) as all_user FROM users WHERE 1=1 '+if_search+' ',function(err,rows)
        {
        
            if(err)
                return fn(err);
            
            return fn(rows[0].all_user);
        });
    
    });
}

/*------------------------------------------
Adding users
Need to include hash
-------------------------------------------*/
exports.save = function (req,hash,fn) {

    var temp = JSON.parse(JSON.stringify(req.body));
   
   
     //set password = temp.username
    hash(temp.password, function(err, salt_it, hash_it){
    
        if (err) throw err;
             
         req.getConnection(function (err, connection) {
            
            
            if(temp.user_id==''){
            
                var insert = {
                                username:temp.username,
                                password_salt:salt_it,
                                password_hash:hash_it,
                                status:temp.status
                             };
                connection.query("INSERT INTO users set ? ",insert, function(err, rows)
                {
          
                  if (err)
                    return fn(false,err); 
                 
                  return fn(true," New user created");
                  
                });
            
            }else{
                
                var update;
                if(temp.password!=''){ //if password is filled
                    
                     update = {
                                username:temp.username,
                                password_salt:salt_it,
                                password_hash:hash_it,
                                status:temp.status
                             };
                    
                }else{
                    
                    update = {
                                username:temp.username,
                                status:temp.status
                             };
                }
                connection.query("UPDATE users set ? WHERE id = ? ",[update,temp.user_id], function(err, rows)
                {
          
                  if (err)
                    return fn(false,err); 
                
                  return fn(true," user Updated");
                  
                });
              
            }
        });

    }); //end of hash
        
};

exports.delete_user1 = function(req,fn){
     
     var temp = JSON.parse(JSON.stringify(req.body));
     
     req.getConnection(function (err, connection) {        
        connection.query("DELETE FROM users  WHERE id = ? ",[temp.user_id], function(err, rows)
        {            
             if(err)
                 return fn(false,err); 
            
             return fn(true," user deleted");             
        });        
     });
};

