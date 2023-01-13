# Github-repo-fetch

Basically this script allows you to export a list of all your repositories to the Notion table for future analysis.

How to run it:

1. install all dependencies `npm install`
2. create Notion table with the stucture:
   1. title - default notion title
   2. url - url
   3. description - text
   4. language - multi-select
   5. fork - checkbox
   6. archived - checkbox
   7. visibility - text
   8. create_at - datetime
   9. update_at - datetime
   10. pushed_at - datetime
3. create a github auth token with grand permission
4. copy .env.sample file and set .env name to it `cp .env.sample .env`
5. add auth information to .env file
6. run `npm start`


How to run tests:

1. run `npm run tests`

How to generate documentation

1. run `npm run docs`