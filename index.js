const express = require('express')
const passportSaml = require('passport-saml');
const passport = require('passport');
const bodyParser = require("body-parser");
var flash  = require('connect-flash');
const session = require('express-session');
const Saml2js = require('saml2js');



const fs=require('fs')
const app = express()
const port = process.env.PORT || 5000


const samlConfig={
    callbackUrl: `/sso/login/callback`,
    entryPoint: 'https://sandsmedia-test-dev.onelogin.com/trust/saml2/http-redirect/sso/d4abf657-9f10-44e8-8c7a-0f97ec96cba1',
    issuer: 'TestSandsmediaShibbolethApp',
    cert: fs.readFileSync('./onelogin.pem', 'utf8')
};
const samlStrategyName='saml';

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
  
// SAML strategy for passport -- Single IPD
const strategy = new passportSaml.Strategy(samlConfig,
    (profile, done) => done(null, profile),
);
  
passport.use(strategy);

// After you declare "app"
app.use(session({ secret: 'SECRET',resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// var isAuthenticated = function (req, res, next) {
//     // if user is authenticated in the session, call the next() to call the next request handler
//     // Passport adds this method to request object. A middleware is allowed to add properties to
//     // request and response objects
//     if (req.isAuthenticated())
//       return next();
//     // if the user is not authenticated then redirect him to the login page
//     res.redirect('/');
//   }

app.post(
  "/sso/login/callback",
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate(samlStrategyName, {
    failureRedirect: "/failed",
    failureFlash: true,
  }),
  function (req, res,next) {
    console.log('callback is called.')
    console.log('isAuthenticated=',req.isAuthenticated())
    // if(req.isAuthenticated()){
    //     const xmlResponse = req.body.SAMLResponse;
    //     const parser = new Saml2js(xmlResponse);
    //     req.samlUserObject = parser.toObject();
    
    //     console.log('samlUserObject: ',req.samlUserObject)
    //     res.json({"data":{"validate":{"statusCode":null,"success":true,"User":{"_id":"6246d6194d10a30f928a01a2","email":"mjamali@sandsmedia.com","isIPAccessAdmin":null,"isDomainAccessAdmin":null,"isAttendeePackAdmin":null,"attendeeIds":["62693db37d3902001d2296c9","6246d61d914f98001d25f2af"],"attendees":[{"firstName":"Muqadar Ali","lastName":"Jamali","__typename":"UserAttendee"},{"firstName":"","lastName":"","__typename":"UserAttendee"}],"marketingConsents":null,"segment":{"kioskSubscriptionState":"DOMAIN","eventMarketingConsent":"NONE","__typename":"Segment"},"isFlatrateSubscriptionAdmin":null,"hadKioskFlatrate":true,"hasKioskFlatrate":false,"hasFullStackAccess":true,"hasDomainAccess":true,"hasIPAccess":false,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBVc2VySWQiOiI2MjQ2ZDYxOTRkMTBhMzBmOTI4YTAxYTIiLCJpYXQiOjE2NTc2OTUyODksImV4cCI6MTY2MTE1MTI4OX0.LN4UGjngm1wXgdNBPzWaZtC2p4MUHrNiYK5X2equLuc","hasConferenceSlides":true,"events":[{"_id":"vPMbMXEP2ZjYKvK4b","accessible":true,"__typename":"UserEvent"},{"_id":"w58JeXeKy8LykfLhJ","accessible":true,"__typename":"UserEvent"}],"authors":[],"collections":[{"_id":"default.favourite.id","name":"default.favourite.name","description":"default.favourite.description","articleIds":["f2b857cd9d114ddd123ad59c","fcb84034d5e42463e3677ae1","6aa9588d6064d0fcafac3730","1b5b6018e86cc9ebdccc2e63"],"thumbnail":"https://s3-eu-west-1.amazonaws.com/redsys-prod/collections/default.favourite.id/svg/ic_favorite_24px_collection.svg","timestamp":1653506110433,"__typename":"Collection"}],"articles":[{"_id":"fbee99dd9a4847ce3997ccf6","notes":[],"__typename":"UserArticle"},{"_id":"1da4ff29e6b586b42ae73c60","notes":[{"_id":"62cbe4d0681e0d001e368062","selection":{"start":null,"end":null,"text":"Kosten","__typename":"Selection"},"content":"khioiojo","origin":"WEB","timestamp":1657529552343,"__typename":"Note"}],"__typename":"UserArticle"},{"_id":"b924c07ade81692c6aa17319","notes":[],"__typename":"UserArticle"},{"_id":"003c28e0cbda11add176f43d","notes":[],"__typename":"UserArticle"},{"_id":"480bf9422ed5ba1301fa22c9","notes":[{"_id":"628dff1c3078d7001e713ed3","selection":{"start":null,"end":null,"text":" ","__typename":"Selection"},"content":"myNote","origin":"WEB","timestamp":1653473052301,"__typename":"Note"},{"_id":"628e7e4bd5041e001e3ea351","selection":{"start":null,"end":null,"text":"ursprünglichen","__typename":"Selection"},"content":"other note","origin":"WEB","timestamp":1653505611375,"__typename":"Note"},{"_id":"628e7e59d5041e001e3ea352","selection":{"start":null,"end":null,"text":"oder","__typename":"Selection"},"content":"3rd note","origin":"WEB","timestamp":1653505625023,"__typename":"Note"}],"__typename":"UserArticle"},{"_id":"1b5b6018e86cc9ebdccc2e63","notes":[],"__typename":"UserArticle"},{"_id":"c6f2e2f0a6efd21598e2ae6a","notes":[],"__typename":"UserArticle"},{"_id":"44a1f769ad0ad50a03ce21dc","notes":[],"__typename":"UserArticle"},{"_id":"6f0ba104de72865b8bb7670e","notes":[],"__typename":"UserArticle"},{"_id":"0bee11513fb4c689ed271517","notes":[],"__typename":"UserArticle"},{"_id":"6d4431bdcd425a3fbb7539ab","notes":[],"__typename":"UserArticle"},{"_id":"360924ebac04e81a842e0238","notes":[{"_id":"62c81e1cacd262001eb022a4","selection":{"start":null,"end":null,"text":"Die Ereignisbehandlung kann man Listing 6 entnehmen. Besondere Vorkehrungen für den Dateisystemzugriff müssen nicht getroffen werden; der Entwickler kann einfach die .NET-Klassen aus dem Namensraum System.IO verwenden.\n\n","__typename":"Selection"},"content":"I am note 1","origin":"WEB","timestamp":1657282076272,"__typename":"Note"}],"__typename":"UserArticle"},{"_id":"f75c7a61a9e820bd630aeb40","notes":[],"__typename":"UserArticle"},{"_id":"8312110143509294c0bd904d","notes":[{"_id":"62c8330e67376c001e9fcf24","selection":{"start":null,"end":null,"text":"components","__typename":"Selection"},"content":"helloworld note","origin":"WEB","timestamp":1657287438439,"__typename":"Note"}],"__typename":"UserArticle"}],"__typename":"User"},"__typename":"PetrolUserResponse"}}})
    // }else{
    //     res.redirect("/failed");
    // }

    if (req.body.RelayState) {
        console.log('RelayState')
        res.redirect(req.body.RelayState);
    } else{
        res.redirect("/success");
    }
  
}
    
//    if (req.body.RelayState) {
//         console.log('RelayState')
//         res.redirect(req.body.RelayState);
//     } else{
//         res.redirect("/success");
//     }
//   }
);

app.get( "/sso/login", passport.authenticate(samlStrategyName, { failureRedirect: "/", failureFlash: true,successRedirect: '/success' }));

app.get('/', (req, res) => {
  res.send('Hello World! Login page')
})

app.get('/failed', (req, res) => {
    res.send('Login failed')
})

app.get('/success', (req, res) => {
    res.send('This is success login page')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})