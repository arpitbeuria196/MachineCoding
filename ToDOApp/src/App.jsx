import { useState } from 'react'
import "./App.css"


function App() {
  const [tasks,setTasks] = useState([]);
  const[taskName,setTaskName] = useState("");
  const [editToggle,setEditToogle] = useState(false);
  const [editIndex,setEditIndex] = useState();

  const handleAddTask = ()=>
  {
    if(taskName.trim()=="") return;

    const copyArray = [...tasks];
      if(editToggle)
      {
        copyArray[editIndex] = taskName;
        setTasks(copyArray);
        setEditIndex(null);
        setEditToogle(false);
        console.log(copyArray);
      }
      else
      {
      copyArray.push(taskName);
      setTasks(copyArray);
      console.log(copyArray);
      }
      setTaskName("");

  }

  const handleDeleteTask = (index)=>
  {
    const copyArray = [...tasks];
   const filtered = copyArray.filter((task,ind)=> ind!=index)
    setTasks(filtered);
  }

  const handleEditTask = (index)=>
  {
    setEditToogle(true);
    setTaskName(tasks[index]);
    setEditIndex(index);

  }
  

  return (
      <div className='min-h-screen min-w-screen flex flex-col items-center justify-center text-center bg-gray-500'>
        <input
        placeholder='Enter Task Name'
        className='m-5 p-5 border rounded-2xl'
        value={taskName}
        onChange={(e)=>setTaskName(e.target.value)}
        
        />
        <button
        onClick={handleAddTask}
        className='mb-2'
        >{editToggle ? "Update Task" : "Add Task"}</button>
        {
          tasks.map((task,index)=>(
              <div 
              className='flex items-center justify-between border p-3 mb-3 rounded gap-2 '
              key={index}>
                {task}
                <button
                onClick={()=>handleDeleteTask(index)}
                >delete</button>
                <button
                onClick={()=>handleEditTask(index)}
                >
                  Edit
                </button>
              </div>
          ))
        }
      </div>
  )
}

export default App
