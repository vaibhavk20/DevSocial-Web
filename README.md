# aws deployment

-   create free account
-   ec2 instance creation
-   .pem key generation
-   connect

        -   ssh
        -   dowloaded .pem file folder open terminal
        -   follow instrucion
        -   chmod 400 "devSocial.pem"
        -   ssh -i "devSocial.pem" ubuntu@ec2-3-208-8-15.compute-1.amazonaws.com

        ## after connect to ubantu

        -   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
        -   nvm install (extact version like 24.9.0)
        -   clone git frontend and backend project

        -   ## Frontend
            -   cd frontend project npm install
            -   npm run build
            -   sudo apt update
            -   sudo apt install nginx
            -   sudo systemctl start nginx
            -   sudo systemctl enable nginx
            -   copy code from dist(build files) to /var/www/html/dist. on every new pull
            -   cd /var/www/html check existing file.
            -   cd frontend project
            -   sudo scp -r dist/\* /var/www/html. on every build replace it with older one.
            -   enable port 80 of your instance
            -   at instance goto security -> group -> edit -> 80 and 0.0.0.0/0 -> save

        -   ## Backend
            -   allowed ip address mongoDB
            -   install => npm install pm2 -g (help to keep server on)
            -   pm2 start npm -- start
            -   pm2 logs
            -   pm2 flush project name
            -   pm2 npm stop
            -   pm2 restart app_name
            -   pm2 reload app_name
            -   pm2 stop app_name
            -   pm2 delete app_name

        - frontend => public Ip => domain name
        - backend => public ip:3000 => domain name/api

        - sudo nano /etc/nginx/sites-available/default

        ## nginx config
            1. server_name _; # Your domain name or IP address goes here

            2. location /api/ {
                proxy_pass http://localhost:3000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }

            3. # For all other requests, serve the main React entry point (index.html)
                # This is crucial for client-side routing (React Router)
                location / {
                    try_files $uri $uri/ /index.html;
                }

            save ctrl + s
            sudo systemctl restart nginx

            - modify baseurl in frontend project

## SES simple email service

    -
