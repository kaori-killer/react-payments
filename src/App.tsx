import CardList from './components/card-list/CardList';
import CardsProvider from './context/CardsProvider';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes);

// function Stepper() {
//   const { currentStep, goNextStep, goPrevStep } = useStepper();

//   return (
//     <div>
//       <h2>현재 스텝: {currentStep}</h2>
//       <button onClick={goPrevStep}>이전</button>
//       <button onClick={goNextStep}>다음</button>
//     </div>
//   );
// }

export default function App() {
  return (
    <CardsProvider>
      {/* <StepperProvider> */}
      {/* <Stepper /> */}
      <RouterProvider router={router} />
      {/* </StepperProvider> */}
    </CardsProvider>
  );
}
