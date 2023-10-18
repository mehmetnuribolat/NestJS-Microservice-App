# NestJS-Microservice-App
NestJS-Microservice-App is sample Application using NestJS, MongoDB, Docker, RabbitMQ and GraphQL. This project have developed for learning purposes based on Microservice Architecture. This application contains Apollo Federation Gateway for GraphQL SubGraphs which implemented on microservices. The microservices uses RabbitMQ Message Broker to communicate each other.

![Technology-Stack](https://github.com/mehmetnuribolat/NestJS-Microservice-App/assets/145845943/106489ad-db8a-46a2-a060-3bfa8042f5f2)

## 💻 Tech Stack
- Environment: [Node.js](https://nodejs.org/)
- Framework: [Nest.js](https://nestjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Query-Language: [GraphQL](https://graphql.org/)
- Message Broker: [RabbitMQ](https://www.rabbitmq.com/)
- API-Gateway: [Apollo Federation](https://www.apollographql.com/)
- Authentication: [Passport-JWT](www.passportjs.org)
- Mail Sender: [NodeMailer](https://nodemailer.com/)
- Object-Modelling: [Mongoose](https://mongoosejs.com/)
- Schema Validation: [Joi](https://joi.dev/)
- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)

## :arrows_clockwise:	System Architecture

![NestJS-RabbitMQ-GraphQL-Mongo-MicroService](https://github.com/mehmetnuribolat/NestJS-Microservice-App/assets/145845943/9ad7fadd-dc76-45ba-be83-a83bf3f1fe36)

## ⌨️ Development

First, you need to set a MongoDB connection string for `MONGO_DB_URI` in `.env`.

### Install dependencies:

```
npm install
```

### Execute application on development mode:

```
npm run watch
```

- Application will start on http://localhost:8000.
- Postman Collection is available in source repository.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mehmetnuribolat/NestJS-Microservice-App/issues).

## :pray: Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is under [MIT](https://github.com/mehmetnuribolat/NestJS-Microservice-App/blob/main/LICENSE) license.

