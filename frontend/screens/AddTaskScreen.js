import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import API from '../api';

export default function AddTaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  // Fetch tasks on component load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/');
      setTasks(response.data);
      Toast.show({
        type: 'success',
        text1: 'Tasks Fetched',
        text2: 'Successfully retrieved tasks from the backend.',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
        topOffset:200,
        bottomOffset: 100,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error Fetching Tasks',
        text2: error.message,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 300,
        bottomOffset: 100,
      });
    }
  };

  const addTask = async () => {
    if (!taskName.trim()) {
      Toast.show({
        type: 'info',
        text1: 'Empty Task',
        text2: 'Please enter a valid task name.',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 300,
        bottomOffset: 100,
      });
      return;
    }

    try {
      const response = await API.post('/', { name: taskName });
      setTasks([...tasks, response.data]);
      setTaskName('');
      Toast.show({
        type: 'success',
        text1: 'Task Added',
        text2: 'Successfully added a new task.',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 300,
        bottomOffset: 100,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error Adding Task',
        text2: error.message,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 300,
        bottomOffset: 100,
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      Toast.show({
        type: 'success',
        text1: 'Task Deleted',
        text2: 'Successfully removed the task.',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 300,
        bottomOffset: 100,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error Deleting Task',
        text2: error.message,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 300,
        bottomOffset: 100,
      });
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter Task Name"
        value={taskName}
        onChangeText={setTaskName}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
            }}
          >
            <Text>{item.name}</Text>
            <Button
              title="Delete"
              onPress={() => deleteTask(item._id)}
              color="red"
            />
          </View>
        )}
      />
      <Toast />
    </View>
  );
}
