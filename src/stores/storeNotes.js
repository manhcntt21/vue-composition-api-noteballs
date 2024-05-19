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
} from "firebase/firestore";

const notesCollectionRef = collection(db, "notes");
const notesCollectionQuery = query(notesCollectionRef, orderBy("id", "desc"));

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
    };
  },

  actions: {
    async addNote(newNodeContent) {
      // this.notes.unshift({
      //   id: uuidv4(),
      //   content: newNodeContent,
      // });
      let currentDate = new Date().getTime(), id = currentDate.toString();
      await setDoc(doc(notesCollectionRef, id), {
        content: newNodeContent,
        id
      });
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
      console.log("fetchNotes");
      // const querySnapshot = await getDocs(collection(db, 'notes'));
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data());
      //   let note = {
      //     id: doc.id,
      //     content: doc.data().content
      //   }
      //   this.notes.push(note);
      // });

      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
          };
          notes.push(note);
        });
        this.notes = notes;
      });
    },
    // later, want to stop listening to changes
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
