/*global getPublicSettings*/

let dockerSettings = null;
if (typeof getPublicSettings === 'function') dockerSettings = getPublicSettings();

export default {
    IsProduction: process.env.NODE_ENV === 'production',
    ApiUrl: dockerSettings && dockerSettings.ApiUrl ? dockerSettings.ApiUrl : 'https://localhost:44354/api',
    appName: dockerSettings && dockerSettings.appName ? dockerSettings.appName : process.env.APP_NAME,
    BaseName: dockerSettings && dockerSettings.BaseName ? dockerSettings.BaseName : process.env.REACT_APP_BASENAME,
};
