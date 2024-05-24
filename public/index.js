function Spa() {
  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Handle authentication state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setAuthUser(firebaseUser);
        console.log('authUser set to', firebaseUser.email)
      } else {
        setAuthUser(null);
      }
    });
  }, []);
  
  return (
    <HashRouter>
      <div>
        <NavBar authUser = {authUser}/>        
        <UserContext.Provider value={{users:[{name:'',email:'',password:'',balance:0}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit}/>
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
            <Route path="/logout/" component={Logout} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
