'use client';

import { useState } from 'react';

interface WaitlistFormProps {
  title: string;
  description?: string;
}

export function WaitlistForm({ title, description }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, page: title }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks! We\'ll notify you when this feature launches.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="mb-4 text-5xl">✓</div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">You're on the list!</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          Join another waitlist
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 text-center">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 mb-8 text-center">
          {description}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-8 py-3 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>

        {status === 'error' && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}

        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe anytime. No spam, ever.
        </p>
      </form>
    </div>
  );
}
