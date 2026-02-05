export default function Dropdown({ title, items = [] }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1">
        {title}
      </button>

      <div className="absolute top-full left-0 mt-3 w-56 bg-white text-black
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all shadow-lg">
        
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link || '#'}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
