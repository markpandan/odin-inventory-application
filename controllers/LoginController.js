require("dotenv").config({ override: true });

module.exports = {
  get: (req, res) => {
    res.render("index", { page: "login" });
  },
  post: (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if (
      username == process.env.ADMIN_USERNAME &&
      password == process.env.ADMIN_PASSWORD
    ) {
      req.app.locals.isAuthenticated = true;

      res.redirect("/");
      return;
    }

    console.log("Username or password is incorrect");
    res.redirect("/login");
  },
};
