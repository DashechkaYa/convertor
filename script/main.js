"use strict";

 const RATE = 37.7302;
 const cachedRate = localStorage.getItem('rate') || RATE;

const getUSDUARate = async function getUSDUARate() {
 try {
  const res = await fetch('https://api.monobank.ua/bank/currency');
  const data = await res.json();
  const USDRate = data.find(item => item.currencyCodeA === 840);
  const rate = USDRate?.rateSell;
  if (rate) {
    localStorage.setItem('rate', rate)
  }
  return rate || cachedRate;
 } catch {
  return cachedRate;
 }
};


const round = function round(num) {
return Number(num).toFixed(2);
};

const isNumber = function isNumber(num) {
return !Number.isNaN(Number(num));                        // нащо нам перевірка на число якщо у нас інпут тип = число; і поясніть ще раз будь ласка цю перевірку (нащо нам 2 рази писати Number - саме в першому випадку нащо)
};

document.addEventListener('DOMContentLoaded', async () => {
  const $arrowsSwitch = document.getElementById('arrows-switch');
  const $form = document.getElementById('form');
  const $inputUSD = $form.usd;
  const $inputUAH = $form.uah;
  const $textUSD = document.getElementById('text-USD');
  const $textUAH = document.getElementById('text-UAH');
  const $USDBlock = document.getElementById('USD-block');
  const $UAHBlock = document.getElementById('UAH-block');

  const setInputValues = function setInputValues({usd, uah} = {}) {
   if (isNumber(usd)) $inputUSD.value = round(usd);
   if (isNumber(uah)) $inputUAH.value = round(uah);
  };

  const rateData = await getUSDUARate();                       // чи має значення якби це записано було перед ф setInputValues

  // $inputUSD.value = 1;
  // $inputUAH.value = round(1 * rateData);
  const USDinUAH = round($inputUSD.value / $inputUAH.value);

  setInputValues({usd: 1, uah: 1 * rateData});

  $textUSD.innerHTML = `1 USD = ${$inputUAH.value} UAH`;          // можливо це винести кудись треба, наприклад у функцію
  $textUAH.innerHTML = `1 UAH = ${USDinUAH} USD`;

  $inputUSD.addEventListener('input', (e) => {
    const {value} = e.target;
    setInputValues({uah: value * rateData})
    // $inputUAH.value = round(value * rateData);                // навіщо ми це замінили на строку вище - навіщо взагалі обєкт передавати в ф?
  });

  $inputUAH.addEventListener('input', (e) => {
    const {value} = e.target;
    setInputValues({usd: value / rateData})
    // $inputUSD.value = round(value / rateData);
  });

  $arrowsSwitch.addEventListener('click', () => {
    // [$inputUAH.value, $inputUSD.value] = [$inputUSD.value, $inputUAH.value];
    // $inputUAH.value = round($inputUAH.value * rateData);
    // $inputUSD.value = round($inputUSD.value * rateData);                     тут деструктуризація походу не до місця 
    
    setInputValues({
      usd: $inputUAH.value,
      uah: $inputUAH.value * rateData,
    })
    // $inputUSD.value = $inputUAH.value;
    // $inputUAH.value = round($inputUAH.value * rateData);

    if($form.firstElementChild === $USDBlock) {                    // зробила переміщення блоків місцями; як інакше міняти місцями флажки і підписи з мовою
      $form.prepend($UAHBlock);
      $form.append($USDBlock);
    } else {
      $form.prepend($USDBlock);
      $form.append($UAHBlock);
    }
  });
});