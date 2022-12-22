Demo Login/Register su dung NodeJS, ExpressJS, PostgreSQL

* Huong dan cai dat va thuc thi ung dung

1. Chuan bi moi truong (chi lam 1 lan)
- Nodejs

- pnpm 

- nodemon

- redis

- postgresql
=> Tao 1 database de luu tru tai khoan dang nhap

2. Cai dat ung dung
- Download source code va Giai nen
Github Link: https://github.com/ttbhanh/ptudw-demo/tree/main/demo-passport

- Mo thu muc da duoc giai nen trong VS.code


- Sua cau  hinh  database trong config.json

- Tao ung dung tren facebook va google de lay clientID  & clientSecret
developer.facebook.com
console.cloud.google.com
=> sua cau  hinh trong auth.json: clientID, clientSecret

- Cai dat cac package lien quan
$ pnpm i
hoac
$ npm i

3. Thuc  thi ung dung
- Khoi dong redis server, mo cua so console/terminal moi (ko nen su dung terminal tren VS.Code)
$ redis-server

- Khoi dong web server, mo terminal trong VS.Code
$ nodemon

- Mo web tren trinh  duyet
+ Tao bang  User trong CSDL
http://localhost:3000/createTables

+ Mo Trang chu website
http://localhost:3000

4. Ket thuc thuc thi ung dung
- Ket thuc redis-server
$ redis-cli shutdown

- Ket thuc ung dung
$ Ctl+C