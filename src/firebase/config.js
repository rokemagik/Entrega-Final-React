import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs, doc, getDoc, addDoc, query, where
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuaLP2d8p2_C1tsphLzhwtWIWPX3vVWeY",
  authDomain: "coderhouse-ecommerce-383bf.firebaseapp.com",
  projectId: "coderhouse-ecommerce-383bf",
  storageBucket: "coderhouse-ecommerce-383bf.firebasestorage.app",
  messagingSenderId: "1042060088968",
  appId: "1:1042060088968:web:2d706495ae34f8c37d713d",
  measurementId: "G-8CNFQ1731M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getProducts() {
  const col = collection(db, "products");
  const snapshot = await getDocs(col);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getProductById(id) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getProductsByCategory(category) {
  const col = collection(db, "products");
  const q = query(col, where("categoria", "==", category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createOrder(order) {
  const col = collection(db, "orders");
  const docRef = await addDoc(col, order);
  return docRef.id;
}