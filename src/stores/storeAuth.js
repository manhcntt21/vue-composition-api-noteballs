import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useStoreNotes } from "@/stores/storeNotes";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
    };
  },

  actions: {
    init() {
      const storeNotes = useStoreNotes();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log('user logined', user);
          // console.log(user.uid);
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
          storeNotes.init();
        } else {
          // console.log('user logouted', user);
          this.user = {};
          this.router.replace("/auth")
          storeNotes.clearNotes();
        }
      });
    },

    register(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log("error.message: ", error.message);
        });
    },
    login(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("user: ", user);
        })
        .catch((error) => {
          console.log("error.message: ", error.message);
        });
    },

    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("signOut");
        })
        .catch((error) => {
          // An error happened.
          console.log("error.message", error.message);
        });
    },
  },
});
