import { useState } from 'react';
import Button from './Button';
import Input from './Input';

export default function NewTask({ onAdd, onDelete }) {
  const [enteredTask, setEnteredTask] = useState('');

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask('');
  }

  return (
    <div className='flex items-center gap-4'>
      <Input
        type='text'
        value={enteredTask}
        onChange={handleChange}
        className='w-64 px-2 py-1 rounded-sm bg-stone-200'
      />
      <Button
        onClick={handleClick}
        className='text-stone-700 hover:text-stone-950'
      >
        Add Tasks
      </Button>
    </div>
  );
}
