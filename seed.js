const axios = require('axios');
const { addOrUpdateCharacter } = require('./dynamo');

// Make a request to the API, transform data and save in DB
const seedData = async () => {
    const url = 'https://fedeperin-harry-potter-api.herokuapp.com/personajes';
    try {
        // const resp = await axios.get(url);
        const { data: characters } = await axios.get(url);

        // Returns an array of promises
        const characterPromises = characters.map(( character, index ) => 
            addOrUpdateCharacter({ ...character, id: index + ''})
        );

        // Triggers all the requests to be run independently (at the same time)
        // Once they're all done, handles the responses/rejects
        await Promise.all(characterPromises);

    } catch (error) {
        console.error(error);
        console.error('Ahhhh HELP!');
    }
}

seedData();
