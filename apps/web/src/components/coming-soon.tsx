import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-light mb-6 text-gray-900">{title}</h1>
        {description && (
          <p className="text-xl text-gray-500 mb-8 font-light">
            {description}
          </p>
        )}
        <p className="text-lg text-gray-400 mb-12">
          We're working hard to bring you this feature. Check back soon!
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
