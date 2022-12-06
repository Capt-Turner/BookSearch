const express = require('express');
const {ApolloServer} =require('apollo-server-express');
const {typeDefs,resolvers}=require('./schemas');
const db = require('./config/connection');
const {authMiddleware}=require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;
const server=new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer=async(typeDefs,resolvers)=>{
    await server.start();
    server.applymiddleware({app});

    db.once('open', () => {
        app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
        console.log(`GraphQl hosted at http://localhost:${PORT}${server.graphqlPath}`)
    });
};
startApolloServer(typeDefs,resolvers);
