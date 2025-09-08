const bookingForm = document.getElementById("bookingForm");
const bookingTable = document.querySelector("#bookingTable tbody");

let bookings = [];

bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let guestName = document.getElementById("guestName").value;
  let roomTypeSelect = document.getElementById("roomType");
  let roomType = roomTypeSelect.value;
  let checkIn = document.getElementById("checkIn").value;
  let checkOut = document.getElementById("checkOut").value;

  // คำนวณจำนวนคืน
  let nights = calcNights(checkIn, checkOut);
  if (nights <= 0) {
    alert("วันที่เช็คเอาท์ต้องมากกว่าวันที่เช็คอิน");
    return;
  }

  // คำนวณราคาต่อคืนจาก data-price
  let pricePerNight = parseInt(roomTypeSelect.options[roomTypeSelect.selectedIndex].dataset.price);
  let totalPrice = nights * pricePerNight;

  let booking = { guestName, roomType, checkIn, checkOut, nights, totalPrice };
  bookings.push(booking); // ← ชื่อ array ถูกต้องคือ bookings

  renderTable();
  bookingForm.reset();
});

function calcNights(inDate, outDate) {
  let checkIn = new Date(inDate);
  let checkOut = new Date(outDate);
  let diff = checkOut - checkIn;
  return diff / (1000 * 60 * 60 * 24);
}

function renderTable() {
  bookingTable.innerHTML = "";

  bookings.forEach((b, index) => {
    bookingTable.innerHTML += `
      <tr>
        <td>${b.guestName}</td>
        <td>${capitalize(b.roomType)}</td>
        <td>${b.checkIn}</td>
        <td>${b.checkOut}</td>
        <td>${b.nights}</td>
        <td>${b.totalPrice.toLocaleString()}฿</td>
        <td><button onclick="cancelBooking(${index})">ยกเลิก</button></td>
      </tr>
    `;
  });
}

function cancelBooking(index) {
  if (confirm("คุณต้องการยกเลิกการจองใช่หรือไม่?")) {
    bookings.splice(index, 1);
    renderTable();
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
