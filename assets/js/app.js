document.addEventListener("DOMContentLoaded", () => {

  // ====== SPA Sidebar Navigation ======
  const sections = document.querySelectorAll(".spa-section");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  sidebarLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.dataset.target;

      sections.forEach(sec => {
        sec.style.display = (sec.id === targetId) ? "block" : "none";
      });
    });
  });

  // ====== Dashboard dynamic numbers ======
  let balance = 2500; // Naira default
  let activeOrders = 3;
  let completedOrders = 18;
  const bonusPercent = 10; // 10% bonus on recharge

  const balanceCard = document.getElementById("balance-card");
  const activeOrdersCard = document.getElementById("active-orders-card");
  const completedOrdersCard = document.getElementById("completed-orders-card");
  const walletBalance = document.getElementById("wallet-balance");
  const ordersList = document.getElementById("orders-list");

  function updateDashboard() {
    balanceCard.innerText = `💰 Balance: ${formatCurrency(balance)}`;
    walletBalance.innerText = `Current Balance: ${formatCurrency(balance)}`;
    activeOrdersCard.innerText = `🟢 Active Orders: ${activeOrders}`;
    completedOrdersCard.innerText = `✅ Completed Orders: ${completedOrders}`;
  }

  // ====== Currency Conversion ======
  const currencySelect = document.getElementById("currency-select");
  let currency = "NGN";

  const rates = { NGN: 1, USD: 0.0026, EUR: 0.0024, USDT: 0.0026 };

  function formatCurrency(amount){
    switch(currency){
      case "NGN": return `₦${Math.round(amount)}`;
      case "USD": return `$${(amount*rates.USD).toFixed(2)}`;
      case "EUR": return `€${(amount*rates.EUR).toFixed(2)}`;
      case "USDT": return `${(amount*rates.USDT).toFixed(2)} USDT`;
      default: return amount;
    }
  }

  currencySelect.addEventListener("change", e => {
    currency = e.target.value;
    updateDashboard();
  });

  updateDashboard();

  // ====== Order Popup Logic ======
  const orderButtons = document.querySelectorAll(".btn-order");
  const popup = document.getElementById("order-popup");
  const orderServiceName = document.getElementById("order-service-name");
  const orderServicePrice = document.getElementById("order-service-price");
  const orderQuantity = document.getElementById("order-quantity");
  const confirmBtn = document.getElementById("confirm-order-btn");
  const cancelBtn = document.getElementById("cancel-order-btn");

  const servicePrices = {
    "Instagram Likes": { unit: 10000, price: 500 },
    "Instagram Followers": { unit: 1000, price: 100 },
    "Shares": { unit: 10000, price: 500 }
  };

  let currentService = null;
  let currentUnit = 0;
  let currentPricePerUnit = 0;

  orderButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      currentService = card.querySelector("h3").innerText;

      if(servicePrices[currentService]){
        currentUnit = servicePrices[currentService].unit;
        currentPricePerUnit = servicePrices[currentService].price;
      }

      orderServiceName.innerText = currentService;
      orderServicePrice.innerText = `₦${currentPricePerUnit} per ${currentUnit.toLocaleString()}`;
      orderQuantity.value = '';
      popup.style.display = "flex";
    });
  });

  cancelBtn.addEventListener("click", () => popup.style.display = "none");

  confirmBtn.addEventListener("click", () => {
    const qty = parseInt(orderQuantity.value);
    if(!qty || qty <= 0) return alert("Enter a valid quantity");

    const units = qty / currentUnit;
    let totalPrice = units * currentPricePerUnit;
    if(totalPrice < currentPricePerUnit) totalPrice = currentPricePerUnit;

    balance -= totalPrice;
    activeOrders += 1;
    completedOrders += 1;
    updateDashboard();

    // Add order to Orders section
    const orderItem = document.createElement("p");
    orderItem.innerText = `${qty.toLocaleString()} units of ${currentService} - ${formatCurrency(totalPrice)}`;
    ordersList.appendChild(orderItem);

    popup.style.display = "none";
  });

  // ====== Payment Popup Logic ======
  const addFundsBtn = document.getElementById("add-funds-btn");
  const paymentPopup = document.getElementById("payment-popup");
  const fundsAmount = document.getElementById("funds-amount");
  const paymentMethod = document.getElementById("payment-method");
  const confirmFundsBtn = document.getElementById("confirm-funds-btn");
  const cancelFundsBtn = document.getElementById("cancel-funds-btn");

  addFundsBtn.addEventListener("click", () => {
    fundsAmount.value = '';
    paymentPopup.style.display = "flex";
  });

  cancelFundsBtn.addEventListener("click", () => paymentPopup.style.display = "none");

  confirmFundsBtn.addEventListener("click", () => {
    const amount = parseFloat(fundsAmount.value);
    if(!amount || amount <= 0) return alert("Enter a valid amount");

    // Apply bonus
    const bonus = amount * (bonusPercent / 100);
    const totalAdded = amount + bonus;

    balance += totalAdded;
    updateDashboard();
    alert(`You added ${formatCurrency(amount)} via ${paymentMethod.value}. Bonus applied: ${formatCurrency(bonus)}\nTotal balance increased by ${formatCurrency(totalAdded)}`);

    paymentPopup.style.display = "none";
  });

});
