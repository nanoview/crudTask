import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TaskItem({ task, onEdit, onDelete }) {
    return (
        <View style={styles.taskItem}>
            <Text>{task.name}</Text>
            <View style={styles.actions}>
                <Button title="Edit" onPress={onEdit} />
                <Button title="Delete" onPress={onDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    actions: {
        flexDirection: 'row',
    },
});
