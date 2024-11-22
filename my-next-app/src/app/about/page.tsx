import styles from './about.module.css'
import Link from 'next/link'

function AboutBottom() {
  return (
    <div className="flex justify-center items-center">
      <Link href="/">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">返回首页</button>
      </Link>
    </div>
  )
}


export default function AboutPage() {
  return (
    // 混合使用 Tailwind 和 CSS Module
    <div className={`min-h-screen bg-background ${styles.aboutContainer}`}>
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">关于我们</h1>
        
        {/* 使用自定义动画效果的部分 */}
        <section className={`
          bg-white dark:bg-gray-800 
          rounded-lg p-6 shadow-lg mb-8
          ${styles.storySection}
        `}>
          <h2 className="text-2xl font-semibold mb-4">我们的故事</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            我们是一个充满激情的团队，致力于创造优秀的产品和服务。
            通过不断创新和努力，我们希望为用户带来更好的体验。
          </p>
        </section>

        {/* 联系方式部分 */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span>📧</span>
              <a 
                href="mailto:contact@example.com" 
                className={`text-blue-500 ${styles.contactLink}`}
              >
                contact@example.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span>📱</span>
              <span>123-456-7890</span>
            </p>
          </div>
        </section>
        <AboutBottom />
      </main>
    </div>
  )
}