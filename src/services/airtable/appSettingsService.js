import base from "./airtable";

const appSettingsBase = base("appSettings");

const getAppSettings = async () => {
  const response = await appSettingsBase.select({}).all();
  const appSettings = {
    id: response[0].id,
    backgroundImage: response[0].fields.backgroundImage,
    defaultBackgroundImage: response[0].fields.defaultBackgroundImage,
  };
  return appSettings;
};

const updateAppSettingsDB = async (settings) => {
  appSettingsBase.update(
    settings.id,
    {
      backgroundImage: settings.backgroundImage,
    },
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

export { getAppSettings, updateAppSettingsDB };
