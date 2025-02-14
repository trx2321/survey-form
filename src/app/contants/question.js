export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Bạn bao nhiêu tuổi?',
    options: ['18-25 tuổi', '26-35 tuổi', '36-45 tuổi', 'Lớn hơn 55 tuổi'],
    correct: 1, // Chỉ mục của đáp án đúng (Facebook)
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'Bạn muốn hạn mức tín dụng bao nhiêu?',
    options: ['Nhỏ hơn 20 triệu', 'Từ 20-30 triệu', 'Từ 30-50 triệu', 'Lớn hơn 100 triệu'],
  },
  {
    id: 3,
    type: 'input',
    question: 'Nhập thông tin cá nhân của bạn:',
    inputs: [
      { label: 'Họ tên', type: 'text', name: 'hoTen' },
      { label: 'Số điện thoại', type: 'tel', name: 'phone' },
      { label: 'Số căn cước công dân', type: 'text', name: 'soCCCD' },
    ],
  },
];
