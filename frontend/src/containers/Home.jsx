import Layout from "../hocs/Layout";
import Banner from "../components/home/Banner";
import Testimonials from "../components/home/Testimonials";
import About from "./About";
import { useEffect } from "react";
const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
 
    }, []);
    return (
        <Layout>
            <div className="text-blue-500">
                <Banner />
                <Testimonials />
                <About />
            </div>
        </Layout>
    );
};

export default Home;
