//LOGOUT

//firebase project
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
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
