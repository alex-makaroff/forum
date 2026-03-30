# План

1) .gitignore
2) Добавляем .claude
3) /init
4) Закидываем папку `deploy` 
   В папке:
   - скрипт запуска сервиса systemd deploy/srv.cjs
   - NGINX конфиг в deploy/NGINX/sites-enabled
   - конфиг deploy/config.example.yml -> deploy/config.yml
   
   - правим deploy/config.example.yml (email)
   - переименовываем deploy/NGINX/sites-enabled/amak.site.conf -> deploy/NGINX/sites-enabled/forum.amak.site.conf
5) Закидываем скрипт обновления `update.cjs`
6) Закидываем .envrc
7) Добиваемся запуска локально

```prompt
Добейся запуска этого сервера и отображения страницы
```

```prompt
Откуда взялся 5000 порт. Должен браться порт из .env 

```

```prompt
Вот инструкция по установке этого сервиса на удаленном сервере
SETUP-TIMEWEB.md
Но там не хватает сведений о том, как настроить NGINX.
Предварительный конфиг - deploy/NGINX/sites-enabled/forum.amak.site.conf
Его надо поментить на сервер в папку /etc/nginx/sites-enabled
По поводу сертификата - ранее было выполнено то, что описано в файле deploy/NGINX/Продление-ssl-сертификата-certbor-ssl-letsencrypt.md

Твоя задача:
1) Установить проект на удаленном серверер в папку /opt/node/forum и добиться его запуска. Сервис должен работать на порту 9013 
2) Добиться доступности сайта по адресу https://forum.amak.site (DNS прописан). Для этго может потребоваться выполнять certbot, а может и нет, потому что сертификат выпущен wildcat. 
4) Установить сервис через systemd
4) Адаптировать update.cjs под этот проект. Он должен 
   проверять обновление
   переустанавливать зависимости npm ci, 
   собирать проект 
   и перезапускать сервис.

5) добавить в cron запись 
   *       *       *       *       *       /root/.nvm/versions/node/v22.17.1/bin/node /opt/node/forum/update.cjs >/dev/null 2>&1 
6) Добавить в SETUP-TIMEWEB.md те этапы настройки и запуска, котрые сейчас там отсутствуют. 
   Так, чтобы для другого аналогичного проекта можно было скормить его Claude Codeи он все сам сделает
```
# Результат:

```text
Все задачи выполнены. Итого:                       
                                                              
  1. Проект развёрнут на /opt/node/forum, собран, работает на порту 9013                                                                                                                                                            
  2. https://forum.amak.site — доступен (NGINX + wildcard SSL *.amak.site, действителен до 17.06.2026)
  3. Systemd-сервис rest-express установлен и запущен                                                                                                                                                                               
  4. update.cjs адаптирован (исправлено сообщение сборки)         
  5. Cron добавлен — update.cjs запускается каждую минуту                                                                                                                                                                           
  6. SETUP-TIMEWEB.md дополнен секциями: NGINX, SSL, cron, проверка доступности 
```
