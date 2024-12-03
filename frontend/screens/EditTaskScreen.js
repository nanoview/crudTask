import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import API from '../api';

export default function EditTaskScreen({ route, navigation }) {
    const { task } = route.params;
    const [name, setName] = useState(task.name);
    const [loading, setLoading] = useState(false);

    const updateTask = async () => {
        setLoading(true);
        try {
            await API.put(`/${task._id}`, { name });
            Toast.show({
                type: 'success',
                text1: 'Task Updated',
                text2: 'Successfully updated the task.',
                position: 'top',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 300,
                bottomOffset: 100,
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Update Task" onPress={updateTask} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
});