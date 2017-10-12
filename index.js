'use strict';

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.load();
var fs = require('fs');
    
    let transporter = nodemailer.createTransport({
        host: process.env.mail_host,
        port: process.env.mail_port,
        secure: process.env.mail_security,
        auth: {
            user:process.env.mail_user, 
            pass: process.env.mail_pass
        }
    });


	let send_mail=((mailOptions)=>{
		var id=Date.now();
		var accepted=[];
		var rejected=[];
	for(var i=0; i<mailOptions.length; i++){
		if(mailOptions[i].from==undefined || mailOptions[i].from==''){
			mailOptions[i].sender=process.env.mail_user;
		}
		var x=0;
		transporter.sendMail(mailOptions[i], (error, info) => {
        if (error) {
			console.error(error);
                mailOptions[x].response={
					'message':error
				};
				rejected.push(mailOptions[x]);
        } else{
//        console.log('Message sent: %s', info.messageId);
console.log(info);
		mailOptions[x].response={
			'message':'Message sent: %s'+ info.messageId
		};
				accepted.push(mailOptions[x]);
		}
		x++;
		});
		}
 		  setTimeout(function () {
fs.appendFile("./log_"+id+".json", '{rejected:'+JSON.stringify(rejected)+'},\n{accepted:'+JSON.stringify(accepted)+'}', function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
  }, 10000);

});

module.exports = {
send_mail:send_mail
};
