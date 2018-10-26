# Node Project

##To Run:

Clone repo:
1. $ npm install

To run server:
2. $ nodemon

Download MongoDB and in the console navigate to it:
(and in another window make sure it is running:
3. $ /usr/local/mongodb/bin/mongod)


4. $ /usr/local/mongodb/bin/mongo
5. $ show dbs
6. $ use projectnode
7. $ db.createCollection('users')
8. $ show collections

You can insert a user manually:
6. $ db.users.insert(INSERT USER)

To list them do:
7. $ db.users.find().pretty()
