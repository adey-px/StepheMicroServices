### Stephen Microservices Blog
Complex Blog project using microservices architecture:
  - it comprises of multiple services namely Client, Post, Comment, EventBus, Query & Admin
  - each service is built and managed as an independent service or microservice from other services
  - each service has its own internal API server, business logic and dedicated NoSQL database engine
  - it makes use of an EventBus as Data streaming pipeline that shares realtime data among services

### Features
- User can create new posts for others to read
- They can create new comments on existing posts
- A single request is made to the Query service to retrieve posts 
- Posts data are rendered to the UI data with their associated comments
- Admin service does the moderation of comments before they are live
- Comments are held for moderation to be either approved or rejected
- User gets a message to tell them if their comments are rejected

### Technology
- React
- JavaScript
- Bootstrap
- Node.js
- Express
- Event Bus
- Mongodb
- Next.js
- Postman
- Docker
- Kubernetes
- Google Cloud
- JWT
- Ngnix
- Stripe
