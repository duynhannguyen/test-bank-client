import Subjects from './SubMenu/_Subjects';

export const headerMenu = [
  { title: 'Danh mục nổi bật' },
  { title: 'Đề thi theo môn', subMenu: Subjects, subMenuTitle: 'Danh sách môn học' },
  { title: 'Giáo viên' },
  { title: 'Game trắc nghiệm', isHot: true }
];
