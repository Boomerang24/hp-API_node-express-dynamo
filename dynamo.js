const AWS = require('aws-sdk');
require('dotenv').config();  // To be able to use our env. variables in the file

// Connection to AWS
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// Creating the client to connect to the document in Dynamo and specifying the document name
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'harrypotter-api';

const getCharacters = async() => {
    const params = {
        TableName: TABLE_NAME
    };

    // Read/look for the table
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
}

const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character
    }

    // Will create/write in the DynamoDB the parameters passed
    return await dynamoClient.put(params).promise();
};

const deleteCharacter = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    // Will create/write in the DynamoDB the parameters passed
    return await dynamoClient.delete(params).promise();
};

module.exports = { 
    dynamoClient,
    getCharacters,
    getCharacterById,
    addOrUpdateCharacter,
    deleteCharacter
}

// getCharacters();

// const hp = {
//     "id": "0", //! Id type needs to match the one specified in Dynamo table
//     "personaje": "Harry James Potter",
//     "apodo": "Harry",
//     "estudianteDeHogwarts": true,
//     "casaDeHogwarts": "Gryffindor",
//     "interpretado_por": "Daniel Radcliffe",
//     "hijos": [
//     "James Sirius Potter",
//     "Albus Severus Potter",
//     "Lily Luna Potter"
//     ],
//     "imagen": "https://raw.githubusercontent.com/fedeperin/harry-potter-api/main/imagenes/harry_potter.png"
// }

// addOrUpdateCharacter(hp);


