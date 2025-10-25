


const loginPopup = document.getElementById('login-popup');
const mainContent = document.getElementById('main-content');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

// Example credentials
const validName = "Sanka";
const validPassword = "1234";

// Check if user is already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
  loginPopup.style.display = 'none';
  mainContent.style.display = 'block';
}

// Login button click
loginBtn.addEventListener('click', () => {
  const name = document.getElementById('login-name').value;
  const password = document.getElementById('login-password').value;

  if (name === validName && password === validPassword) {
    localStorage.setItem('isLoggedIn', 'true'); // remember login
    loginPopup.style.display = 'none';
    mainContent.style.display = 'block';
  } else {
    loginError.style.display = 'block';
  }
});

// Optional: Add a logout function
function logout() {
  localStorage.removeItem('isLoggedIn');
  loginPopup.style.display = 'flex';
  mainContent.style.display = 'none';
}


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
  
