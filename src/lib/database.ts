import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDH5102hbHQBtMhOhitexi216MjrokDAFw',
	authDomain: 'fir-tutorial-c15bc.firebaseapp.com',
	projectId: 'fir-tutorial-c15bc',
	storageBucket: 'fir-tutorial-c15bc.appspot.com',
	messagingSenderId: '15914292282',
	appId: '1:15914292282:web:c23873b6422f98e3b39103'
};

// init firebase app
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();
