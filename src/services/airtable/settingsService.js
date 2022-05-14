import base from "./airtable";

const settingsBase = base("settings");

const getUserSettings = async () => {
  const response = await settingsBase.select({}).all();
  const userSettings = {};
  for (let record of response) {
    userSettings[record.fields.name] = { ...record.fields, id: record.id };
  }
  return userSettings;
};

const updateSettingsDB = async (settings) => {
  const settingsArray = [settings.Dan, settings.Kai];
  const updateData = settingsArray.map((setting) => {
    const { id, ...fields } = setting;
    return {
      id,
      fields,
    };
  });

  settingsBase.update(updateData, function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
};

export { getUserSettings, updateSettingsDB };
