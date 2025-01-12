import AboutSection from '@/views/landing/header-about-section/about-section'
import Masks from './masks'
import dynamic from 'next/dynamic'
// import LandingHeader from '@/views/landing/header-about-section/header'

const LandingHeader = dynamic(
    () => import('@/views/landing/header-about-section/header'),
    { ssr: false },
)

const HeaderAboutSection = () => {
    return (
        <div className="relative">
            <LandingHeader />
            <div
                id="abouts"
                className="relative h-[725px] [clip-path:polygon(0_0,100%_0,100%_587px,0_100%)]"
            >
                <AboutSection />
                <Masks />
            </div>
        </div>
    )
}

export default HeaderAboutSection
