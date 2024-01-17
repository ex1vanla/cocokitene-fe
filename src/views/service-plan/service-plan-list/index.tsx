import { useListPlan } from '@/stores/service-plan/hooks'
import PlanItem from './plan-card'

import { useCallback, useEffect, useState } from 'react'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { getArrSlider } from '@/utils/plan'

var banner = [
    {
        banner: 'https://rungasia.com/wp-content/uploads/2022/04/chim-hoang-yen-dau-hoa-cuc-1024x598.jpg',
        id: 1,
        planName: 'free',
        description: 'it will help children be more active',
        maxStorage: 2,
        maxMeeting: 2,
        price: 0,
        maxShareholderAccount: 3,
    },
    {
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwnUvxwvPFNyMxU0MoY5j7MTmdqWSxPDOP1elnCvw9m1-xVKePAOKY1lH5XO4wRsshOTI&usqp=CAU',
        id: 2,
        planName: 'trial',
        description: 'it will help children be more active',
        maxStorage: 4,
        maxMeeting: 4,
        price: 15,
        maxShareholderAccount: 10,
    },
    {
        banner: 'https://rungasia.com/wp-content/uploads/2022/04/chim-hoang-yen-dau-hoa-cuc-1024x598.jpg',
        id: 3,
        planName: 'pay_of_month',
        description: 'it will help children be more active',
        maxStorage: 10,
        maxMeeting: 10,
        price: 100,
        maxShareholderAccount: 30,
    },
    {
        banner: 'https://kenh14cdn.com/k:A3YmnWqkHeph7OwGyu6TwbX57tgTw/Image/2014/01/01B/1a-bf85e-672fd/khoa-hoc-dua-ra-cong-thuc-thu-vi-de-tao-ra-rong-lua.jpg',
        id: 4,
        planName: 'pay_of_month22222',
        description: 'it will help children be more active',
        maxStorage: 10,
        maxMeeting: 10,
        price: 100000,
        maxShareholderAccount: 30,
    },
]

var intervalId: any

const SliderBanner = () => {
    // const { banner } = useSelector((state) => state.app);

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(2)
    const [isAuto, setIsAuto] = useState(true)

    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // console.log(banner);
    //Animation banner
    useEffect(() => {
        if (isAuto) {
            intervalId = setInterval(() => {
                hadleAnimationBanner()
            }, 2000)
        }
        return () => {
            // console.log("clearn");
            intervalId && clearInterval(intervalId)
        }
    }, [min, max, isAuto])

    const hadleAnimationBanner = (step = 1) => {
        const sliderElements = document.getElementsByClassName(
            'slider-item',
        ) as HTMLCollectionOf<HTMLElement>
        const list = getArrSlider(min, max, sliderElements.length - 1)
        // console.log({list ,max ,min});
        for (let i = 0; i < sliderElements.length; i++) {
            //Delete className
            sliderElements[i].classList?.remove(
                'animate-slide-right',
                'order-last',
                'z-20',
            )
            sliderElements[i].classList?.remove(
                'animate-slide-left',
                'order-first',
                'z-10',
            )
            sliderElements[i].classList?.remove(
                'animate-slide-left1',
                'order-2',
                'z-10',
            )
            //Hidden or Show banner
            if (list.some((item) => item === i)) {
                sliderElements[i].style.cssText = `display : block`
            } else {
                sliderElements[i].style.cssText = `display : none`
            }
        }
        //Add animation
        list.forEach((item) => {
            if (item === max) {
                sliderElements[item]?.classList?.add(
                    'animate-slide-right',
                    'order-last',
                    'z-20',
                )
            } else if (item === min) {
                sliderElements[item]?.classList?.add(
                    'animate-slide-left',
                    'order-first',
                    'z-10',
                )
            } else {
                sliderElements[item]?.classList?.add(
                    'animate-slide-left1',
                    'order-2',
                    'z-10',
                )
            }
        })

        if (step === 1) {
            setMin((prev) =>
                prev === sliderElements.length - 1 ? 0 : prev + step,
            )
            setMax((prev) =>
                prev === sliderElements.length - 1 ? 0 : prev + step,
            )
        }
        if (step === -1) {
            setMin((prev) =>
                prev === 0 ? sliderElements.length - 1 : prev + step,
            )
            setMax((prev) =>
                prev === 0 ? sliderElements.length - 1 : prev + step,
            )
        }
    }

    const hadlePrevBanner = useCallback(() => {
        intervalId && clearInterval(intervalId)
        setIsAuto(false)
        hadleAnimationBanner(1)
    }, [min, max])

    const handleNextBanner = useCallback(() => {
        intervalId && clearInterval(intervalId)
        setIsAuto(false)
        hadleAnimationBanner(-1)
    }, [min, max])

    //Truy cap vao Bannrer
    // const handleClickBanner = (item) => {
    //     if (item?.type === 1) {
    //         dispatch(actions.setCurSongId(item.encodeId))
    //         dispatch(actions.play(true))
    //         dispatch(actions.setPlaylist(null))
    //     } else if (item?.type === 4) {
    //         // console.log(item);
    //         const albumPath = item?.link?.split('.')[0]
    //         console.log(albumPath)
    //         // dispatch(actions.playAlbum(true));
    //         navigate(albumPath)
    //     } else {
    //         dispatch(actions.setPlaylist(null))
    //     }
    // }
    // console.log(banner);
    return (
        <div
            className="relative w-full overflow-hidden px-[59px]"
            onMouseEnter={() => {
                setIsAuto(false)
            }}
            onMouseLeave={() => {
                setIsAuto(true)
            }}
        >
            {!isAuto && (
                <button
                    className="border-black] absolute left-[59px] top-1/2 z-30 rounded-full border bg-[rgba(255,255,255,0.3)] p-2 text-white"
                    onClick={hadlePrevBanner}
                >
                    <CaretLeftOutlined size={24} />
                </button>
            )}
            <div className="flex w-full gap-8 pt-8">
                {banner?.map((item, index) => {
                    return (
                        <img
                            key={item.id}
                            src={item.banner}
                            onClick={() => {
                                // handleClickBanner(item)
                            }}
                            className={`slider-item w-[30%] flex-1 rounded-[8px] object-contain ${
                                index <= 2 ? 'block' : 'hidden'
                            }`}
                            alt=""
                        />
                    )
                })}
            </div>
            {!isAuto && (
                <button
                    className="border-black] absolute right-[59px] top-1/2 z-30 rounded-full border bg-[rgba(255,255,255,0.3)] p-2 text-white"
                    onClick={handleNextBanner}
                >
                    <CaretRightOutlined size={24} />
                </button>
            )}
        </div>
    )
}

export default SliderBanner
