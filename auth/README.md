# schmuckliCloud Authentication SDK for JavaScript

This is the official SDK for the authentication service, written in JavaScript.
The SDK allows you to setup a full authentication service within minutes.

# Getting started

## Setup in the console

To use the SDK, you first have to define some settings in the console. Make sure that you have open a project there (if you don't have one, just create a new project). Next to the storage and app client settings, you will find there also the authentication settings. Open the authentication settings and you will find some fields. You can see the sections email setup, email links and email templates.
In the first section (email setup), you have to define a own mailserver with the sender email. The authentication service will then send all the email traffic through your own mail server. If you don't want to purchase a mail server, you also have the option to insert for example the Gmail configurations there.
In the second section(email links) you have to define the activation and reset password links. These are the places, where the user get directed, if they click on the links in the mail. So therefore, you can simply create your own activation or reset password screen on your website.
In the third section (email templates) you can now also create your own templates for the emails. It is of course important to use one of the link placeholder from the section two. Otherwise the user just gets an unnecessary mail. Since the mails supports HTML, you also can style the mail as you like.

Now you are all done in the console and can now use the SDK functionalities.

## Setup the SDK

Before you can start using the SDK in your project, you have of course to download the npm package:

```bash
npm install schmucklicloud_auth
```

After you have installed the package you are now able to initialize the class sCAuth from the package.

```javascript
import { sCAuth } from "schmucklicloud_auth";

var auth = new sCAuth("YOUR_APP_ID", "YOUR_APP_SECRET");
```

Now all the further actions will handle the newly created `auth` variable for you.
