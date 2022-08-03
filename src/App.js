import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import UseFetch from './components/Hook/use-Fetch'

function App() {
  const [tasks, setTasks] = useState('');

  const { isLoading, error, sendRequest: fetchTasks } = UseFetch();

  useEffect(() => {

    const transformTasks = (tasksObj) => {
      let loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text })
      }

      setTasks(loadedTasks)

    };
    fetchTasks({ url: 'https://react-http-1a08e-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json' },
      transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
