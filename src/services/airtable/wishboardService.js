import base from "./airtable";

const wishboardBase = base("wishes");

const getAllWishes = async (coupleIds) => {
  const response = await wishboardBase
    .select({
      filterByFormula: `OR({createrId}="${coupleIds[0]}",{partnerId}="${coupleIds[0]}",{createrId}="${coupleIds[1]}",{partnerId}="${coupleIds[1]}")`,
    })
    .all();
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
