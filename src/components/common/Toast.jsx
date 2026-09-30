import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, AlertCircle, Info, X, BookOpen, Code, Trophy, Flame, Award, Unlock, LogIn, LogOut, RotateCcw } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  BookOpen,
  Code,
  Trophy,
  Flame,
  Award,
  Unlock,
  LogIn,
  LogOut,
  RotateCcw
};

export const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => {
        const IconComponent = ICON_MAP[toast.icon] || Sparkles;
        const iconColor =
          toast.type === 'success' ? '#10b981' :
          toast.type === 'warning' ? '#f59e0b' :
          toast.type === 'info' ? '#3b82f6' : '#8b5cf6';

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            <IconComponent size={22} color={iconColor} style={{ marginTop: 2, flexShrink: 0 }} />
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-desc">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: '#94a3b8', padding: 2 }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
