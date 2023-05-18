const bcrypt = require("bcrypt");

module.exports = {
    hashPass: async (password) => {
        try {
            const hash = await bcrypt.hash(password, 10); //metodo hash: utiliza password y cantidad de hasheos 
            return hash;
        } catch (error) {
            return {message: error.message, code:500}
        }

    },
    comparePass: async (password, hash) => {
        try {
            const isMatch = await bcrypt.compare(password, hash);
            if (!isMatch) {
                throw error
            };
            return isMatch;
        } catch (error) {
            return {message: `Password incorrecta`, code:401}
        }
    }
}
