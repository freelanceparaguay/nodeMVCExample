/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * freelanceparaguay@hotmail.com
 * July 2014
 * */

This is an app based in a tutorial located at:http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside
Characteristics of the application.
I have added some features, but still have not been completed.
My english is not good. :)

This app, has:
*Users administration.
*Modules administration.
*Groups administration.
*Users permissions for access to modules with urls.
*An litle example about Test APIS with GET methods.


Others characteristics to do are:
Change user password with emails accounts.
Enable and disable user accounts.
Strength of passwords.

Users and passwords
===================
admin : admin
user: user



Original text by nodemonkey -> http://teknosains.com/t/nodejs
==============================================================

nodemonkey
==========

Modular Nodejs Sample App with Bootstrap
This example is built in Express Framework. Use it with free :)

Dependencies
1. Mysql
2. Crypto
3. Ejs
4. Bootstrap 3 ( gebootstrap.com and sb-admin from startbootstrap.com) #Google it
5. express-myconnection


Run it
=======================
1. create mysql database : nodejs 
2. create a table : t_user ( id,username,password_hash, password_salt ). or Just Import the SQL file in the source code
3. seed the database with http://localhost:3720/seeding  , it will create username & password : admin( change it youself in lib/login/proccess.js
4. Run it on your localhost :  http://localhost:3720/  ( the port set is 3720 )


5. what it looks like (the apps) ?  check here : http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside

Where to create your module ?
==============================

Goto folder lib and Copy-Paste example given ( users, dashboard n Login)


NOTES
======================
This is still under development, some links on Apps are not yet routed.
But im still doing it, yet depends on my spare time :D


Create an issue for asking or reporting 

Tutorial about this located at : http://teknosains.com/t/nodejs

