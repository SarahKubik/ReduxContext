const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const http = require("http");


const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

// const dotenv = require("dotenv");
// dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
db.on("error", (err) => {
  console.error("MongoDB connection error: ", err);
});