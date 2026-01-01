import { AIRTABLE_TABLES, AIRTABLE_FIELDS } from "../../config/airtableConfig";
import base from "./airtable";

const settingsBase = base(AIRTABLE_TABLES.SETTINGS);

const getSettingsByUserId = async (userId) => {
  const record = await settingsBase.find(userId);
  return { ...record.fields, id: record.id };
};

const getCoupleSettingsByUserId = async (userId) => {
  const userSettings = await getSettingsByUserId(userId);
  const partnerSettings = await getSettingsByUserId(userSettings[AIRTABLE_FIELDS.SETTINGS.PARTNER_ID]);
  const settings = {
    [userSettings[AIRTABLE_FIELDS.SETTINGS.NAME]]: { ...userSettings },
    [partnerSettings[AIRTABLE_FIELDS.SETTINGS.NAME]]: { ...partnerSettings },
  };
  return settings;
};

const updateSettingsDB = async (settings) => {
  const settingsArray = Object.values(settings);
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
