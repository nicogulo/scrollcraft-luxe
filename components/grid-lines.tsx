export default function GridLines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="mx-auto max-w-7xl h-full px-6">
        <div className="grid grid-cols-6 lg:grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`border-r border-[#1C1917]/[0.03] ${i >= 6 ? 'hidden lg:block' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
