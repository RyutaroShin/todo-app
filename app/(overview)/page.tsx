'use client';

import React, { useState } from 'react';
import TaskList from '../../components/TaskList';
import { addDummyTask } from '../../lib/taskStorage';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(false);

  const handleAddDummy = () => {
    addDummyTask();
    setRefreshKey(prev => !prev);
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">タスク一覧ページ</h1>
      <button
        onClick={handleAddDummy}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ダミータスクを追加
      </button>
      <TaskList refresh={refreshKey} />
    </main>
  );
};

export default Page;
