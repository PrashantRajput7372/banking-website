// Data
const account1 = {
  owner: 'Prashant  Singh',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2024-06-01T23:36:17.929Z',
    '2024-06-03T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Jyoti Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-19T21:31:17.178Z',
    '2019-12-24T07:42:02.383Z',
    '2020-01-29T09:15:04.904Z',
    '2020-04-02T10:17:24.185Z',
    '2020-05-09T14:11:59.604Z',
    '2020-07-27T17:01:17.194Z',
    '2020-07-29T23:36:17.929Z',
    '2020-08-02T10:51:36.790Z',
  ],
};

const account3 = {
  owner: 'Pradeep k Singh',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-19T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-25T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-05T14:11:59.604Z',
    '2020-07-23T17:01:17.194Z',
    '2020-07-21T23:36:17.929Z',
    '2020-08-06T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Shyam Bahadur Singh',
  movements: [200000, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 4444,
  movementsDates: [
    '2019-11-19T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-25T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-05T14:11:59.604Z',
    '2020-07-23T17:01:17.194Z',
    '2020-07-21T23:36:17.929Z',
    '2020-08-06T10:51:36.790Z',
  ],
};

const accounts = [account1, account2, account3, account4];

//////////app
const renderSnipper = function () {
  const markup = ` <div class="spinner">
         <svg>
           <use href="icons.svg#icon-loader"></use>
         </svg>
       </div> `;
  containerMovements.textContent = '';
  containerMovements.insertAdjacentHTML('afterbegin', markup);
};

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    console.log(acc.username);
    return acc.username;
  });
};

createUserName(accounts);

// *********Timer Function***********
const logOutTimer = function () {
  let time = 60;
  const tick = function () {
    let min = String(Math.floor(time / 60)).padStart(2, 0);
    let sec = String(Math.floor(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    time--;
    if (time === -1) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.style.color = 'RED';
      labelWelcome.textContent = `Oop's TimeOut Please login again`;
    }
  };
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

//********* */ date function & calling
const formatDate = function (date) {
  const days = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const newD = new Date();
  const numberdayPassed = days(date, newD);

  if (numberdayPassed === 0) return `Today`;
  if (numberdayPassed === 1) return `Yesteday`;
  if (numberdayPassed >= 2 && numberdayPassed <= 7)
    return `${numberdayPassed} days ago`;

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

// *******display fucntion
const displayMovements = function (acc, state) {
  containerMovements.innerHTML = '';

  acc.movements.forEach(function (mov, i) {
    const Dates = new Date(acc.movementsDates[i]);

    const displayDate = formatDate(Dates);

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(mov)}</div>
   </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (a, m) {
    return a + m;
  }, 0);

  labelBalance.textContent = `${new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(acc.balance)}`;
  return acc.balance;
};

const displaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${new Intl.NumberFormat(`en-IN`, {
    style: `currency`,
    currency: `INR`,
  }).format(incomes)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${new Intl.NumberFormat(`en-IN`, {
    style: `currency`,
    currency: `INR`,
  }).format(out)}`;

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .reduce((arr, mov) => arr + mov, 0);

  labelSumInterest.textContent = `${new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format((intrest * acc.interestRate) / 100)}`;
};
// ;
const updateUI = function (acc) {
  displayMovements(acc);
  displayBalance(acc);
  displaySummary(acc);
  state = false;
};
let curentAcount, timer;
// **********Login Button ***************

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  if (timer) clearInterval(timer);
  timer = logOutTimer();
  curentAcount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (curentAcount?.pin == Number(inputLoginPin.value)) {
    labelWelcome.style.color = 'Green';
    labelWelcome.textContent = `Wellcome Back, MR ${
      curentAcount.owner.split(' ')[0]
    }🙏`;
    labelDate.textContent = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    updateUI(curentAcount);
    containerApp.style.opacity = 100;
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.style.color = 'RED';
    labelWelcome.textContent = `Incorrect Credentials`;

    alert`Please Enter a valid User name & Password`;
  }

  inputLoginUsername.value = inputLoginPin.value = '';
  btnLogin.blur();
});
// ***for transfering of money to other accounts

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferInput = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  const transfer = accounts.find(acc => acc.username === transferInput);
  inputTransferTo.value = inputTransferAmount.value = '';

  // to check parametes amount is more then zero and person is not sendind to same account and if the account exist on which we are transfering money

  if (
    transferAmount > 0 &&
    transfer &&
    transfer.username !== curentAcount.username &&
    curentAcount.balance >= transferAmount
  ) {
    // updating movements if every this is correct

    curentAcount.movements.push(-transferAmount);
    transfer.movements.push(transferAmount);
    curentAcount.movementsDates.push(new Date().toISOString());
    transfer.movementsDates.push(new Date().toISOString());

    // calling update methord again to reflect  transictions

    updateUI(curentAcount);
    console.log(
      `Balance is greater transfer is done of: ${transferAmount} to: ${transferInput}`
    );
    if (timer) clearInterval(timer);
    timer = logOutTimer();
  } else {
    alert(
      'Not a valid transfer Check user name or amount Must be greater than 0'
    );
    if (timer) clearInterval(timer);
    timer = logOutTimer();
  }
  console.log('btn was clicked');
});
// *****function for close btn for  closing account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === curentAcount.username &&
    Number(inputClosePin.value) === curentAcount.pin
  ) {
    const index = accounts.findIndex(
      // checking to index of current account to remove from array

      mov => mov.username === curentAcount.username
    );
    accounts.splice(index, 1);
    console.log(index);
    // removing account using splice method from accounts array
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Account Deleted!!!';
    labelWelcome.style.color = 'red';
  }
  inputCloseUsername.value = inputClosePin.value = '';

  console.log(accounts);
});

// ********LOan btns function
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  containerMovements.textContent = '';
  containerMovements.classList.add('loader');
  const loanAmount = Number(inputLoanAmount.value);
  if (loanAmount > 0) {
    // updating loan amount in movements

    curentAcount.movements.push(loanAmount);
    curentAcount.movementsDates.push(new Date().toISOString());
  }
  inputLoanAmount.value = '';
  // calling ui to sho show all new transaction
  if (timer) clearInterval(timer);
  timer = logOutTimer();
  32;
  setInterval(() => {
    console.log('I am intreval of one minute');
    containerMovements.classList.remove('loader');
    updateUI(curentAcount);
  }, 1000 * 30);
});
// sort butn function but it will be called in display movements
let state = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('shot was clicked');
  displayMovements(curentAcount, !state);
  console.log('shot was clicked');
  state = !state;
  console.log(state);
  if (state === true) {
    const shot = [];
    shot.movementsDates = curentAcount.movementsDates;
    shot.movements = curentAcount.movements.slice().sort((a, b) => a - b);

    console.log(shot);
    displayMovements(shot);
  } else {
    console.log('else is executed');
    displayMovements(curentAcount);
  }
});
//

/////////////////////////////////////////////////lectureconst accounts = [account1, account2, account3, account4];
let i = 1;

// console.log(accounts);

// const forDeposite = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(forDeposite);

// // const forWithdrawal = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(forWithdrawal);

// const display1Balance = function (mov) {
//   const balance = mov.reduce(function (acc, mv) {
//     return acc + mv;
//   }, 0);
//   // console.log(`₹${balance}`);
// };
// display1Balance(movements);
// const displaySummary1 = function (movments) {
//   const income = movments.filter(mov => {
//     if (mov > 0) {
//       return mov;
//     }
//   });
//   // return console.log(income);
//   const out = movments
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   // console.log(`${income} is income`);
// };

// displaySummary1(account1.movements);
// const m = [200, 450, [-400, 3000], -650, -130, 70, 1300, -840];
// const m2 = m.flatMap(mov => mov);
// console.log(`this is using flat map m2: ${m}`);

// console.log(m.flat());
// const someRes = function (acc) {
//   return acc > 70;
// };
// console.log(m2.some(someRes));

// const Index = m2.findIndex(someRes);
// console.log(Index);
// m2.splice(6, 1);
// console.log(m2);
// const Find2 = m2.every(someRes);
// console.log(Find2);

// const arr = Array.from({ length: 100 }, el =>
//   Math.floor(Math.random() * 6 + 1)
// );

// console.log(arr);
// console.log(`Any less then 0:${arr.some(mov => mov < 0)}`);
// console.log(`Any greater then 6:${arr.some(mov => mov <= 6)}`);

// console.log(arr.join('join'));
// ***********DATES************

// const now = new Date(2024, 0, 22, 23, 12, 20);
// console.log(now);
movementsDate = [
  '2019-11-23T02:31:17.178Z',
  '2019-12-27T07:42:02.383Z',
  '2020-01-03T09:15:04.904Z',
  '2020-04-05T10:17:24.185Z',
  '2020-05-07T14:11:59.604Z',
  '2020-07-29T17:01:17.194Z',
  '2020-07-25T23:36:17.929Z',
  '2020-08-08T10:51:36.790Z',
];
// const transactionDAte = function (acc) {
//   acc.forEach(mov => {
//     const time = new Date(mov);
//     const date = time.getDate();
//     const month = time.getMonth('');
//     const year = time.getFullYear();

//     console.log(`${date}/${month + 1}/${year}`);
//   });
// };
// // transactionDAte(movementsDate);
// const date = now.getDate();
// const month = now.getMonth('');
// const year = now.getFullYear();

// console.log(`${date}/${month + 1}/${year}`);

// const tray = [];
// tray.a = [1, 3, 4];
// tray.b = [2, 3, 4];

// console.log(tray);

setInterval(() => {
  const now = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // day: '2-digit',
    // month: '2-digit',
    // year: 'numeric',
    // weekday: 'long',
  };
  const IntrNum = new Intl.DateTimeFormat('en-in', option).format(now);
  // console.log(IntrNum);
}, 1000 * 60);
// console.log(`Waiting......`);

// const renderSpiner = function (){
//   <div class="loader">

//       <p>Loading</p>
//     </div>
// }
