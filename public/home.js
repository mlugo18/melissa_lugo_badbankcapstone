function Home(){
  return (
    <Card
      txtcolor="white"
      bgcolor="primary"
      header="BadBank & Trust, Co."
      title="Welcome to your bank!"
      text="We are here to help you manage your money and give you peace of mind."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}