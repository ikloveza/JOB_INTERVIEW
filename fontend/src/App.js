import { useState } from "react";
import Axios from "axios";

function App() {
  const [Terminalinfo, setTerminalinfo] = useState([]);

  Axios.get("http://localhost:3001/api/terminals").then((respone) => {
    setTerminalinfo(respone.data);
  });

  const addTerminalinfo = () => {
    Axios.post("http://localhost:3001/api/terminals");
  };

  const upDateTerminalinfo = () => {
    Axios.put("http://localhost:3001/api/terminals")
      .then((respone) => {
        console.log(respone.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteTerminalinfo = (id) => {
    Axios.delete(`http://localhost:3001/api/terminals/${id}`)
      .then((respone) => {
        console.log(respone.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  return (
    <div className="App container">
      <div className="row">
        <div className="col-sm-3">
          <h1>All of the shops.</h1>
        </div>
        <div className="col-sm-2 py-4">
          <button
            className="btn btn-success "
            type="button"
            onClick={()=>{addTerminalinfo()}}> + Add Terminalinfo
          </button>
        </div>
        <div className="col-sm-2 py-4">
          <button
            className="btn btn-info "
            type="button"
            onClick={()=>{upDateTerminalinfo()}}
          >
     
            + UPDATE Terminalinfo
          </button>
        </div>

        <div className="col-sm-2 py-4">
          <button className="btn btn-danger" type="button" onClick={()=>{DeleteTerminalinfo(517705)}}  >
      
            - Delete Terminalinfo
          </button>
        </div>

       


      </div>

      {Terminalinfo.map((val, key) => {
        return (
          <div className=" card">
            <div className="card-body text-left">
              <p className="card-text">Name: {val.TERM_ID}</p>
              <p className="card-text">BRANCH: {val.BRANCH}</p>
              <p className="card-text">VENDORNO: {val.VENDORNO}</p>
              <p className="card-text">PRODUCTNO: {val.PRODUCTNO}</p>
              <p className="card-text">PMINO: {val.PMINO}</p>
              <p className="card-text">BATCH: {val.BATCH}</p>
              <p className="card-text">SLIPNO: {val.SLIPNO}</p>
              <p className="card-text">TERM_NAME: {val.TERM_NAME}</p>
              <p className="card-text">TERM_FOOD: {val.TERM_FOOD}</p>
              <p className="card-text">PAYPERCENT: {val.PAYPERCENT}</p>
              <p className="card-text">PAYPERDAY: {val.PAYPERDAY}</p>
              <p className="card-text">INCLUDEVAT: {val.INCLUDEVAT}</p>
              <p className="card-text">INV_PRINT: {val.INV_PRINT}</p>
              <p className="card-text">Name: {val.TERM_ID}</p>
              <p className="card-text">INV_NAME: {val.INV_NAME}</p>
              <p className="card-text">INV_ADDR: {val.INV_ADDR}</p>
              <p className="card-text">TERM_FLAG: {val.TERM_FLAG}</p>
              <p className="card-text">TYPEPAY: {val.TYPEPAY}</p>
              <p className="card-text">STAFFOFCHARGE: {val.STAFFOFCHARGE}</p>
              <p className="card-text">STAFFPRODUCTNO: {val.STAFFPRODUCTNO}</p>
              <p className="card-text">CUSTOMER_REF: {val.CUSTOMER_REF}</p>
              <p className="card-text">HORIZON_SENT: {val.HORIZON_SENT}</p>
              <p className="card-text">LEASE_TYPE: {val.LEASE_TYPE}</p>
              <p className="card-text">CLUBCARD_CODE: {val.CLUBCARD_CODE}</p>
              <p className="card-text">CLUBCARD_AMT: {val.CLUBCARD_AMT}</p>
              <p className="card-text">CLUBCARD_POINT: {val.CLUBCARD_POINT}</p>
              <p className="card-text">TERMINAL_TYPE: {val.TERMINAL_TYPE}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
