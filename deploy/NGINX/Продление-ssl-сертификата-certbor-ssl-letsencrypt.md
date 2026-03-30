https://certbot.eff.org/
https://www.webhi.com/how-to/generate-lets-encrypt-wildcard-certificates-nginx/


# Обновление сертификатов

```shell
sudo certbot certonly --manual \
--preferred-challenges=dns --server https://acme-v02.api.letsencrypt.org/directory \
--email time-gold@bazilio.ru --agree-tos -d *.amak.site
```

Получаем такой текст:

```text
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for *.amak.site

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name:

_acme-challenge.amak.site.

with the following value:

9yNddssrLZM9Ej4zvDe1EGAFIyxyDg7oXVwZBNdyuCA

Before continuing, verify the TXT record has been deployed. Depending on the DNS
provider, this may take some time, from a few seconds to multiple minutes. You can
check if it has finished deploying with aid of online tools, such as the Google
Admin Toolbox: https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.amak.site.
Look for one or more bolded line(s) below the line ';ANSWER'. It should show the
value(s) you've just added.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue

```

Необходимо зайти на 1GB (Редактор DNS зон -> amak.site) 
и прописать в зону предложенный токен. 

```text
_acme-challenge.amak.site. TXT 9yNddssrLZM9Ej4zvDe1EGAFIyxyDg7oXVwZBNdyuCA
```


(сначала удаляем старое значение, потом добавляем новое значение)

**Подождать 30 мин.**  Чтобы изменения распространились.  
Проверить можно тут:  
https://mxtoolbox.com/SuperTool.aspx?abt_id=AB-631A&abt_var=Control&run=toolpage&action=txt%3a_acme-challenge.amak.site

И только после этого нажать `Enter`, продолжив команду.


```text
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/amak.site/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/amak.site/privkey.pem
This certificate expires on 2026-06-17.
These files will be updated when the certificate renews.

NEXT STEPS:
- This certificate will not be renewed automatically. Autorenewal of --manual certificates requires the use of an authentication hook script (--manual-auth-hook) but one was not provided. To renew this certificate, repeat this same certbot command before the certificate's expiry date.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


```
