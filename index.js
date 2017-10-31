'use strict';

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.load();
var fs = require('fs');
var array = require('lodash/array');
var winston=require("winston");
const warnlog = winston.createLogger({
  format: winston.format.json(),
	level:'warn',
  transports: [
    new winston.transports.File({ filename: 'mail_warn.json', level: 'warn' })
  ]
});
    let transporter = nodemailer.createTransport({
        host: process.env.mail_host,
        port: process.env.mail_port,
        secure: process.env.mail_security,
        auth: {
            user:process.env.mail_user, 
            pass: process.env.mail_pass
        }
    });


	let send_mail=((mailOptions, loggers)=>{
		var response;
	for(var i=0; i<mailOptions.length; i++){
		if(mailOptions[i].from==undefined || mailOptions[i].from==''){
			mailOptions[i].sender=process.env.mail_user;
		}
			var x=0;
		transporter.sendMail(mailOptions[i], (error, info) => {
        if (error) {
if (error.code=='ECONNECTION'){
				warnlog.log('warn',mailOptions[x]);
				} else {
                response={status:403,
				body:{
                    'success':false,
                    'error':{
                                'code':'403',
                                'message':error
                    }
                }
				};
				loggers[0].log('error', response);
				}
			} else{
		response={status:200,
				body:{
                        'success':true,
                        'result':'Message sent: %s'+ info.messageId
		}
		};
		loggers[1].log('info',response);
		}
		x++;
		});
		}


});

let send_old_mail=(loggers)=>{
	var mailOptions=[];
	var uniqueObjects=[];
	fs.renameSync('mail_warn.json','mail_warn.log');
var document=fs.readFileSync('mail_warn.log', 'utf-8', (err, data) => {
  if (err) throw err;
return data;
});
if(document.length>0){
//	document=document.replace('{\"level\":\"warn\",\"message\":','');
//document=document.replace("}}","}");
	var rows=document.split('\r\n');
//	console.log(rows);
	for (var r in rows){
	var obj=rows[r].replace("}}","}");
	obj=obj.replace('{\"level\":\"warn\",\"message\":','');
	if(obj.length>1){
//	console.log(obj);
		if(uniqueObjects.indexOf(obj)==-1){
	uniqueObjects.push(obj);
	obj=JSON.parse(obj);
	mailOptions.push(obj);
}
	}
	}
  setTimeout(function () {
		  console.log(mailOptions);
	var msg=send_mail(mailOptions, loggers);
  }, 2000);
	}
};

module.exports = {
send_mail:send_mail,
send_old_mail:send_old_mail
};
