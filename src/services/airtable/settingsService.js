import base from "./airtable";

const settingsBase = base("settings");

const getSettingsByUserId = async (userId) => {
  const record = await settingsBase.find(userId);
  return { ...record.fields, id: record.id };
  // const response = await settingsBase.select({}).all();
  // const userSettings = {};
  // for (let record of response) {
  //   userSettings[record.fields.name] = { ...record.fields, id: record.id };
  // }
  // return userSettings;
};

const getCoupleSettingsByUserId = async (userId) => {
  const userSettings = await getSettingsByUserId(userId);
  const partnerSettings = await getSettingsByUserId(userSettings.partnerId);
  const settings = {
    [userSettings.name]: { ...userSettings },
    [partnerSettings.name]: { ...partnerSettings },
  };
  console.log(settings);
  return settings;
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

export { getCoupleSettingsByUserId, updateSettingsDB };
