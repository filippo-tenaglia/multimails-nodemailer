This is a simple module to send many e-mails using nodemailer and retrieve the action when there is a connection error using winston module.

# Send many mails with nodemailer

The purpose of this module is manage a JSON object to send many mails using nodemailer.
The connection informations are retrieved by dotenv module from .env file.
Another thing is that if the parameters from and sender don't exist, the module take the user credentials.
I decide to manage the logging system using Winston module, it seems very flexible! It permits, in a simple manner, to manage the response using different methods.
The critical errors messages and the sent informations are configurable, for the connection errors I decide to use a file to stored the informations and then retrieve to attempt again the operation.

## Dependencies

What you need to run this app:

* [Node.Js](https://nodejs.org)
* [Nodemailer](https://nodemailer.com)
* [DotEnv]
* Winston: https://github.com/winstonjs/winston

## Instructions

### Setup

* npm install multimails-nodemailer

# functions' documentation:

## send_mail
this function will expect two arrays that will contains:
1) a list of objects formatted following this guide: https://nodemailer.com/message/
example: 

[{from:"me@web.com", to:"you@web.com",subject:"E-mail subject", text:"text message"},
{to:"you@web.com", subject:"Subject", html:"<b>Hello all</b>"}]


2) an array with two objects formatted following this page: https://github.com/winstonjs/winston

example:

const errlog = winston.createLogger({
  format: winston.format.json(),
	level:'error',
  transports: [
  new winston.transports.File({ filename: 'mail_errors.json', level: 'error' })
  ]
});
const infolog = winston.createLogger({
  format: winston.format.json(),
	level:'info',
  transports: [
    new winston.transports.File({ filename: 'mail_logs.json', level:'info' })
  ]
});
var loggers=[errlog,infolog];


Note: the order isn't casual, the app will try to set error in the first object and info into the second.
Note 2: the app will create automaticalli also one file to manage the connection's errors named mail_warn.json.

## send_old_mail
this function read the file mail_warn.json (created with the function send_mail) and rename it to mail_warn.log; then read the file and recreate an array with the e-mail's informations and send it to send_mail passing also an object to set the loggers described previously.
The function want an array of two objects like the second object passend on send_mail.

The version 1.0.0 will contains two loggers setted in another file or something like that to manage a call withoud these informations.