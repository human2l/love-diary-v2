import base from "./airtable";

const wishboardBase = base("wishboard");

const getAllWishes = async () => {
  const response = await wishboardBase.select({}).all();
  const allWishes = response.map(({ fields, id }) => {
    return {
      ...fields,
      key: id,
    };
  });
  return allWishes;
};

const addWish = async (newWish) => {
  wishboardBase.create(
    {
      ...newWish,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

export { addWish, getAllWishes };
