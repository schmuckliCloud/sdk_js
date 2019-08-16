# schmuckliCloud Storage SDK for JavaScript
This is a part package for the schmuckliCloud service. It connects your application to the storage service.


## Use in Node.js and other loaders

### Setup
To install the package, you need the npm CLI. Afterwards, install the package by typing

```
npm install schmucklicloud_storage
```

in the terminal. The package will now automatically be installed.

## Getting started
Import first the module in your code. 
Then initialize a new `sCStorage` object and provide also the APP ID and APP Secret in the constructor. You can get the credentials by opening
the schmuckliCloud console and open a project. Then in the bottom, you will find a 

```javascript
import sCStorage from 'schmucklicloud_storage';

var reference = sCStorage('YOUR_APPID', 'YOUR_APPSECRET');
```
Now after you have your reference object, you can start writing and reading data from your storage buckets. 
Before you can do that, you first have to set some important values, which will be appended to every request you are doing later:

```javascript
reference.setBucket(201); //The bucket id. You find the bucket ID in the schmuckliCloud console
reference.setDataset('abc'); //This could be a user id or a simple word.
```

Now you are ready to handle all schmuckliCloud Storage requests.

## Use in browser directly

### Setup
If you want to use the schmuckliCloud service directly in the DOM itself, just simply include the following file in a script tag in before the body tag closes.

```html
<script src="https://unpkg.com/schmucklicloud_storage/dist/min.js" type="text/javascript"></script>
```

Now you are ready to contact the schmuckliCloud also via the JavaScript SDK.

### Getting started
First initialize the object sCStorage in your JavaScript code with the API credentials from your project.

```javascript
//IMPORTANT: Initialize the object from the 'schmuckliCloud' library.
var ref = new schmuckliCloud.sCStorage("YOUR_APPID", "YOUR_APPSECRET");

ref.setBucket(201);
ref.setDataset("abc");
```
