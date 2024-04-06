import Link from "next/link";
export default function Admin() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Link
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        href="/admin/addbook"
      >
        Add Book
      </Link>
      <Link
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out"
        href="/admin/searchbook"
      >
        Search Book
      </Link>
    </div>
  );
}
