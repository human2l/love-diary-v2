import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_NAME);

const getAllDiarys = async () => {
  const response = await base("love-diary").select({}).all();
  const allDiarys = response.map(
    ({ fields, fields: { photos, reply }, id }) => {
      const jsonPhotos = JSON.parse(photos);
      const jsonReply = JSON.parse(reply);
      return {
        ...fields,
        photos: jsonPhotos,
        reply: jsonReply,

        key: id,
      };
    }
  );
  console.log(allDiarys);
  return allDiarys;
};

export { getAllDiarys };
