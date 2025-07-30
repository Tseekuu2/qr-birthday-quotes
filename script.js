const video = document.getElementById('qr-video');
const qrResult = document.getElementById('qr-result');
const birthdaySection = document.getElementById('birthday-section');
const generateBtn = document.getElementById('generate');
const quoteSection = document.getElementById('quote-section');
const quoteDisplay = document.getElementById('quote');

let scanned = false;

navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => {
    video.srcObject = stream;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA && !scanned) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          qrResult.textContent = `QR уншсан: ${code.data}`;
          scanned = true;
          birthdaySection.style.display = 'block';
        }
      }
      requestAnimationFrame(scan);
    };
    scan();
  });

generateBtn.addEventListener('click', () => {
  const birthday = document.getElementById('birthday').value;
  if (!birthday) return alert("Төрсөн өдрөө оруулна уу");

  fetch('quotes.json')
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      quoteDisplay.textContent = data[randomIndex];
      quoteSection.style.display = 'block';
    });
});
