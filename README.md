## Property App

Check out the demo [here](https://property-app-demo.herokuapp.com/ "Google's Homepage").

![Homepage](https://res.cloudinary.com/prvnbist/image/upload/v1562326012/Propery-App/2019-07-05_165106.png "Homepage")

#### Tech Stack
- MongoDB(Mongoose)
- Node(Express)
- React(Redux & Redux Saga)
- Github(Hosted) & Heroku(Deployed)

#### Instructions
1. `git clone https://github.com/prvnbist/property-app.git`
2. `npm install && cd client && npm install`
3. Create .env file in root folder and `MONGO_URI=<DB_URL> and HASH_SECRET=<YOUR_SECRET_KEY>` 
4. `npm run dev` in root folder to fire up server.
5. `cd client && npm start` in root folder to fire up client.
6. To deploy to heroku
    - `heroku login` and fill in your credentials
    - `heroku create` 
    - `git push heroku master` to deploy app.
