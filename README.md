# blogging
Dibuat dengan ❤️


### ROUTE
#### CLIENT

| Router 	                | Description |
|-----------------------    |:----:|
|/          |Jumbotron Halaman Utama  | 
|/blog          |Menampilkan semua blog |
|/blog/:id          |Menampilkan blog per Id Params yang diinginkan  |
|/dashboard          |menampilkan user  |  

#### ADMIN

BaseURL : localhost:3000 <br>
Kue-UI	: localhost:6363

| Router 	                | HTTP | Description       |
|-----------------------    |:----:|-------------------|
|/api/auth          |GET  | auth signin      |

List of answer route:

| Router                     | HTTP | Description       |
|-----------------------    |:----:|-------------------|
|/api/blog          |GET  |   menampilkan semua blog  |
|/api/blog/:id          |GET  |  menampilkan blog berdasarkan id   |
|/api/blog/user/:id          |get  |   menampilkan blog sesuai user  |
|/api/blog          |POST  |  menambah blog   |
|/api/blog/:id          |PUT  |  mengedit blog sesuai token  |
|/api/blog/:id          |DELETE  |  meghapus blog sesuai token  |


### Usage

```
> git clone
> cd server/client
> npm install / yarn install
> npm run dev /yarn run dev 
```
