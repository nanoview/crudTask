import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import API from '../api';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get('/');
    setTasks(res.data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => navigation.navigate('EditTask', { task: item })}
            onDelete={async () => {
              await API.delete(`/${item._id}`);
              fetchTasks();
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
