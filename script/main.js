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
return !Number.isNaN(Number(num));
};

document.addEventListener('DOMContentLoaded', async () => {
  const rateData = await getUSDUARate();  

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

  setInputValues({usd: 1, uah: 1 * rateData});

  const USDinUAH = round($inputUSD.value / $inputUAH.value);

  $textUSD.innerHTML = `1 USD = ${$inputUAH.value} UAH`;
  $textUAH.innerHTML = `1 UAH = ${USDinUAH} USD`;

  $inputUSD.addEventListener('input', (e) => {
    const {value} = e.target;
    setInputValues({uah: value * rateData})
  });

  $inputUAH.addEventListener('input', (e) => {
    const {value} = e.target;
    setInputValues({usd: value / rateData})
  });

  $arrowsSwitch.addEventListener('click', () => {
    setInputValues({
      usd: $inputUAH.value,
      uah: $inputUAH.value * rateData,
    })

    if($form.firstElementChild === $USDBlock) {
      $form.prepend($UAHBlock);
      $form.append($USDBlock);
    } else {
      $form.prepend($USDBlock);
      $form.append($UAHBlock);
    }
  });
});