import img1 from "../assets/images/onboard1.png";
import img2 from "../assets/images/onboard2.png";
import img3 from "../assets/images/onboard3.png";

import food from "../assets/Icons/Food.svg";
import beauty from "../assets/Icons/beauty.svg";
import electronics from "../assets/Icons/electronics.svg";
import fashion from "../assets/Icons/fashion.svg";
import fitness from "../assets/Icons/fitness.svg";
import hotel from "../assets/Icons/hotel.svg";
import liquor from "../assets/Icons/liquor.svg";
import pharmacy from "../assets/Icons/pharmacy.svg";
import stationary from "../assets/Icons/stationary.svg";

const Labels = {
  en: {
    onboarding: {
      title: "It’s easy to get\nyour store listed with\nVyapaar Launchpad",
      steps: [
        {
          heading: "Enter your Store Details",
          desc: "Provide your shop name, address, and other essential information. This helps customers find and learn about your offerings.",
          img: img1,
        },
        {
          heading: "Enter Seller Details",
          desc: "Share your name, aadhar, PAN card and other legal documents. This ensures customers can easily reach you for inquiries and orders.",
          img: img2,
        },
        {
          heading: "Enter Bank Details",
          desc: "Provide your bank account number and bank name securely. This enables smooth financial transactions for your business.",
          img: img3,
        },
      ],
    },
    step2: {
      heading: "Which of these best describes your products?",
      cards: [
        { img: food, label: "Food" },
        { img: fashion, label: "Fashion" },
        { img: electronics, label: "Electronics" },
        { img: beauty, label: "Beauty" },
        { img: pharmacy, label: "Pharmacy" },
        { img: fitness, label: "Fitness" },
        { img: liquor, label: "Liquor" },
        { img: stationary, label: "Stationary" },
        { img: hotel, label: "Hotel" },
      ],
    },
    step3: {
      heading: "Where's your Store located?",
      desc: "Your address is only shared with buyers after they've made a order.",
      placeholder: "Enter your address",
      currentLocation: "Use current location",
    },
    step4: {
      heading: "Confirm your address",
      desc: "Your address is only shared with guests after they've made a reservation.",
      flatHouse: "Flat, house, etc. (if applicable)",
      street: "Street address",
      landmark: "Nearby landmark (if applicable)",
      district: "District/locality (if applicable)",
      city: "City / town",
      pinCode: "PIN code",
    },
    step5: {
      heading: "Enter your Shop Name",
      desc: "Short titles work best. Have fun with it – you can always change it later.",
      placeHolder: "Enter a title",
    },
    step6: {
      heading: "Add some photos of your shop",
      desc: "You'll need 5 photos to get started. You can add more or make changes later.",
      txt1: "Drag your photos here",
      txt2: "Choose at least 5 photos",
      txt3: "Upload from your device",
      txt4: "photos uploaded",
    },
  },
  hi: {
    onboarding: {
      title: "अपनी दुकान को\nVyapaar Launchpad\nपर सूचीबद्ध करना आसान है",
      steps: [
        {
          heading: "अपनी दुकान का विवरण दर्ज करें",
          desc: "अपनी दुकान का नाम, पता और अन्य आवश्यक जानकारी प्रदान करें। इससे ग्राहकों को आपके उत्पादों के बारे में जानने में मदद मिलती है।",
          img: img1,
        },
        {
          heading: "विक्रेता विवरण दर्ज करें",
          desc: "अपना नाम, आधार, पैन कार्ड और अन्य कानूनी दस्तावेज साझा करें। इससे ग्राहक आसानी से आपके पास पूछताछ और ऑर्डर के लिए पहुँच सकते हैं।",
          img: img2,
        },
        {
          heading: "बैंक विवरण दर्ज करें",
          desc: "अपने बैंक खाता नंबर और बैंक का नाम सुरक्षित रूप से प्रदान करें। इससे आपके व्यवसाय के लिए सहज वित्तीय लेन-देन सक्षम होते हैं।",
          img: img3,
        },
      ],
    },
    step2: {
      heading: "इनमें से कौन सा आपके उत्पादों का सबसे अच्छा वर्णन करता है?",
      cards: [
        { img: food, label: "खाना" },
        { img: fashion, label: "फैशन" },
        { img: electronics, label: "इलेक्ट्रॉनिक्स" },
        { img: beauty, label: "सौंदर्य" },
        { img: pharmacy, label: "फार्मेसी" },
        { img: fitness, label: "फिटनेस" },
        { img: liquor, label: "मदिरा" },
        { img: stationary, label: "स्टेशनरी" },
        { img: hotel, label: "होटल" },
      ],
    },
    step3: {
      heading: "आपकी दुकान कहाँ स्थित है?",
      desc: "आपका पता केवल तभी साझा किया जाएगा जब ग्राहकों ने ऑर्डर किया हो।",
      placeholder: "अपना पता दर्ज करें",
      currentLocation: "वर्तमान स्थान का उपयोग करें",
    },
    step4: {
      heading: "अपना पता पुष्टि करें",
      desc: "आपका पता केवल तभी साझा किया जाएगा जब मेहमानों ने आरक्षण किया हो।",
      flatHouse: "फ्लैट, मकान, आदि (यदि लागू हो)",
      street: "सड़क का पता",
      landmark: "नजदीकी लैंडमार्क (यदि लागू हो)",
      district: "जिला/क्षेत्र (यदि लागू हो)",
      city: "शहर / कस्बा",
      pinCode: "पिन कोड",
    },
    step5: {
      heading: "अपनी दुकान का नाम दर्ज करें",
      desc: "छोटे शीर्षक सबसे अच्छे होते हैं। इसका आनंद लें - आप इसे बाद में बदल सकते हैं।",
      placeHolder: "एक शीर्षक दर्ज करें",
    },
    step6: {
      heading: "अपनी दुकान की कुछ तस्वीरें जोड़ें",
      desc: "शुरू करने के लिए आपको 5 तस्वीरों की आवश्यकता होगी। आप बाद में और जोड़ या बदलाव कर सकते हैं।",
      txt1: "अपनी तस्वीरें यहां खींचें",
      txt2: "कम से कम 5 तस्वीरें चुनें",
      txt3: "अपने डिवाइस से अपलोड करें",
      txt4: "फोटो अपलोड किए गए",
    },
  },
};

const GOOGLE_MAPS_API_KEY = "AIzaSyCFAWnROEYsHMvi-pZCLeyBGs_IabmSITs";

export { GOOGLE_MAPS_API_KEY };
export default Labels;
