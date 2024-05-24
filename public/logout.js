//LOGOUT

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

  function Logout() {
    const [authUser, setAuthUser] = React.useState(null);
    const [isSignedOut, setIsSignedOut] = React.useState(false);

    React.useEffect(() => {
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Handle authentication state changes
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setAuthUser(firebaseUser);
            } else {
                setAuthUser(null);
                setIsSignedOut(false);
            }
        });

    }, []);

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('User signed out successfully');
                setIsSignedOut(true);
            })
            .catch(error => {
                console.error('Error signing out:', error.message);
            });
    };

    return (
        <div>
            <Card
                bgcolor="primary"
                body={(
                    <>
                    <button type="button" className="btn btn-light" onClick={handleSignOut}>Sign Out</button>
                    </>
                )}
            />
        </div>
    );
}
