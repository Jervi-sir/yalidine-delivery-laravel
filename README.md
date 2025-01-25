### to run the server
php artisan serve --host 0.0.0.0 --port 7969

pm2 start "php artisan serve --host 0.0.0.0 --port 7969" --name "yalidine-api"

### Domain name
sudo nano /etc/nginx/sites-available/yalidine.huntproducts.online

```
server {
    listen 80;
    server_name yalidine.huntproducts.online;

    location / {
        proxy_pass http://localhost:7969;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }

}
```
sudo ln -s /etc/nginx/sites-available/yalidine.huntproducts.online /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d yalidine.huntproducts.online


### Domain for vite
yalidineview.huntproducts.online

sudo nano /etc/nginx/sites-available/yalidineview.huntproducts.online

```
server {
    listen 80;
    server_name yalidineview.huntproducts.online;

    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}
```
sudo ln -s /etc/nginx/sites-available/yalidineview.huntproducts.online /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d yalidineview.huntproducts.online

