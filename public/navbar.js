function NavBar( {authUser} ){
  console.log("authUser in NavBar:", authUser);
  return(
    <nav className="navbar navbar-expand-lg navbar-light" >
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          
          {!authUser && (
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
          )}
          
          {authUser? (
            <span className="navbar-text">Welcome {authUser.email}!</span>
          ) : (
            <a className="nav-link" href="#/login/">Login</a>
          )}
          
          {authUser && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">Deposit</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">Withdraw</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/balance/">Balance</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/alldata/">AllData</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/logout/">Sign Out</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}