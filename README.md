# DevConnector.V2

> Originally, this application was built by one of the greatest online instructor I have come across, Brad Traversy. After changing some visual portions and adding new features, it was renamed as DevConnector.V2. Application is intended to serve as social media platform for developers.

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a keys_dev.js in the server config folder with

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```

## App Info

### Author

Brad Traversy
[Traversy Media](http://www.traversymedia.com)

### Version

1.0.0

### License

This project is licensed under the MIT License
