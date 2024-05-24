//WITHDRAWAL REFACTORED 5.23 - pulls balance from mongodb and updates using balance with withdrawn amount

//firebase project
const firebaseConfig = {
  apiKey: "AIzaSyDkuZHa8ge_dWi6iDMdd3R63DeEcCLU5TA",
  authDomain: "badbankapp-8798e.firebaseapp.com",
  projectId: "badbankapp-8798e",
  storageBucket: "badbankapp-8798e.appspot.com",
  messagingSenderId: "14713719962",
  appId: "1:14713719962:web:432905985f698ec8dda323"
};

function Withdraw(){
	const [show, setShow]         = React.useState(true);
	const [status, setStatus]     = React.useState('');
	const [authUser, setAuthUser] = React.useState(null);
	const [balance, setBalance]   = React.useState('');
  const [amount, setAmount]     = React.useState('');

  React.useEffect(() => {
      // Initialize Firebase
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
      }

      // Handle authentication state changes
      firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
              setAuthUser(firebaseUser);
              setShow(true);
              fetchBalance(firebaseUser.email);
              console.log(firebaseUser.email);
          } else {
              setAuthUser(null);
              setShow(false);
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

  function handle(email){
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            setStatus('Deposit successful');
            setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
    if(authUser) {
      fetchBalance(authUser.email);
    };
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
 
  function clearForm(){
    setAmount('');
    setShow(true);
   }

  return (
      <div>
          <Card
              bgcolor="primary"
              header="Withdrawal"
              body={show ? (
                      <> 
                      Account Balance: {formatCurrency(balance)}
                      <br/>
                      <input type="number" className="form-control" placeholder="Enter amount to withdraw" value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
                      <button type="submit" className="btn btn-light" onClick={() => handle(authUser.email)}>Withdraw</button>
                      </>
                    ) : (
                      <>
                      Account Balance: {formatCurrency(balance)} <br/>
                      <div> Successfully withdrawn! </div>
                      <button type="button" className="btn btn-light" onClick={clearForm}>Submit another withdrawal</button>
                      </>
                    )
                  }
            />
      </div>
  );
}