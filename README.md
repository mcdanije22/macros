# macros

## Deploying to Heroku

> Information taken from this article [Deploying to Heroku w/
Mongo](https://medium.com/make-school/how-to-deploy-your-node-js-mongodb-app-to-the-web-using-heroku-63d4bccf2675)

```bash
heroku create <app_name>

# make it a free server
heroku ps:scale web=1

# Add a mongodb database
heroku addons:create mongolab:sandbox

# find your mongodb uri
heroku config:get MONGODB_URI

git push heroku master
```
