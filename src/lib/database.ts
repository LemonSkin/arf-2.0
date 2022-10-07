import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocsFromServer, getDocs, setDoc, doc, getDoc, query, where } from 'firebase/firestore'
import { stringify } from 'postcss';

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

export class UserData {
	username?: string;
	role?: string;
}

// init services
export const db = getFirestore();

export async function login_user(username: string, password: string) {
	const docRef = doc(db, "users", username);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists() && docSnap.data()['password'] === password) {
	
		return true;
	}
	return false;
}

export async function set_user_auth_token(username: string, uuid: string) {
	const docRef = doc(db, "users", username);
	await setDoc(doc(db, "users", username), {session: uuid}, {merge: true});
}

export async function get_user_session(uuid: string) {
	let userData: UserData = new UserData();
	const q = query(collection(db, "users"), where("session", "==", uuid));
	const querySnapshot = await getDocs(q);
	if(querySnapshot.empty) {
		return userData;
	};
	userData.username = querySnapshot.docs[0].id;
	userData.role = querySnapshot.docs[0].data()["role"]
	return userData;
}