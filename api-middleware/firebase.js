// var firebase = require('firebase-admin');

// // const admin = require('firebase-admin');

// // const serviceAccount = require('../config/config.json');

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount)
// // });

// // const db = admin.firestore();
// // console.log(db.listCollections());
// (async() => { 
// var firebaseConfig = {
//   apiKey: "AIzaSyBykNVd5HiYNHI6DVi3KGngaDMHa8oCw_k",
//   authDomain: "axie-accountant.firebaseapp.com",
//   databaseURL: "https://axie-accountant-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "axie-accountant",
//   storageBucket: "axie-accountant.appspot.com",
//   messagingSenderId: "78974925642",
//   appId: "1:78974925642:web:90f3a4a65c7469c6c35fb3",
//   measurementId: "G-R02MYLT76N"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // let col = await firebase.firestore().listCollections();
// let db = await firebase.database();


// firebase.database().ref('users');///1').set({
// //   username: "name",
// //   email: "email",
// //   profile_picture : "imageUrl"
// // });


// //console.log(db.ref("axie-accountant-default-rtdb")._delegate._repo.infoData_.rootNode_.children_.root_.value);

// // console.log(db._delegate);
// //console.log(db.value);
// //console.log(db.ref("info")._delegate);
// db.ref('earnings').once('value').then(function(snapshot) {
//   var country = snapshot.key ;

//   snapshot.forEach(function(snapshot1) {
//     console.log(snapshot1.key); // 
//     snapshot.forEach(function(snapshot2) {
//       console.log(snapshot2.key); // 

//       snapshot2.forEach(function(snapshot3) {
//         console.log(snapshot3.key);
//         console.log(snapshot3.val().first_name)
//     });
//   });
// });
// });
// })();