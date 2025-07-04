import Layout from "../../hocs/Layout";
import Banner from "../../components/navigation/Banner";
import DashboardCourse from "../../components/course/DashboardCourse";
import { useEffect } from "react";
const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
 
    }, []);
    return (
        <Layout>
            <div className="text-blue-500">
                <Banner />
                
                <DashboardCourse />
            </div>
        </Layout>
    );
};

export default Home;
