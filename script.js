  const userIdInput = document.getElementById('user-id');
  const productCards = document.querySelectorAll('.product-card');
  const quantityInput = document.getElementById('quantity');
  const increaseBtn = document.getElementById('increase');
  const decreaseBtn = document.getElementById('decrease');

  // Aktifkan produk jika ID sudah diisi
  userIdInput.addEventListener('input', () => {
    if (userIdInput.value.trim() !== '') {
      productCards.forEach(card => {
        card.dataset.locked = "false";
        card.classList.remove('disabled');
      });
    } else {
      productCards.forEach(card => {
        card.dataset.locked = "true";
        card.classList.add('disabled');
        card.classList.remove('selected');
      });
    }
  });

  // Fungsi saat klik produk
  function selectProduct(el) {
    if (el.dataset.locked === "true") {
      alert("Masukkan ID Free Fire terlebih dahulu.");
      return;
    }
    productCards.forEach(card => card.classList.remove('selected'));
    el.classList.add('selected');
  }

  // Tambah jumlah
  increaseBtn.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  // Kurangi jumlah
  decreaseBtn.addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });

  // Pesan
  function handleOrder() {
    alert("Pesanan dikirim!");
  }

  // Biar fungsi `selectProduct()` dan `handleOrder()` bisa dipanggil dari HTML
  window.selectProduct = selectProduct;
  window.handleOrder = handleOrder;

  const walletOptions = document.querySelectorAll('.wallet-option');
  const pulsaOptions = document.querySelectorAll('.pulsaa-option');
  let selectedWallet = null;
  let selectedPulsa = null;

  walletOptions.forEach(option => {
    option.addEventListener('click', () => {
      walletOptions.forEach(opt => opt.classList.remove('selected'));
      pulsaOptions.forEach(p => p.classList.remove('selected')); // reset pulsa jika wallet dipilih
      option.classList.add('selected');
      selectedWallet = option.dataset.wallet;
      selectedPulsa = null;
      console.log("E-wallet dipilih:", selectedWallet);
    });
  });

  pulsaOptions.forEach(option => {
    option.addEventListener('click', () => {
      pulsaOptions.forEach(opt => opt.classList.remove('selected'));
      walletOptions.forEach(w => w.classList.remove('selected')); // reset wallet jika pulsa dipilih
      option.classList.add('selected');
      selectedPulsa = option.dataset.pulsa;
      selectedWallet = null;
      console.log("Pulsa dipilih:", selectedPulsa);
    });
  });

  // Akses nilai terpilih
  window.getSelectedPayment = () => selectedWallet || selectedPulsa;

  function handleOrder() {
  const userId = userIdInput.value.trim();
  const selectedProduct = document.querySelector('.product-card.selected');
  const quantity = quantityInput.value;
  const contactInput = document.querySelector('.wa-input input');
  const contact = contactInput.value.trim();
  const payment = getSelectedPayment();

  if (!userId || !selectedProduct || !contact || !payment) {
    alert("Lengkapi semua data sebelum memesan.");
    return;
  }

  const productText = selectedProduct.querySelector('p').innerText;
  const [productName, hargaText] = productText.split('\n');
  const harga = parseInt(hargaText.replace(/[^\d]/g, ''));

  const orderData = {
    userId,
    productName,
    harga,
    quantity: parseInt(quantity),
    total: harga * quantity,
    payment,
    contact
  };

  localStorage.setItem('orderData', JSON.stringify(orderData));
  window.location.href = "bayar.html";
}
 
userIdInput.addEventListener('input', () => {
  // Hapus semua karakter kecuali angka
  userIdInput.value = userIdInput.value.replace(/\D/g, '');

  if (userIdInput.value.trim() !== '') {
    productCards.forEach(card => {
      card.dataset.locked = "false";
      card.classList.remove('disabled');
    });
  } else {
    productCards.forEach(card => {
      card.dataset.locked = "true";
      card.classList.add('disabled');
      card.classList.remove('selected');
    });
  }
});
