
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
  
  // Initialize Dexie database
  const db = new Dexie('DebtDB');
  db.version(1).stores({
    debts: '++id,customerId,name,phone,amount,date,time,note,status'
  });
  
  const form = document.getElementById('debtForm');
  
  form.addEventListener('submit', async e => {
    e.preventDefault(); // prevent page reload
  
    const debt = {
      customerId: Date.now(),
      name: form.name.value,
      phone: form.phone.value,
      amount: parseFloat(form.amount.value),
      date: form.date.value,
      time: form.time.value,
      note: form.note.value,
      status: 'unpaid'
    };
  
   
      await db.debts.add(debt); // store in IndexedDB
      alert(`Debt saved for ${debt.name} - $${debt.amount} due on ${debt.date} ${debt.time}`);
      form.reset();

     
      
    });
  
