import React, { Fragment,useState } from 'react';
import dataset from './dataset';

function calculate_reward(price){
	let rewards = 0;
	if(price > 100){
		rewards = 2 * (price - 100);
	}else if(price > 50){
		rewards += (price - 50);
	}

	return rewards;
}

function select_user(value){
	set_user(value);
	let dt = loaded_data[value];

	let _month = {
		1: {amounts:[], rewards:0}, 2:{amounts: [], rewards:0,}, 3:{amounts: [], rewards: 0,}
	}

	for(i = 0; i < dt.length; i++){
		let month = new Date(dt[i]['date']);
		if(month.getMonth() + 1 == 1 || month.getMonth() + 1 == 2 || month.getMonth() + 1 == 3){
			month_[month.getMonth() + 1]['amounts'].push(dt[i]['amount']); 
		} 
	}

	for(let key in month_){
		let total_month_rewards = 0;
		for(let i = 0; i < month_[key]['amounts'].length; i++){
			let price = month_[key]['amounts'][i];
			rewards_month = rewards_month + calculate_rewards(price);
		}
		month_[key]['rewards'] = rewards_month;	
	}

	set_rewards(...month_);	
}

function update_input(){
	 if (e.target.name === "date") {
      set_transaction({ ...transaction_, ...{ date: e.target.value } });
    }
    if (e.target.name === "amount") {
      set_transaction({ ...transaction_, ...{ amount: e.target.value } });
    }
}

function App(){
	const [rewards, set_rewards] = useState({});
	const [users, set_users] = useState({});
	const [user, set_user] = useState({});
	const [loaded_data, set_ld] = useState({});	
 	const [transaction_, set_transaction] = useState({ date: new Date(), amount: 0 });	

	return (
		   <div style={{
      marginTop: "20px",
      marginBottom: "50px",
      fontSize: "20px",
    }}>
      <h2 style={{ textAlign: "center" }}>User Rewards Dashborad</h2>
      <div className="select-style">
        <select onChange={e => userSelect(e.target.value)} value={currentUser} >
          <option value="" disabled>Select User</option>
          {users.map((item, index) => {
            return (
              <option key={index} value={item}> {item.toUpperCase()} </option>
            );
          })}
        </select>
      </div>
      {Object.keys(rewards).length > 0 &&
        <Fragment>
          <table className="customers">
            <thead>
              <tr>
                <th>Month</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Month</td>
                <td>{rewards[1]["rewards"]}</td>
              </tr>
              <tr>
                <td>Second Month</td>
                <td>{rewards[2]["rewards"]}</td>
              </tr>
              <tr>
                <td>Third Month</td>
                <td>{rewards[3]["rewards"]}</td>
              </tr>
              <tr>
                <td>Total Reward</td>
                <td>{rewards[1]["rewards"] + rewards[2]["rewards"] + rewards[3]["rewards"]}</td>
              </tr>
            </tbody>
          </table>
          <h4>User Transactions</h4>
          {userTransactions.length > 0 ?
            <table className="customers">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Rewards</th>
                </tr>

              </thead>
              <tbody>
                {userTransactions.map((item, index) => {
                  return <tr key={index}>
                    <td>{item["date"]}</td>
                    <td>{item["amount"]}</td>
                    <td>{calculate_rewards(item["amount"])}</td>
                  </tr>
                })}
              </tbody>
            </table>
            : <div>No Transactions Found</div>}
          <div>
            <h4>Add Transactions</h4>
            <h5>Only Transactions here </h5>
            <label>Date : </label><input type="date" name="date" value={transaction_.date} onChange={(e) => updateInput(e)}></input>
            <label>Amount :</label><input type="number" name="amount" value={transaction_.amount} onChange={(e) => update_input(e)}></input>
            <button onClick={() => btn_add_transaction()}>Add Transaction</button>
          </div>
        </Fragment>
      }


    </ div >
	);
}

export default App;
