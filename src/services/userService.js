let user;
const userMap = {
  Kai: {
    country: "Sydney",
    chineseName: "凯凯",
    color: "secondary",
  },
  Dan: {
    country: "China",
    chineseName: "蛋蛋",
    color: "primary",
  },
};

const setUser = (newUser) => (user = newUser);
const getUser = () => user;

const getUserInfo = (user) => {
  return userMap[user] || null;
};

export { getUserInfo, setUser, getUser };
