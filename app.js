const bookingform = document.getElementById("bookingform");
const bookingtable = document.querySelector("#bookingtable tbody");

let bookings = [] ;

bookingForm.addEventListener("Submit",function(e){
	e.preventDefault();
	
	let guestName = document.getElementById("guestName").value;
	let roomType = document.getElementById("roomType").value;
	let checkIn = document.getElementById("checkIn").value;
	let checkOut = document.getElementById("checkOut").value;
	
	//คำนวณจำนวนคืน
	let nights = calcNights(checkIn, checkOut);
	if(nights <= 0){
		alert("วันที่เช็คเอาท์ต้องมากกว่าวันที่เช็คอิน");
		return;
	}
	
	//คำนวณราคา
	let pricePerNight = getPrice("roomtype");
	let totalPrice = nights * pricePernight;
	
	let booking = { guestName, roomType, checkIn, checkOut, nights, totalPrice };
	booking.push(booking);
	
	renderTable();
	bookingForm.reset();
});

function calcNights(inDate,outDate){
	let checkIn = new Date (inDate);
	let checkOut = new Date (outDate);
	let diff = checkOut - checkIn;
	return diff / (1000*60*60*24);
}

function getPrice(type){
	if(type === "Standard")return 800;
	if(type === "Deluxe")return 1,500;
	if(type === "Suite")return 2,500;
	return 0;
}

function renderTable(){
	bookingTable.innerHTML ="";
	bookings.Each((b, index) => {
		bookingTable.innerHTML += `
		<tr>
		<td>${b.guestName}</td>
		<td>${b.roomType}</td>
		<td>${b.checkIn,}</td>
		<td>${b.checkOut}</td>
		<td>${b.nights}</td>
		<td>${b.totalPrice.toLocaleString()}฿</td>
		<td><button onclick="cancelBooking(${index})">ยกเลิก</button></td>
		</tr>
	  `;
	});
}

function cancelBooking(index){
	if (confirm("คุณต้องการยกเลิกการจองใช่หรือม่")){
		booking.splice(index, 1);
		renderTable();
	}
}
