export const getCurrentUser = (req, res) => {
  return res.json({ user: req.user });
};
