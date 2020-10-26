const React = require("react");
//const Layout = require("../layout.jsx");

class Signup extends React.Component {
  render() {
    return (
      <div title="SIGNUP">
        <form action="/auth/signup" method="post">
          <input type="text" name="username" placeholder="username" />
          <input type="text" name="password" placeholder="password" />
          <input type="submit" value="signup" />
        </form>
      </div>
    );
  }
}

module.exports = Signup;
