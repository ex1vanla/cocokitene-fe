import AboutSection from '@/views/landing/header-about-section/about-section'
import LandingHeader from '@/views/landing/header-about-section/header'
import Masks from './masks'

const HeaderAboutSection = () => {
    return (
        <div className="relative">
            <LandingHeader />
            <div
                id="#abouts"
                className="relative min-h-[85vh]  [clip-path:polygon(0_0,100%_0,100%_70vh,0_100%)]"
            >
                <AboutSection />
                <Masks />
            </div>
        </div>
    )
}

export default HeaderAboutSection
