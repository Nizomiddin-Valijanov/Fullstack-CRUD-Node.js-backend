const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "ToDo API", // Title of the API
      version: "1.0.0", // API version
      description: "A simple CRUD API for managing ToDo items", // Description of the API
    },
    servers: [
      {
        url: "http://localhost:5000", // Base URL for your API
      },
    ],
    components: {
      securitySchemes: {
        // Corrected key name here
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // JWT format for the Bearer token
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Applying BearerAuth globally to all routes
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files for Swagger to scan
};

// Initialize swagger-jsdoc and swagger-ui-express
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
