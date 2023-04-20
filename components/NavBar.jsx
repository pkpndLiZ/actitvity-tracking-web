export function NavBar() {
  return (
    <nav className="navbar-container">
      <div className="left-navbar-container">
        <span><a>Gym</a></span>
        <span><a>mini</a></span>
      </div>
      <div className="right-navbar-container">
        <span>Have an account ?</span>
        <a href="#">Login</a>
        <span>or</span>
        <a href="#">Register</a>
      </div>
    </nav>
  );
}
