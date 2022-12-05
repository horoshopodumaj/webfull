## Web приложение с аутентификацией и регистрацией пользователей.
Приложение реализовано с помощью технологий: 
* React
* Node.js
* Express
* MongoDB 
Неаутентифицированные пользователи не имеют доступа к управлению пользователями (доступ только к форме регистрации или форме аутентификации).
Аутентифицированные пользователи видят таблицу "пользователи" (идентификатор, именем, мылом, датой регистрации, датой последнего логина, статусом) с пользователями.
Таблица левой колонкой содержит чек-боксы для множественного выделения, в заголовке колонки чек-бокс "выделить все/снять выделение". Над таблицей тулбар с действиями: Block, Unblock, Delete. 

Пользователь может удалить или заблокировать себя — при этом сразу должен быть разлогинен. 
Если кто-то другой блокирует или удаляет пользователя, то при любом следующем действии пользователь переправляется на страницу логина.
При регистрации должна быть возможность использовать любой пароль, даже из одного символа.
Заблокированный пользователь не может войти, удаленный может заново зарегистрироваться.

Два репозитория, используемых при деплое приложения:
https://github.com/horoshopodumaj/mern-app-client

https://github.com/horoshopodumaj/mern-app-backend
---

## Web application with user authentication and registration.
The application is implemented using technologies: 
* React
* Node.js
* Express
* MongoDB 
Unauthenticated users do not have access to user management (access only to the registration form or authentication form).
Authenticated users see the "users" table (ID, name, soap, registration date, last login date, status) with users.
The table in the left column contains checkboxes for multiple selection, in the column header there is a check box "select all/deselect". Above the toolbar table with actions: Block, Unblock, Delete. 

The user can delete or block himself — at the same time, he must be logged out immediately. 
If someone else blocks or deletes the user, then at any next action the user is redirected to the login page.
When registering, it should be possible to use any password, even from a single character.
The blocked user cannot log in, the deleted user can re-register.

Two repositories used when the application is deployed:
https://github.com/horoshopodumaj/mern-app-client

https://github.com/horoshopodumaj/mern-app-backend
