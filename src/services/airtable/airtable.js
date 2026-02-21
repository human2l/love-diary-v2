import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "/api/airtableProxy",
  apiKey: "dummy-token",
});
var base = Airtable.base("dummy-base");

export default base;
