export function AppleHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-[980px]">
        <nav className="flex h-12 items-center justify-between px-4 md:px-0">
          <a href="/" className="text-[21px] font-semibold">RosterUp</a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/browse/listings" className="text-sm font-medium text-gray-800 hover:text-blue-500">Teams</a>
            <a href="/players" className="text-sm font-medium text-gray-800 hover:text-blue-500">Players</a>
            <a href="/coaches" className="text-sm font-medium text-gray-800 hover:text-blue-500">Coaches</a>
            <a href="/how-it-works" className="text-sm font-medium text-gray-800 hover:text-blue-500">How It Works</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-sm font-medium text-gray-800 hover:text-blue-500">Sign In</a>
            <a href="/auth/signup" className="text-sm font-medium px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600">Get Started</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
