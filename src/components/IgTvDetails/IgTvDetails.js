"use client";

import FaqSection from '@/components/common/Faq/Faq';
import ThreeStepGuide from '@/components/common/AboutProcess/AboutProcess';
import AppPromotion from '@/components/common/AppPromotion/AppPromotion';
import DownloadDescription from '@/components/common/DownloadDescription/DownloadDescription';
import Images from "../../../public/images/index";
import { igtvFaq, igtvSteps } from '../../dataStore/data';

export default function Page() {
    return (
        <>
            <ThreeStepGuide
                image={Images.Download}
                title="Download Instagram IGTV Videos"
                description="Discover a seamless, speedy, and efficient way to download Instagram videos using our IGTV Video Downloader. As you browse through Instagram, you might stumble upon an IGTV video that catches your eye. Now, saving it to your device is as simple as a breeze. Just copy the video URL, paste it into the designated field on the InstaDl page, and hit the Download button. Voila! Your video is ready for offline viewing."
                heading="How to download IGTV Instagram?"
                smallDescription="To download IGTV video follow a few easy steps, described below."
                steps={igtvSteps}
            />

            <AppPromotion />
            <DownloadDescription
                heading="Download IGTV Videos"
                headingDescription="Instagram is a social media platform that allows users to post stories and share them with their followers. You can also create stories and highlights similar to Snapchat stories. Our website allows you to download Instagram story with one click!"
                image={Images.videoImg2}
                title="IGTV Downloader"
                description="After clicking the Download button, you want to check if the video has been downloaded. So, no matter what device you use, a smartphone, a tablet, a Mac, or a PC, the IGTV video will be downloaded in the default Download folder. There should be no compatibility problems."
            />

            <FaqSection
                title="Frequently asked questions (FAQ)"
                intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app IGTV downloader. If you can't find the answer to your question, feel free to ask through email on our contact page."
                image={Images.Download}
                faqs={igtvFaq}
            />
        </>
    );
}
