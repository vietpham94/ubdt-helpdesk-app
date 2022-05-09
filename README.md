# ubdt-helpdesk-app
Ứng dụng Cẩm Nang Số - Hướng dẫn thực hiện chương trình mục tiêu quốc gia

1. Install ionic in your local(If you have ionic in the local environment, you can skip this step).
   > npm install -g @ionic/cli native-run cordova-res
2. Clone code and checkout to develop branch.
   > git clone https://github.com/vietpham94/ubdt-helpdesk-app.git

   > cd ubdt-helpdesk-app.git

   > git checkout develop
3. Move command to "idfood-provider-app" and install node modules.
   > cd ubdt-helpdesk-app.git

   > npm install

4. Run app:
   > ionic serve --port 9000

   Run external:
   > ionic serve --external --port 9000

   Run cordova on browser:
   > ionic cordova platform add browser
   >
   > ionic cordova run browser
   >
   > ionic cordova build browser
   >
   > ionic cordova run browser

5. Build Android, iOS:

   5.1 Remove platform after run build

   > ionic cordova platform rm android

   > ionic cordova platform rm ios

   5.2. Capacitor
   > ionic integrations enable capacitor --add

   > ionic capacitor build android

   > ionic capacitor build ios

   5.3 Cordova
   > ionic integrations enable cordova --add

   > ionic cordova platform add ios

   > ionic cordova platform add android

   > ionic cordova platform add windows

   > ionic cordova build ios

   > ionic cordova build android

   > ionic cordova build windows

Cài thêm Ionic Selectable:
   > npm install ionic-selectable@4.8.0 --save
