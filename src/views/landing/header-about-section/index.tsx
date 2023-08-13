import AboutSection from '@/views/landing/header-about-section/about-section'
import LandingHeader from '@/views/landing/header-about-section/header'

const HeaderAboutSection = () => {
    return (
        <div
            id="header-about-section"
            className="relative min-h-[85vh] bg-landing-about-bg  bg-cover bg-top [clip-path:polygon(0_0,100%_0,100%_70vh,0_100%)]"
        >
            <LandingHeader />
            <AboutSection />
        </div>
    )
}

export default HeaderAboutSection
