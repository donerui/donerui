import { type ICountdownClasses } from './Countdown.types'

export const SplitDigitClasses: ICountdownClasses = {
  className: 'flex items-center',
  partsClassName: '',
  digitClassName: 'relative text-gray-100 text-[6rem] font-bold px-2 py-4 bg-gradient-to-b from-[#2A2A2A] to-black rounded-lg shadow-lg after:content-[\'\'] after:block after:h-[1px] after:border-t-[2px] after:border-gray-300 after:w-full after:absolute after:top-1/2 after:left-0',
  textClassName: '',
  separatorClassName: ''
}

export const SplitDigitClassesNeon = {
  className: 'flex items-center',
  partsClassName: '',
  digitClassName: 'relative text-[#00FFAA] text-[6rem] font-bold px-2 py-4 bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-[0_0_15px_#00FFAA] after:content-[\'\'] after:block after:h-[1px] after:border-t-[2px] after:border-[#00FFAA] after:w-full after:absolute after:top-1/2 after:left-0',
  textClassName: '',
  separatorClassName: ''
}

export const SplitDigitClassesChrome = {
  className: 'flex items-center',
  partsClassName: '',
  digitClassName: 'relative text-gray-50 text-[6rem] font-extrabold px-3 py-5 bg-gradient-to-b from-gray-300 via-gray-600 to-gray-900 rounded-lg shadow-xl after:content-[\'\'] after:block after:h-[2px] after:border-t-[2px] after:border-gray-500 after:w-full after:absolute after:top-1/2 after:left-0',
  textClassName: '',
  separatorClassName: ''
}

export const SplitDigitClassesRetroLED = {
  className: 'flex items-center',
  partsClassName: '',
  digitClassName: 'relative text-red-500 text-[6rem] font-mono px-2 py-3 bg-black rounded-md shadow-md after:content-[\'\'] after:block after:h-[1px] after:border-t-[2px] after:border-red-500 after:w-full after:absolute after:top-1/2 after:left-0',
  textClassName: '',
  separatorClassName: ''
}

export const SplitDigitClassesFire = {
  className: 'flex items-center',
  partsClassName: '',
  digitClassName: 'relative text-orange-500 text-[6rem] font-black px-3 py-4 bg-gradient-to-b from-red-700 to-black rounded-lg shadow-[0_0_15px_#FF4500] after:content-[\'\'] after:block after:h-[1px] after:border-t-[2px] after:border-orange-500 after:w-full after:absolute after:top-1/2 after:left-0',
  textClassName: '',
  separatorClassName: ''
}

export const CountdownClassesCyberpunk = {
  className: 'flex items-center justify-center space-x-2 p-4',
  partsClassName: 'flex items-center space-x-1',
  digitClassName: 'text-[5rem] font-bold text-[#0ff] bg-gray-900 px-4 py-2 rounded-lg shadow-[0_0_20px_#0ff]',
  textClassName: 'text-lg text-[#0ff]',
  separatorClassName: 'text-[4rem] text-gray-500 px-2'
}

export const CountdownClassesFire = {
  className: 'flex items-center justify-center space-x-3 p-6',
  partsClassName: 'flex items-center bg-gradient-to-b from-red-700 to-black rounded-lg shadow-lg p-3',
  digitClassName: 'text-[5rem] font-extrabold text-orange-500 bg-black px-4 py-2 rounded-lg shadow-[0_0_15px_#FF4500]',
  textClassName: 'text-md text-orange-300',
  separatorClassName: 'text-[4rem] text-red-500 px-2'
}

export const SplitDigitClassesAnim = {
  className: '',
  partsClassName: 'display-inline mx-0 my-[5px]',
  digitClassName: 'text-[5rem] font-extrabold text-orange-500 bg-black px-4 py-2 rounded-lg shadow-[0_0_15px_#FF4500]',
  textClassName: 'text-md text-orange-300',
  separatorClassName: 'text-[4rem] text-red-500 px-2'
}
