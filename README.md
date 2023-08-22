### Stephen Microservices Blog
Complex Blog project using microservices architecture:
  - it comprises of multiple independent services namely Client, Post, Comment, Query and EventBus
  - each service is built and managed as an standalone service or microservice from other services
  - each service has its own internal API server, business logic and dedicated NoSQL database engine
  - it makes use of an EventBus as Data streaming pipeline that shares realtime data among services

### Features
- User can create new posts for others to read
- They can create new comments on existing posts
- A single request is made to the Query service to retrieve posts 
- Posts data are rendered to the UI data with their associated comments

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
