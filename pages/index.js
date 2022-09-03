import BlogBanner from '../components/BlogBanner'
import BlogPosts from '../components/BlogPosts'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <BlogBanner />
      <div className={styles.flex__items}>
        <BlogPosts />
        <Sidebar />
      </div>
    </div>
  )
}
