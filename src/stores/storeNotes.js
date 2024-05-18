import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        {
          id: "1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium adipisci, odit saepe sequi rem animi odio? Vitae sequi ea dolorum laboriosam a, quos, amet animi, esse id nobis vel ad.",
        },
        {
          id: "2",
          content:
            "Hi, I'm a note! You can edit me by clicking on the pencil icon on the right. You can also delete me by clicking on the trash icon. You can add a new note by clicking on the plus icon at the bottom.",
        },
      ],
    };
  },

  actions: {
    addNote(newNodeContent) {
      this.notes.unshift({
        id: uuidv4(),
        content: newNodeContent,
      });
    },

    deleteNoteById(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },

    // editNoteById(id) {
    //   console.log(id);
    //   const note = this.notes.find((note) => note.id === id);
    //   //   note.content = content;
    // },
    updateNoteContentById(playload) {
      const note = this.notes.find((note) => note.id === playload.id);
      if (note) {
        note.content = playload.content;
      }
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
