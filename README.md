1. Для запуска тестов с конфигурацией для мобильных устройств:

   `npx cypress run --browser chrome --headed --config-file cypress.mobile.js`

2. Тесты [авторизации с пустыми полями](cypress/e2e/login.cy.js) падают при запуске на браузере Firefox.
   Ожидаемое и фактическое сообщение об ошибке различаются, в FireFox: "Пожалуйста, заполните это поле." (вместо "Заполните это поле.")
