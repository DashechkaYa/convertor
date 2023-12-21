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

// getUSDUARate()
// .then(USDRate => console.log(USDRate));

const round = function round(num) {
return Number(num).toFixed(2);
};

document.addEventListener('DOMContentLoaded', async () => {
  const $arrowsSwitch = document.getElementById('arrows-switch');
  const $form = document.getElementById('form');
  const $inputUSD = $form.usd;
  const $inputUAH = $form.uah;

  const rateData = await getUSDUARate();
  console.log(rateData);

  $inputUSD.value = 1;
  $inputUAH.value = round(1 * rateData)

  $inputUSD.addEventListener('input', (e) => {
    const {value} = e.target;
    $inputUAH.value = round(value * rateData);
  });

  $inputUAH.addEventListener('input', (e) => {
    const {value} = e.target;
    $inputUSD.value = round(value / rateData);

    console.log($inputUAH.value);
  });

  $arrowsSwitch.addEventListener('click', () => {
    [$inputUAH.value, $inputUSD.value] = [$inputUSD.value, $inputUAH.value];
  });
});