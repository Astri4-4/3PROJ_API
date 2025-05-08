import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express"

// Swagger definition (metadata info about your API)
const options = {
  definition: {
    openapi: '3.0.0', // use 3.0.0 for modern swagger
    info: {
      title: 'Supchat',
      version: '1.0.0',
      description: 'The Supchat API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000', // change to your server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the API docs (you can point to specific folders/files)
  apis: ['./app/routes/*.js'], // adjust this to where your routes are
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };