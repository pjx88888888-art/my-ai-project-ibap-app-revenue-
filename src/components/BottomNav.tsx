/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, FileText, MessageSquare, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { id: 'main', label: '经营动态', icon: Home, active: true },
    { id: 'info', label: '资讯信息', icon: FileText },
    { id: 'ask', label: '智能问数', icon: MessageSquare },
    { id: 'me', label: '我的', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[450px] mx-auto bg-white/90 backdrop-blur-md flex justify-around pt-3 pb-6 border-t border-gray-100 z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
            item.active ? 'text-[#1b63d6] scale-110' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} />
          <span className={`text-[10px] font-medium ${item.active ? 'font-bold' : ''}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
