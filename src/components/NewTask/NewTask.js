
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import UseFetch from '../Hook/use-Fetch'

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = UseFetch();


  const addTask = (taskText,task) => {

    const generateId=task.name;
    const createdTask={id:generateId,text:taskText}
    props.onAddTask(createdTask);

  }


  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: 'https://react-http-1a08e-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText },

    },addTask.bind(null,taskText))

  };


  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
