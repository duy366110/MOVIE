const path = require('path');
const fs = require('fs');

class ModelGenres  {

    pathGenres = path.join(__dirname, "../", 'db', 'genreList.json');

    constructor() { }

    genresFind = () => {
        let result = null;
        const content  = fs.readFileSync(this.pathGenres, 'utf-8');
        
        if(content) {
            result = JSON.parse(content);

        }

        return result;
    }

}

module.exports = new ModelGenres();