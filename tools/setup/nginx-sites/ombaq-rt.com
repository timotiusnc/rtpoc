server {
    listen 80;
    server_name ombaq-rt.com;

    return 301 https://$server_name$request_uri;
}

server {
    listen 443;
    server_name ombaq-rt.com;
    ssl on;
    ssl_certificate /etc/nginx/keys/ds-self-signed.crt;
    ssl_certificate_key /etc/nginx/keys/ds-self-signed.key;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers RC4:HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Host $http_host;
        proxy_pass http://localhost:8081;
        proxy_redirect http://$host:8081/ https://$host/;
    }
}

server {
    listen 8081;
    index index.html app/index.html;
    root /var/www/ombaq-rt/client;
    server_name ombaq-rt.com;

    access_log /var/log/nginx/ombaq-rt.com.access.log;
    error_log  /var/log/nginx/ombaq-rt.com.error.log;

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    location / {
        try_files $uri $uri/ /app$uri /.tmp$uri =404;
    }

}
