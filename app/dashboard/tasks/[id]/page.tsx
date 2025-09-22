'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTask, updateTask, createTaskComment } from '../hooks';
import { useUsers } from '../../companies/[id]/hooks';
import { PencilSquareIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Comment {
  text: string;
  author: { _id: string; name: string };
  createdAt: Date;
}

interface Task {
  _id: string;
  title: string;
  description?: string;
  deadline?: string;
  isRecurring: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
  status: 'pending' | 'in_progress' | 'completed';
  creator: { _id: string; name: string };
  assignee: { _id: string; name: string };
  comments?: Comment[];
}

interface User {
  _id: string;
  name: string;
}

export default function TaskDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { task, isLoading, error, mutate } = useTask(id);
  const { users } = useUsers(id);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Task | null>(null);
  const [formErrors, setFormErrors] = useState({
    title: '',
    status: '',
    creator: '',
    assignee: '',
  });

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  if (isLoading) {
    return (
      <div className="bg-gray-800 min-h-screen p-8 flex items-center justify-center">
        <div className="text-white text-xl font-semibold">Зареждане...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="bg-gray-800 min-h-screen p-8">
        <div className="bg-[#0092b5] rounded-lg shadow-2xl p-10 w-full">
          <h1 className="text-3xl font-bold text-white mb-4">Задачата не е намерена</h1>
          <p className="text-gray-200 text-lg">Няма задача с този идентификатор. Моля, проверете URL или създайте нова задача.</p>
        </div>
      </div>
    );
  }

  const getUserName = (user: { _id: string; name: string } | string) => {
    if (typeof user === 'string') return user || 'Непознат';
    return user?.name || user?._id || 'Непознат';
  };

  const handleEditOpen = () => {
    setFormData(task);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateEditForm = () => {
    const errors = { title: '', status: '', creator: '', assignee: '' };
    let isValid = true;

    if (!formData?.title.trim()) {
      errors.title = 'Заглавието е задължително';
      isValid = false;
    }

    if (!formData?.status) {
      errors.status = 'Статусът е задължителен';
      isValid = false;
    }

    if (!formData?.creator) {
      errors.creator = 'Създателят е задължителен';
      isValid = false;
    }

    if (!formData?.assignee) {
      errors.assignee = 'Отговорникът е задължителен';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEditForm() || !formData) return;

    try {
      const data = {
        ...formData,
        creator: typeof formData.creator === 'object' ? formData.creator._id : formData.creator,
        assignee: typeof formData.assignee === 'object' ? formData.assignee._id : formData.assignee,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
      };
      await updateTask(id, data);
      mutate();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Грешка при обновяване на задачата:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setCommentError('Коментарът е задължителен');
      return;
    }

    try {
      const currentUserId = 'current_user_id'; // Замени с реален ID от автентикация
      const newComment = { text: commentText, author: currentUserId };
      await createTaskComment({ ...newComment, _id: id });
      mutate();
      setCommentText('');
      setCommentError('');
    } catch (error) {
      console.error('Грешка при добавяне на коментар:', error);
      setCommentError('Неуспешно добавяне на коментар');
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-8">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Основно съдържание */}
        <div className="flex-1 bg-[#0092b5] rounded-lg shadow-2xl p-10">
          <div className="mb-8 border-b border-gray-600 pb-4">
            <h1 className="text-5xl font-bold text-white">{task.title}</h1>
          </div>
          <div className="mb-12">
            <p className="text-sm font-medium text-gray-200 mb-2">Описание</p>
            <div className="min-h-[200px] bg-gray-800 rounded-lg p-6 text-gray-100 text-lg">
              {task.description || 'Няма описание'}
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Коментари</h2>
            {task.comments?.length ? (
              <div className="space-y-6">
                {task.comments.map((comment: any, index: any) => (
                  <div key={index} className="flex gap-4 bg-gray-700 rounded-lg p-6 shadow-md">
                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {getUserName(comment.author)[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-200 mb-2">
                        <span className="font-semibold">{getUserName(comment.author)}</span> -{' '}
                        {new Date(comment.createdAt).toLocaleString('bg-BG')}
                      </p>
                      <p className="text-gray-100 text-lg">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-200 text-lg">Няма коментари.</p>
            )}
            <form onSubmit={handleAddComment} className="mt-8">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                placeholder="Добави коментар..."
                rows={5}
              />
              {commentError && <p className="text-red-400 text-sm mt-2">{commentError}</p>}
              <button
                type="submit"
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 mt-4"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                Добави коментар
              </button>
            </form>
          </div>
        </div>

        {/* Сайдбар */}
        <div className="w-full lg:w-80 bg-[#007a94] rounded-lg shadow-2xl p-6 text-white">
          <div className="flex justify-end mb-6">
            <button
              onClick={handleEditOpen}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              <PencilSquareIcon className="w-5 h-5" />
              Редактирай
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-200 mb-2">Краен срок</p>
              <p className="text-gray-100 text-lg">
                {task.deadline ? new Date(task.deadline).toLocaleDateString('bg-BG') : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200 mb-2">Създател</p>
              <p className="text-gray-100 text-lg">{getUserName(task.creator)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200 mb-2">Отговорник</p>
              <p className="text-gray-100 text-lg">{getUserName(task.assignee)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200 mb-2">Статус</p>
              <p className="text-gray-100 text-lg">
                {task.status === 'pending' ? 'Чакаща' : task.status === 'in_progress' ? 'В процес' : 'Завършена'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200 mb-2">Повтарящо се</p>
              <p className="text-gray-100 text-lg">{task.isRecurring ? 'Да' : 'Не'}</p>
              {task.isRecurring && (
                <>
                  <p className="text-sm font-medium text-gray-200 mb-2 mt-4">Интервал</p>
                  <p className="text-gray-100 text-lg">
                    {task.recurrenceInterval === 'daily' ? 'Дневно' : task.recurrenceInterval === 'weekly' ? 'Седмично' : 'Месечно'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Модал за редактиране */}
      {isEditModalOpen && formData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0092b5] rounded-lg shadow-2xl p-8 w-full max-w-xl text-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Редактирай задача</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-200 hover:text-white transition duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Заглавие</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
                {formErrors.title && <p className="text-red-400 text-sm mt-2">{formErrors.title}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Описание</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                  rows={6}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Създател</label>
                <select
                  name="creator"
                  value={typeof formData.creator === 'object' ? formData.creator._id : formData.creator}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери създател...</option>
                  {users?.map((user: User) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {formErrors.creator && <p className="text-red-400 text-sm mt-2">{formErrors.creator}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Отговорник</label>
                <select
                  name="assignee"
                  value={typeof formData.assignee === 'object' ? formData.assignee._id : formData.assignee}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="">Избери отговорник...</option>
                  {users?.map((user: User) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {formErrors.assignee && <p className="text-red-400 text-sm mt-2">{formErrors.assignee}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Краен срок</label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Статус</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  <option value="pending">Чакаща</option>
                  <option value="in_progress">В процес</option>
                  <option value="completed">Завършена</option>
                </select>
                {formErrors.status && <p className="text-red-400 text-sm mt-2">{formErrors.status}</p>}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                  Отказ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  Запази
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}