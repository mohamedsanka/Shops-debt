let deferredPrompt;
const installBtn = document.getElementById('install-btn');

// Listen for the install event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent the automatic prompt
  deferredPrompt = e; // Save the event for later
  installBtn.style.display = 'block'; // Show the button
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return; // Exit if event not saved
  deferredPrompt.prompt(); // Show install prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log('User choice:', outcome); // "accepted" or "dismissed"
  deferredPrompt = null; // Clear it
  installBtn.style.display = 'none'; // Optional: hide button
});


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
  
