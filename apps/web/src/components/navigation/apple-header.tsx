import Image from 'next/image';

export function AppleHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-[980px]">
        <nav className="flex h-14 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/rosterup-logo.png"
              alt="RosterUp"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </a>

          {/* Centered Navigation */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-8">
            <a
              href="/browse/listings"
              className="text-[14px] font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Teams
            </a>
            <a
              href="/players"
              className="text-[14px] font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Players
            </a>
            <a
              href="/coaches"
              className="text-[14px] font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Coaches
            </a>
            <a
              href="/how-it-works"
              className="text-[14px] font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              How It Works
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <a
              href="/login"
              className="text-[14px] font-medium text-gray-700 hover:text-blue-500 transition-colors px-3 py-1.5"
            >
              Sign In
            </a>
            <a
              href="/auth/signup"
              className="text-[14px] font-medium px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
