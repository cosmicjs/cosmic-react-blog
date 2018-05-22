# Cosmic Blog

![Preview](https://cosmic-s3.imgix.net/36dd5d40-5dde-11e8-8b90-49cb251195d1-smartmockups_jhhwhno1.jpeg)

### [View Demo](https://cosmicblog.chriso.io)

### Backend - [Cosmic JS](https://cosmicjs.com/)
This project was created to expirement with and demonstrate the Cosmic JS tooling. All of the backend data is stored, edited, and retreived using Cosmic JS.

### Frontend - [React](https://reactjs.org/) + [Next.js](https://nextjs.org/)
This is a universal web application, meaning it is rendered on the server, as well as the client. This provides better initial load times and search engine optimization.

### Getting Started
```
git clone https://github.com/chrisoverstreet/cosmic-blog
cd cosmic-blog
npm i
```

### Develop

#### Add required development config files

 - /.env _- secret variables (used on backend)_
```
PORT=<__PORT__>
BUCKET_SLUG=<__BUCKET_SLUG__>
```

#### Run in development
```
npm run dev
```

### Deploy

#### Add required production config files
- /.env.production _- secret variables (used on backend)_
```
PORT=<__PORT__>
BUCKET_SLUG=<__BUCKET_SLUG__>
```
- /.config.js _- public variables (used on frontend)_
```
API_URL: 'https://<__YOUR_DOMAIN__>/api',
BASE_URL: 'https://<__YOUR_DOMAIN__>',
```

- /now.json _- Now deployment configuration_
```
{
  "alias": [
    <__YOUR_DOMAIN__>
  ],
  "dotenv": ".env.production",
  "public": false
}
```

#### Deploy via [Now](https://zeit.co/now)
```
npm run deploy
```
