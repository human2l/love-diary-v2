import base from "./airtable";

const wishboardBase = base("wishboard");

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

export { addWish };
