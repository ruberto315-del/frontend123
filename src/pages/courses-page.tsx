import { Link, useLocation } from "react-router"

export const CoursesPage = () => {
    const location = useLocation()
    return (
        <div>
        <Link to="/" className={`mr-4 ${location.pathname === '/' ? 'text-primary' : ''}`}>Home</Link>
        <Link to="/courses" className={`mr-4 ${location.pathname === '/' ? 'text-primary' : ''}`}>Courses</Link>
        </div>
        
)
}