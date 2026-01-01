export const USER_ID_MAP = {
  Dan: "recISybotETJtZOaI",
  Kai: "recW7reKMhDGMg8AV",
  Alice: "recGvx4sVJTirnLjN",
  Bob: "recxhOgxeKaYMdbGI",
};

export const DEFAULT_BACKGROUND_IMAGE_ID = "Kqwt7tNSTCYJXKKNJnl7";

export const LOCAL_BACKGROUND_IMAGE_MAP = {
  [DEFAULT_BACKGROUND_IMAGE_ID]: "/assets/images/backgrounds/default_bg.webp",
  // Add more mappings here for other specific background images from Airtable
  // Example: "filestack_id_for_dan": "/assets/images/backgrounds/dan_bg.webp",
  // Example: "filestack_id_for_kai": "/assets/images/backgrounds/kai_bg.webp",
};

export const AIRTABLE_TABLES = {
  DIARY: "diary",
  SETTINGS: "settings",
  // Add other table names as needed
};

export const AIRTABLE_FIELDS = {
  DIARY: {
    AUTHOR_ID: "authorId",
    TIME: "time",
    PHOTOS: "photos",
    REPLY: "reply",
    // Add other diary fields as needed
  },
  SETTINGS: {
    PARTNER_ID: "partnerId",
    NAME: "name",
    // Add other settings fields as needed
  },
  // Add other table's fields as needed
};