import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex gap-4">
        <Link href="/" className="hover:text-gray-300">
          首页
        </Link>
        <Link href="/images" className="hover:text-gray-300">
          上传
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          关于
        </Link>
      </div>
    </nav>
  );
} 