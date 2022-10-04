import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyDH5102hbHQBtMhOhitexi216MjrokDAFw",
	authDomain: "fir-tutorial-c15bc.firebaseapp.com",
	projectId: "fir-tutorial-c15bc",
	storageBucket: "fir-tutorial-c15bc.appspot.com",
	messagingSenderId: "15914292282",
	appId: "1:15914292282:web:c23873b6422f98e3b39103"
	};
	// init firebase app
initializeApp(firebaseConfig);

	// init services
export const db = getFirestore();

export async function register_user(username: string, password: string) {
	let colRef = collection(db, "users");
	let userAdded: boolean = true;
	await getDocs(colRef)
		.then(function (snapshot) {
			for (var i = 0; i < snapshot.docs.length; i++) {
				if (snapshot.docs[i].id === username) {
					userAdded = false;
					break;
				}
			}
			if (userAdded) {
				setDoc(doc(db, "users", username), {
					alias: null,
					password: password,
					role: "user"
				});
			}

			// //Function returns true if username is not found
			// if(snapshot.docs.every(function (doc) { 
			// 	//Loop over usernames, fails when encounters taken username
			// 	if (doc.data()['username'] != username) {
			// 		return true;
			// 	}
			// })) {
			// 	console.log("Adding", username, "to database")
			// 	addDoc(colRef, {username: username, password: password, alias: null})
			// 	userAdded = true;
			// }
		})
		.catch(function (err) {
			console.log(err.message);
		});
		return userAdded;
};

export async function login_user(username: string, password: string) {
	let colRef = collection(db, "users");
	let userAuthenticated: boolean = false;
	await getDocs(colRef)
		.then(function (snapshot) {
			for (var i = 0; i < snapshot.docs.length; i++) {
				if (snapshot.docs[i].data()['username'] === username && 
					snapshot.docs[i].data()['password'] === password) {
						userAuthenticated = true;
						break;
					}
			}
		})
		.catch(function (err) {
			console.log(err.message);
		});
		return userAuthenticated;
}