//REFACTORED AND WORKING 5.5.24 - POSTS TO MONGODB AND FIREBASE PROJECT

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

function CreateAccount() {
  const [show, setShow]           = React.useState(true);
  const [status, setStatus]       = React.useState('');
  const [name, setName]           = React.useState('');
  const [email, setEmail]         = React.useState('');
  const [password, setPassword]   = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  function handleChange(){
      if (name || email || password) {
        setValidTransaction(true);
      } else {
      setValidTransaction(false);
      }
    }

    function validate(field, label){
      if (!field) {
        setStatus('Error: Enter value for ' + label + '.');
        setTimeout(() => setStatus(''),3000);
        return false;
      } else if (label === 'password' && field.length < 8) {
        setStatus('Error: Password must be at least 8 characters long.');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleCreate(){
      console.log(name,email,password);
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);
      })();
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              console.log(userCredential);
              setShow(false);
          })
          .catch((error) => {
              console.log(error);
              setStatus('Error occurred while creating user');
              setTimeout(() => setStatus(''), 3000);
          });
      }

  const signUp = (e) => {
      e.preventDefault();
      handleCreate()
  };

  function clearForm(){
     setName('');
     setEmail('');
     setPassword('');
     setShow(true);
    }
  
    return (
      <div>
          <form onSubmit={signUp}>
              <Card
                  bgcolor="primary"
                  header="Create New Account"
                  body={show ? (
                      <>
                          Name<br />
                          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => { setName(e.target.value); handleChange(); }} /><br />
                          Email address<br />
                          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => { setEmail(e.target.value); handleChange(); }} /><br />
                          Password<br />
                          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => { setPassword(e.target.value); handleChange(); }} /><br />
                          <button type="submit" className="btn btn-light" disabled={!validTransaction}>Create Account</button>
                      </>
                  ) : (
                      <>
                          <h5>Successfully created account!</h5>
                          <button type="button" className="btn btn-light" onClick={clearForm}>Add another account</button>
                      </>
                  )}
              />
          </form>
          {status && <p>{status}</p>}
      </div>
  );
};