module.exports = function(req, res) {
  const password = req.body?.password;
  if (!password) {
    return res.status(400).json({ success: false });
  }

  if (password === process.env.LOGIN_PASSWORD_DAN) {
    return res.status(200).json({ success: true, user: "Dan" });
  } else if (password === process.env.LOGIN_PASSWORD_KAI) {
    return res.status(200).json({ success: true, user: "Kai" });
  } else if (password === process.env.LOGIN_PASSWORD_ALICE) {
    return res.status(200).json({ success: true, user: "Alice" });
  } else if (password === process.env.LOGIN_PASSWORD_BOB) {
    return res.status(200).json({ success: true, user: "Bob" });
  } else {
    return res.status(401).json({ success: false });
  }
};
