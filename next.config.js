require('dotenv').config();

module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
    env: {
        REACT_APP_API_AUTHORIZATION: process.env.REACT_APP_API_AUTHORIZATION,
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,
        REACT_APP_REPLAIN_ID: process.env.REACT_APP_REPLAIN_ID
    }
}