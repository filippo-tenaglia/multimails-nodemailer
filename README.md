This is a simple module to send many e-mails using nodemailer.

# Send many mails with nodemailer

The purpose of this module is manage a JSON object to send many mails using nodemailer.
The connection informations are retrieved by dotenv module from .env file.
Another thing is that if the parameters from and sender don't exist, the module take the user credentials.

## Dependencies

What you need to run this app:

* [Node.Js](https://nodejs.org)
* [Nodemailer](https://nodemailer.com)
* [DotEnv]

## Instructions

### Setup

* npm install multimails-nodemailer


## Roadmap
the next steps will be to modify the logging system to manage different types:
- file (the default type and already used);
- nosql database;
- sql database.