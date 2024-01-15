# Конвертер валют

1. **Технології:**
  - В проекті використано чистий JavaScript (ES6+) для логіки конвертації та взаємодії з DOM.
  - Використано асинхронні запити з використанням fetch для отримання актуального курсу валют з API Monobank.
  - Зберігання кешованого курсу валют в локальному сховищі (localStorage) для покращення швидкодії та доступності інформації при повторних відвідуваннях сторінки.
  - Для зручності розробки та оптимізації використано Parcel/
   
2. **Основний код:**
  - Визначено константу RATE яка представляє стартовий курс USD-UAH.
  - Використано функцію getUSDUARate для асинхронного отримання та збереження курсу валют з API Monobank.
  - Реалізовано функції round та isNumber для форматування чисел та перевірки на число відповідно.
  - Динамічно оновлюються значення полів вводу та текстових блоків під час введення користувачем суми.
  - Реалізовано можливість зміни порядку введення валют та відображення еквівалентних курсів.

3. **Запуск проекту:**
  - Клонуйте репозиторій, встановіть залежності та запустіть проект через Parcel, використовуючи наступні команди:
    git clone https://github.com/dashechkaya/convertor.git
    npm install
    npm start
  - Відкрийте веб-браузер і перейдіть за посиланням: http://localhost:1234 для перегляду та розробки проекту.