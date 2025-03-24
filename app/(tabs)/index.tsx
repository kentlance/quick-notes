import {
  TextInput,
  View,
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

import Note from "./Note";
import { uuid } from "expo-modules-core";

type Props = {
  label: string;
};

export default function HomeScreen({ label }: Props) {
  const [note, setNote] = useState<string>();
  const [noteItems, setNoteItems] = useState<
    { _id: string; title: string; content: string }[]
  >([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const handleAddNote = () => {
    Keyboard.dismiss();
    if (note !== undefined && note.trim() !== "") {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (editingNoteId !== null) {
        {
          /* Edit existing note */
        }
        const updatedNote = {
          _id: editingNoteId,
          title: formattedDate,
          content: note,
        };
        const updatedNoteItems = noteItems.map((note) => {
          if (note._id === editingNoteId) {
            return updatedNote;
          }
          return note;
        });
        setNoteItems(updatedNoteItems);
        setEditingNoteId(null);
      } else {
        {
          /* Add new note */
        }

        const newNote = {
          // uuid generates a unique ID for the note
          _id: uuid.v4(),
          title: formattedDate,
          content: note,
        };
        setNoteItems([...noteItems, newNote]);
      }
      setNote("");
    }
  };

  const handleEditNote = (noteId: string) => {
    const noteToEdit = noteItems.find((note) => note._id === noteId);
    if (noteToEdit) {
      setNote(noteToEdit.content);
      setEditingNoteId(noteId);
    }
  };

  const handleDeleteNote = (index: number) => {
    setNoteItems(noteItems.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.notesWrapper}>
          {/* Notes page here */}
          <Text style={styles.homeTitle}>Quick Notes</Text>
          <ScrollView style={styles.items}>
            {noteItems.map((item, index) => {
              return (
                <Note
                  key={index}
                  note={{
                    _id: item._id.toString(),
                    title: item.title,
                    content: item.content,
                  }}
                  onDelete={() => handleDeleteNote(index)}
                  onEdit={handleEditNote}
                />
              );
            })}
          </ScrollView>
        </View>

        {/** Writing a note section */}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeNoteWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a note"}
            value={note}
            onChangeText={(text) => setNote(text)}
          />
          <Pressable onPress={() => handleAddNote()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D5CDC1",
  },
  notesWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    height: "70%",
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 50,
  },
  writeNoteWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#43311D",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#43311D",
    borderWidth: 1,
  },
  addText: {},
});
