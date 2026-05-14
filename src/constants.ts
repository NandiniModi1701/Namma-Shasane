export interface Inscription {
  id?: string;
  title: string;
  description: string;
  translationKannada: string;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  epoch: string;
  status: 'normal' | 'damaged';
  createdAt: any;
}

export const INITIAL_SHASANAS: Inscription[] = [
  {
    title: "Halmidi Inscription",
    description: "The oldest known Kannada inscription, dating back to 450 CE. It records a land grant given to an individual for his bravery in battle.",
    translationKannada: "ಹಲ್ಮಿಡಿ ಶಾಸನ: ಇದು ಕನ್ನಡದ ಅತ್ಯಂತ ಹಳೆಯ ಶಾಸನ (ಕ್ರಿ.ಶ. ೪೫೦). ಯುದ್ಧದಲ್ಲಿ ಪರಾಕ್ರಮ ತೋರಿದ ವ್ಯಕ್ತಿಯೊಬ್ಬನಿಗೆ ನೀಡಿದ ಭೂದಾನವನ್ನು ಇದು ದಾಖಲಿಸುತ್ತದೆ.",
    location: { lat: 13.1558, lng: 75.8752 },
    epoch: "Kadamba Dynasty",
    status: 'normal',
    createdAt: new Date()
  },
  {
    title: "Badami Cave Inscription",
    description: "Found in Cave 3 of Badami, dating to 578 CE. It mentions the construction of a Vishnu temple by Mangalesha.",
    translationKannada: "ಬಾದಾಮಿ ಶಾಸನ: ಇದು ಬಾದಾಮಿಯ ೩ನೇ ಗುಹೆಯಲ್ಲಿದೆ (ಕ್ರಿ.ಶ. ೫೭೮). ಮಂಗಳೇಶನು ವಿಷ್ಣು ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದ ಬಗ್ಗೆ ಇದು ತಿಳಿಸುತ್ತದೆ.",
    location: { lat: 15.9189, lng: 75.6826 },
    epoch: "Chalukya Dynasty",
    status: 'normal',
    createdAt: new Date()
  },
  {
    title: "Aihole Inscription",
    description: "A famous eulogy of Pulakeshin II, written by Ravikirti. It describes his conquests and victories.",
    translationKannada: "ಐಹೊಳೆ ಶಾಸನ: ಇದು ರವಿಕೀರ್ತಿಯಿಂದ ರಚಿಸಲ್ಪಟ್ಟ ಇಮ್ಮಡಿ ಪುಲಕೇಶಿಯ ಪ್ರಶಸ್ತಿ (ಕ್ರಿ.ಶ. ೬೩೪). ಅವನ ದಿಗ್ವಿಜಯಗಳ ಬಗ್ಗೆ ಇಲ್ಲಿ ವಿವರವಿದೆ.",
    location: { lat: 16.0189, lng: 75.8826 },
    epoch: "Chalukya Dynasty",
    status: 'normal',
    createdAt: new Date()
  },
  {
    title: "Belur Inscription",
    description: "Describes the 1117 CE consecration of the Chennakesava Temple by King Vishnuvardhana to commemorate a victory.",
    translationKannada: "ಬೇಲೂರು ಶಾಸನ: ಹೊಯ್ಸಳ ರಾಜ ವಿಷ್ಣುವರ್ಧನನು ಚನ್ನಕೇಶವ ದೇವಾಲಯವನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿದ ಬಗ್ಗೆ ತಿಳಿಸುತ್ತದೆ (ಕ್ರಿ.ಶ. ೧೧೧೭).",
    location: { lat: 13.1623, lng: 75.8596 },
    epoch: "Hoysala Dynasty",
    status: 'normal',
    createdAt: new Date()
  },
  {
    title: "Shravanabelagola Inscription",
    description: "The Tyagada Brahma Pillar inscription. It speaks about the life and virtues of the Ganga minister Chavundaraya.",
    translationKannada: "ಶ್ರವಣಬೆಳಗೊಳ ಶಾಸನ: ಇದು ತ್ಯಾಗದ ಬ್ರಹ್ಮ ಸ್ತಂಭದ ಶಾಸನ. ಗಂಗಾ ಸಚಿವ ಚಾವುಂಡರಾಯನ ಜೀವನ ಮತ್ತು ಗುಣಗಳ ಬಗ್ಗೆ ತಿಳಿಸುತ್ತದೆ.",
    location: { lat: 12.8529, lng: 76.4862 },
    epoch: "Western Ganga Dynasty",
    status: 'normal',
    createdAt: new Date()
  }
];
