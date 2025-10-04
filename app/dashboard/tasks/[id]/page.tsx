'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTask, updateTask, createTaskComment } from '../hooks';
import { useUsers } from '../../companies/[id]/hooks';
import styles from './task.module.css';

export default function TaskDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { task, isLoading, error, mutate } = useTask(id);
  const { users } = useUsers(id);
  console.log('crb_task', task)
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  const statusMap: Record<string, string> = {
    pending: 'Чакаща',
    in_progress: 'В процес',
    completed: 'Завършена',
  };

  return task && (
    <div className={styles.task}>
      <h2 className={styles.title}>{task?.title}</h2>

      <div className={styles.taskContainer}>
        <div className={styles.head}>
          <ul className={styles.boxes}>
            <li className={styles.box}>
              <h4>Deadline</h4>
              <p>{task.deadline}</p>
            </li>

            <li className={styles.box}>
              <h4>Creator</h4>
              <p>{task.creator.name}</p>
            </li>

            <li className={styles.box}>
              <h4>Responsible</h4>
              <p>{task.assignee.name}</p>
            </li>

            <li className={styles.box}>
              <h4>Status</h4>
              <p>{statusMap[task.status]}</p>
            </li>

            <li className={styles.box}>
              <h4>Recurring</h4>
              <p>{task.reporter.name}</p>
            </li>
          </ul>
        </div>

        <div className={styles.description}>
          {task?.description}
        </div>

        {task.comments && <ul className={styles.comments}>
          {task.comments.map((comment: any, index: any) => <li key={index} className={styles.comment}>
              <p className={styles.author}>{comment.author.name}</p> 

              <p className={styles.text}>{comment.text}</p>

              <p className={styles.date}>{comment.createdAt}</p> 
            </li>
          )}
        </ul>}
      </div>
    </div>
  );
}