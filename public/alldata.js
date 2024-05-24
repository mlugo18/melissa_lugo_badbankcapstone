//REFACTORED AND WORKIKNG 5.5.24 - READS FROM MONGODB


function AllData(){    
    const [data, setData] = React.useState('');    
  
      React.useEffect(() => {
          
          // fetch all accounts from API
          fetch('/account/all')
              .then(response => response.json())
              .then(data => {
                  console.log(data);
                  setData((data));                
              });
  
      }, []);
  
    const renderCard = (record, index) => {
    return (
      <Card key={index}
        bgcolor="primary"
        body={(
                <>
                <div className="card-header">{`Record # ${index + 1}`}</div>
                <div className="card-body">{`Name: ${record.name}`}</div>
                <div className="card-body">{`Email: ${record.email}`}</div>
                <div className="card-body">{`Password: ${record.password}`}</div>
                <div className="card-body">{`Balance: $ ${record.balance}`}</div>
                </>
              )}
        />
      )
    }
  
    return (
      <div className="container">
        <h2>User Records</h2>
        <div className="grid">
        {data.length > 0 ? (
            data.map((record, index) => renderCard(record, index))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    );
  }