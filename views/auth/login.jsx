const React = require("react");
//const Layout = require("../layout");

class Login extends React.Component {
  render() {
    return (
      <div title="LOGIN">
        <form action="/auth/login" method="post">
          <input type="text" name="username" placeholder="username"/>
          <input type="text" name="password" placeholder="password"/>
          <input type="submit" value="login"/>
        </form>
      </div>
    );
  }
}

module.exports = Login;
