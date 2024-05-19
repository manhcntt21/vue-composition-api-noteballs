import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/js/firebase";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
  addDoc,
} from "firebase/firestore";
import { useStoreAuth } from "@/stores/storeAuth"; 
let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshot = null
export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },

  actions: {
    init() {
      const storeAuth = useStoreAuth();
      // console.log(storeAuth.user.id);
      notesCollectionRef = collection(
        db,
        "users",
        storeAuth.user.id,
        "notes"
      );
      notesCollectionQuery = query(
        notesCollectionRef,
        orderBy("date", "desc")
      );
      // initailize the our database refs
      this.fetchNotes();
    },
    async addNote(newNodeContent) {
      // this.notes.unshift({
      //   id: uuidv4(),
      //   content: newNodeContent,
      // });
      let currentDate = new Date().getTime(),
        date = currentDate.toString();
      await addDoc(notesCollectionRef, {
        content: newNodeContent,
        date,
      });
      console.log(this.notes);
    },

    async deleteNoteById(id) {
      // this.notes = this.notes.filter((note) => note.id !== id);
      console.log(id);
      await deleteDoc(doc(notesCollectionRef, id));
    },

    // editNoteById(id) {
    //   console.log(id);
    //   const note = this.notes.find((note) => note.id === id);
    //   //   note.content = content;
    // },
    async updateNoteContentById(playload) {
      // const note = this.notes.find((note) => note.id === playload.id);
      await updateDoc(doc(notesCollectionRef, playload.id), {
        content: playload.content,
      });
    },

    async fetchNotes() {
      // console.log("fetchNotes");
      // const querySnapshot = await getDocs(collection(db, 'notes'));
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data());
      //   let note = {
      //     id: doc.id,
      //     content: doc.data().content
      //   }
      //   this.notes.push(note);
      // });
      this.notesLoaded = false;
      if(getNotesSnapshot) getNotesSnapshot(); // unscribe the previous listener
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });

        this.notes = notes;
        this.notesLoaded = true;
      });
    },
    

    clearNotes() {
      this.notes = [];
    }
  },
  getters: {
    getNoteContentById: (state) => {
      return (id) => {
        // console.log(id);
        const note = state.notes.find((note) => note.id === id);
        return note ? note.content : null;
      };
    },

    getTotalNotes: (state) => {
      return state.notes.length;
    },

    getTotalWords: (state) => {
      return state.notes.reduce((acc, note) => {
        return acc + note.content.split(" ").length;
      }, 0);
    },

    getTotalCharacters: (state) => {
      return state.notes.reduce((acc, note) => {
        return acc + note.content.length;
      }, 0);
    },
  },
});
