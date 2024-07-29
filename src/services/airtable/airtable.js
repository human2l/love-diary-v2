import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN,
});
var base = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE_NAME);

export default base;
