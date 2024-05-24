//LOG IN REFACTORED WITH FIREBASE AUTHENTICATION 5.6 - added google authenticate; Login form change setShow 5.23

//firebase project
const firebaseConfig = {
    apiKey: "AIzaSyDkuZHa8ge_dWi6iDMdd3R63DeEcCLU5TA",
    authDomain: "badbankapp-8798e.firebaseapp.com",
    projectId: "badbankapp-8798e",
    storageBucket: "badbankapp-8798e.appspot.com",
    messagingSenderId: "14713719962",
    appId: "1:14713719962:web:432905985f698ec8dda323"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  };
  
  const provider = new firebase.auth.GoogleAuthProvider();
  
  function Login() {
    const [show, setShow]         = React.useState(true);
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginMsg, setLoginMsg] = React.useState(''); // State for login message
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
                setLoginMsg('Sucessfully signed in as ');
                setShow(false);
            } else {
                setAuthUser(null);
                setLoginMsg('');
            }
        });
  
        // Cleanup on unmount
        //return () => {
        //    firebase.auth().onAuthStateChanged(null);
        //};
    }, []);
  
    const handleSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in successfully');
            })
            .catch(error => {
                console.error('Error signing in:', error.message);
                setLoginMsg('Error: Check email and/or password to log in.');
                setTimeout(() => setLoginMsg(''),3000);
            });
    };
  
    const googleAuth = () => {
        console.log("google sign in clicked");
        firebase.auth().signInWithPopup(provider)
          .then((result) => {
            const credential = firebase.auth.GoogleAuthProvider.credential(result.credential);
            const token = credential.accessToken;
            const user = result.user;
          }).catch((error) => {
            console.log('Google Authentication error', error);
          });
    };
  
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('User signed out successfully');
                setEmail('');
                setPassword('');
                setShow(true);
            })
            .catch(error => {
                console.error('Error signing out:', error.message);
            });
    };
  
    return (
        <div>
            <Card
                bgcolor="primary"
                header="Login"
                body={show ? (
                    <>
                    Email address<br />
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    Password<br />
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                    <button type="button" className="btn btn-light" onClick={handleSignIn}>Log In</button> <p> </p>
                    <button type="button" className="btn btn-light" onClick={googleAuth} id="googlelogin">Sign In with Google</button>
                    </>
                ) : (
                    <>
                    <p>{loginMsg} {`${authUser.email}!`}</p>
                    <div> {authUser ? <><button type="button" className="btn btn-light" onClick={handleSignOut}>Sign Out</button></> : <p></p>}</div>
                    </>
                )}
                />
        </div>
    );
  }
  