const db = new Dexie('DebtDB');
db.version(1).stores({
  debts: '++id,customerId,name,phone,amount,date,time,note,status'
});

const unpaidList = document.getElementById('unpaidList');

async function showUnpaid() {
  const debts = await db.debts.where('status').equals('unpaid').toArray();
  unpaidList.innerHTML = '';

  const debtsByCustomer = debts.reduce((acc, d) => {
    if(!acc[d.name]) acc[d.name] = [];
    acc[d.name].push(d);
    return acc;
  }, {});

  for(const customer in debtsByCustomer){
    const customerDebts = debtsByCustomer[customer];
    let total = customerDebts.reduce((sum,d)=>sum+d.amount,0);
    const div = document.createElement('div');
    div.innerHTML = `<h3>${customer} - Total: $${total}</h3>`;
    customerDebts.forEach(d => {
      const item = document.createElement('div');
      item.className = 'debt-item';
      item.innerHTML = `• $${d.amount} - ${d.date} ${d.time} - ${d.phone} 
        <button onclick="markPaid(${d.id})">Mark Paid</button>`;
      div.appendChild(item);
    });
    unpaidList.appendChild(div);
  }
}

window.markPaid = async function(id) {
  await db.debts.update(id, {status: 'paid'});
  showUnpaid();
  alert('Debt marked as paid');
}

showUnpaid();
