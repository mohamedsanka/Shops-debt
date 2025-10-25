
const db = new Dexie('DebtDB');
db.version(1).stores({
  debts: '++id,customerId,name,phone,amount,date,time,note,status'
});

const reminderList = document.getElementById('reminderList');

(async function showReminders() {
  const debts = await db.debts.where('status').equals('unpaid').toArray();
  reminderList.innerHTML = '';
  const today = new Date();

  debts.forEach(d => {
    const due = new Date(d.date + 'T' + d.time);
    const overdue = due < today;
    const div = document.createElement('div');
    div.className = 'debt-item';
    div.style.background = overdue ? '#EF5330' : '#EF5350';
    div.style.padding = '15px';
    div.innerHTML = `${d.name} - $${d.amount} - ${d.date} ${d.time} - ${overdue ? 'OVERDUE':'Upcoming'}`;
    reminderList.appendChild(div);
  });
})();
