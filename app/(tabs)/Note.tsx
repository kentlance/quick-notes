import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Note = ({
    note = {_id: '', title: '', content: ''},
    onDelete,
    onEdit,
}: {
	note: {
		_id: string;
		title: string;
		content: string;
    }
    onDelete: (index: string) => void;
    onEdit: (index: string) => void;
}) => {
    const { _id, title, content} = note
    const handleEditPress = () => {
        onEdit(note._id);
    }

    return (
        <View style={styles.item} key={_id}>
            <View style={styles.itemLeft}> 
                <Pressable onPress={() => handleEditPress()}><View style={styles.editNoteWrappaer}><Text style={styles.editNoteText}>/</Text></View></Pressable>
                <View style={styles.itemText}>
                    <Text style={styles.title}>{note.title}</Text>
                    <Text style={styles.content}>{note.content}</Text>
                </View>
            </View>

            <Pressable onPress={() => onDelete(note._id)}><View style={styles.deleteNoteWrapper}><Text style={styles.deleteNoteText}>X</Text></View></Pressable>
        </View>
    )
}


export default Note;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    editNoteWrappaer: {
        width: 24,
        height: 24,
        backgroundColor: 'green',
        marginRight: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editNoteText: {
        color: 'white',
        textAlign: 'center',
    },
    deleteNoteWrapper: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20,
    },
    deleteNoteText: {
        textAlign: 'center',
        fontSize: 12,
        color: 'red',
    },
    itemText: {
        maxWidth: '80%',
    },
    title: {
        fontWeight: 'bold',
    },
    content: {},
});

