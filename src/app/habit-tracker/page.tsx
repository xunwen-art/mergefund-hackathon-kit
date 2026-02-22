'use client';

import { useState } from 'react';

interface Habit {
  id: number;
  name: string;
  category: string;
  streak: number;
  completedToday: boolean;
  completions: number;
  targetDays: number;
  icon: string;
}

const mockHabits: Habit[] = [
  { id: 1, name: 'Drink 8 glasses of water', category: 'health', streak: 15, completedToday: true, completions: 15, targetDays: 30, icon: '💧' },
  { id: 2, name: 'Exercise 30 minutes', category: 'fitness', streak: 8, completedToday: false, completions: 8, targetDays: 30, icon: '🏃' },
  { id: 3, name: 'Read 30 minutes', category: 'learning', streak: 22, completedToday: true, completions: 22, targetDays: 30, icon: '📚' },
  { id: 4, name: 'Meditate 10 minutes', category: 'health', streak: 12, completedToday: false, completions: 12, targetDays: 30, icon: '🧘' },
  { id: 5, name: 'Code for 1 hour', category: 'productivity', streak: 5, completedToday: true, completions: 5, targetDays: 30, icon: '💻' },
  { id: 6, name: 'Write in journal', category: 'productivity', streak: 18, completedToday: true, completions: 18, targetDays: 30, icon: '✍️' },
];

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? {...h, completedToday: !h.completedToday, streak: h.completedToday ? h.streak - 1 : h.streak + 1} : h));
  };
  const completedCount = habits.filter(h => h.completedToday).length;
  const completionRate = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-2">🎯 Habit Tracker</h1>
        <p className="text-center text-gray-600 text-lg mb-8">Build better habits, one day at a time</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6"><div className="text-3xl font-bold text-purple-600">{habits.length}</div><div className="text-gray-600">Total Habits</div></div>
          <div className="bg-white rounded-xl shadow-lg p-6"><div className="text-3xl font-bold text-green-600">{completedCount}/{habits.length}</div><div className="text-gray-600">Completed Today</div></div>
          <div className="bg-white rounded-xl shadow-lg p-6"><div className="text-3xl font-bold text-orange-600">{completionRate}%</div><div className="text-gray-600">Completion Rate</div></div>
          <div className="bg-white rounded-xl shadow-lg p-6"><div className="text-3xl font-bold text-blue-600">{Math.max(...habits.map(h => h.streak), 0)}</div><div className="text-gray-600">Best Streak</div></div>
        </div>

        <div className="space-y-4">
          {habits.map((habit) => (
            <div key={habit.id} className={`bg-white rounded-xl shadow-lg p-6 ${habit.completedToday ? 'border-2 border-green-500' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleHabit(habit.id)} className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${habit.completedToday ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                    {habit.completedToday ? '✅' : '⭕'}
                  </button>
                  <div>
                    <h3 className="text-xl font-bold">{habit.icon} {habit.name}</h3>
                    <div className="flex gap-3 mt-1 text-gray-600">
                      <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">{habit.category}</span>
                      <span>🔥 {habit.streak} days</span>
                      <span>✓ {habit.completions}/{habit.targetDays}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1"><span>Progress</span><span>{Math.round((habit.completions / habit.targetDays) * 100)}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className="h-3 rounded-full bg-purple-500 transition-all" style={{ width: `${Math.min((habit.completions / habit.targetDays) * 100, 100)}%` }}/></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
