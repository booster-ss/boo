document.addEventListener("DOMContentLoaded", () => {
  const orderButtons = document.querySelectorAll(".btn-order");
  orderButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Order form will open here (connect backend later).");
    });
  });
});
