import BiologyThumbnailImg from '~/assets/category-thumbnail/biology.png';
import ChemistryThumbnailImg from '~/assets/category-thumbnail/chemistry.png';
import EnglishThumbnailImg from '~/assets/category-thumbnail/english.png';
import GameThumbnailImg from '~/assets/category-thumbnail/game.png';
import GeographyThumbnailImg from '~/assets/category-thumbnail/geography.png';
import HistoryThumbnailImg from '~/assets/category-thumbnail/history.png';
import InformationTechnologyThumbnailImg from '~/assets/category-thumbnail/information-technology.png';
import LiteratureThumbnailImg from '~/assets/category-thumbnail/literature.png';
import MathThumbnailImg from '~/assets/category-thumbnail/math.png';
import MoralityThumbnailImg from '~/assets/category-thumbnail/morality.png';
import PhysicsThumbnailImg from '~/assets/category-thumbnail/physics.png';

export const categories = [
  { title: 'Địa lý', thumbnail: GeographyThumbnailImg, isSubject: true },
  { title: 'Game trắc nghiệm', thumbnail: GameThumbnailImg, isSubject: false },
  { title: 'Giáo dục công dân', thumbnail: MoralityThumbnailImg, isSubject: true },
  { title: 'Hóa học', thumbnail: ChemistryThumbnailImg, isSubject: true },
  { title: 'Lịch sử', thumbnail: HistoryThumbnailImg, isSubject: true },
  { title: 'Ngữ văn', thumbnail: LiteratureThumbnailImg, isSubject: true },
  { title: 'Sinh học', thumbnail: BiologyThumbnailImg, isSubject: true },
  { title: 'Tin học', thumbnail: InformationTechnologyThumbnailImg, isSubject: true },
  { title: 'Tiếng Anh', thumbnail: EnglishThumbnailImg, isSubject: true },
  { title: 'Toán', thumbnail: MathThumbnailImg, isSubject: true },
  { title: 'Vật lý', thumbnail: PhysicsThumbnailImg, isSubject: true }
];
