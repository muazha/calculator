document.addEventListener("DOMContentLoaded", function() {
  let display = document.getElementById('taitl');
  let isZero = true; // متغير لتتبع ما إذا كانت القيمة الافتراضية هي صفر

  function updateDisplay(value) {
    // إضافة النقطة فقط إذا لم تكن موجودة بالفعل في النص
    if (isZero) {
      display.textContent = value;
      isZero = false; // بعد النقر، القيمة لم تعد صفر
    } else if (value === '.' && !display.textContent.includes('.') && !/[+\-*/]$/.test(display.textContent)) {
      display.textContent += value; // إضافة النقطة فقط إذا لم تكن موجودة
    } else {
      display.textContent += value;
    }
  }

  function calculate() {
    try {
      display.textContent = eval(display.textContent) || "0";
      isZero = false; // بعد الحساب، القيمة لم تعد صفر
    } catch (e) {
      display.textContent = "Error";
      isZero = true; // إعادة تعيين القيمة إلى صفر بعد الخطأ
    }
  }

  function clearDisplay() {
    display.textContent = "0";
    isZero = true; // إعادة تعيين القيمة إلى صفر
  }

  function deleteLastChar() {
    if (display.textContent.length > 1) {
      display.textContent = display.textContent.slice(0, -1);
    } else {
      display.textContent = "0";
      isZero = true; // إعادة تعيين القيمة إلى صفر
    }
  }

  // تعيين مستمعين للأحداث للأزرار الرقمية بما في ذلك النقطة
  document.querySelectorAll('.nj button[id]').forEach(button => {
    button.addEventListener('click', function() {
      updateDisplay(button.textContent.trim());
    });
  });

  // تعيين مستمعين للأحداث للأزرار العملية
  document.querySelectorAll('.bck').forEach(button => {
    let buttonText = button.textContent.trim();
    if (buttonText === '÷') {
      button.addEventListener('click', function() {
        updateDisplay('/');
      });
    } else if (buttonText === '×') {
      button.addEventListener('click', function() {
        updateDisplay('*');
      });
    } else if (buttonText === '−') {
      button.addEventListener('click', function() {
        updateDisplay('-');
      });
    } else if (buttonText === '+') {
      button.addEventListener('click', function() {
        updateDisplay('+');
      });
    } else if (buttonText === '=') {
      button.addEventListener('click', calculate);
    } else if (buttonText === 'c') {
      button.addEventListener('click', clearDisplay);
    } else if (buttonText === '←') {
      button.addEventListener('click', deleteLastChar);
    }
  });

  // تعيين مستمعين للأحداث لزر النقطة
  document.querySelector('#a\\.').addEventListener('click', function() {
    updateDisplay('');
  });
});
