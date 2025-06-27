require("dotenv").config({ override: true });

module.exports = {
  get: (req, res) => {
    res.render("index", { page: "login" });
  },
  post: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (
      username == process.env.ADMIN_USERNAME &&
      password == process.env.ADMIN_PASSWORD
    ) {
      req.app.locals.isAuthenticated = true;

      res.redirect("/");
    }

    console.log("Username or password is incorrect");
    res.redirect("/login");
  },
};
