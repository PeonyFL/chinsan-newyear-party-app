// ดึง Element ต่างๆ มาเก็บในตัวแปรเพื่อการใช้งานที่ง่ายขึ้น
const registrationForm = document.getElementById('registrationForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const backToFormBtn = document.getElementById('backToFormBtn');

// Event Listener สำหรับฟอร์มลงทะเบียน
registrationForm.addEventListener('submit', function(event) {
    // *** บรรทัดนี้สำคัญที่สุด ***
    event.preventDefault(); 
    console.log("ฟอร์มถูก Submit แต่ถูก preventDefault() หยุดไว้แล้ว");

    // ซ่อนฟอร์ม
    registrationForm.classList.add('hidden'); 
    
    // แสดงผลลัพธ์ (แบบจำลอง)
    resultDiv.classList.remove('hidden');
    document.getElementById('resultMessage').innerText = "ทดสอบสำเร็จ! หน้าเว็บไม่รีโหลด";
    
    // แสดง QR Code จำลอง
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = '<h2>นี่คือหน้าแสดงผล QR Code</h2>';

    console.log("แสดงหน้าผลลัพธ์เรียบร้อย");
});

// Event Listener สำหรับปุ่ม "ลงทะเบียนอีกครั้ง"
backToFormBtn.addEventListener('click', function() {
    resultDiv.classList.add('hidden');
    registrationForm.classList.remove('hidden');
    registrationForm.reset();
});