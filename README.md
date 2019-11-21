# Instruction on How to run the application.
## To start the client application, follow the following instructions below:
step 1. **__cd client__**

step 2.Create a *__.env__* in the client root directory and add the parameter below in it: 

# **__NOTE:__** 
These values are all test parameter values. You have to create the live flutterwave public and secret keys and replace the values here with the newly created ones. The only thing that will not be changed is the PORT and CHKIDAR_USEPOLLING values.

Step 3: Run *__npm install__* to install all dependencies for the react application.

Step 4: Run *__npm start__* to start the react client application.

Step 5: Open another terminal and navigate into the cloned application.
Step 6: Without going into the client folder this time, just right in the parent directory. Create a *__.env__* file and paste the following in it.

# **__Note:__**
You are to replace these values with their corresponding *__LIVE__* parameter values.

For example, SMS_USERNAME is the username created on jamasms.com for sms services and SMS_PASS is the corresponding password created along with the USERNAME.

For production, these values are to be provided through CLI for heroku hosting.

Also **__FRONTEND_APP-URL__** is application front-end url. This is essential as it is used by the server to navigate to registration page if a shared link is clicked. Remember to replace http://localhost:3000 in http://localhost:3000/register with the application **__LIVE URL__**

For **__database url__** use PROD_DB as the environment variable during production so the application can connect to the database url you supplied to it during production.

Step 6: After the above steps are duely taken, run *__npm install__* to install dependencies for the application backend.

Step 7: Run *__npm run dev__* to start the application in development mode.
