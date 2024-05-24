//BALANCE REFACTORED 5.23 - pulls balance from mongodb and updates using deposit/withdraw forms

//firebase project
const firebaseConfig = {
  apiKey: "AIzaSyDkuZHa8ge_dWi6iDMdd3R63DeEcCLU5TA",
  authDomain: "badbankapp-8798e.firebaseapp.com",
  projectId: "badbankapp-8798e",
  storageBucket: "badbankapp-8798e.appspot.com",
  messagingSenderId: "14713719962",
  appId: "1:14713719962:web:432905985f698ec8dda323"
};

function Balance(){
	const [show, setShow]         = React.useState(true);
	const [status, setStatus]     = React.useState('');
	const [authUser, setAuthUser] = React.useState(null);
	const [balance, setBalance]   = React.useState('');

  React.useEffect(() => {
      // Initialize Firebase
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
      }

      // Handle authentication state changes
      firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
              setAuthUser(firebaseUser);
              setShow(false);
              fetchBalance(firebaseUser.email);
              console.log(firebaseUser.email);
          } else {
              setAuthUser(null);
              setShow(true);
			        setBalance('');
          }
      });

  }, []);
  
  function fetchBalance(email){
    fetch(`/account/findOne/${email}`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        setBalance(data.balance);
        setStatus('Balance found');
      } else {
        setStatus('User not found');
      }
    })
    .catch(err => {
      setStatus('error');
      console.error('error:' ,err);
    });
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
 
  return (
      <div>
          <Card
              bgcolor="primary"
              header="Balance"
              body={(
                  <>
                    {authUser ? (
                      <>
                      {formatCurrency(balance)}
                      </>
                    ) : (
                      <div> Login to view balance </div>
                    )}
                  </>
                )}
            />
        </div>
  );
}