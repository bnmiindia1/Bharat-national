export default function Dropdown({ title }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1">
        {title}
      </button>

      <div className="absolute top-full left-0 mt-3 w-48 bg-white text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <a className="block px-4 py-3 hover:bg-gray-100" href="#">Option 1</a>
        <a className="block px-4 py-3 hover:bg-gray-100" href="#">Option 2</a>
        <a className="block px-4 py-3 hover:bg-gray-100" href="#">Option 3</a>
      </div>
    </div>
  )
}
