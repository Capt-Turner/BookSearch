const {gql}=require('apollo-server-express');

const typeDefs=gql`
    type User{
        _id: ID
        username: String
        email: String
        password: String
        bookcount: Int
        savedBooks: [Book]!
    }
    
    type Book{
        _id: ID
        title: String
        image: String
        link: String
        description: String
        authors:[String]
    }
    
    type Auth{
        token:ID!
        user:User
    }
    
    type Mutation{
        addUser(username: String1, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(
            bookId: String!
            authors: [String]
            title: String!
            description: String!
            image: String
            link: String
        ): User
        removeBook(bookId: String!): User
    }`;

    module.exports=typeDefs;