import { useEffect, useState } from 'react';

import AddCardForm from '../card-add/AddCardForm';
import CompletedCard from '../card-complete/CompletedCardForm';
import CardList from '../card-list/CardList';

import useStepper from '../hooks/useStepper';

const STEPS = ['LIST', 'ADD', 'COMPLETE', 'FINISH'] as const;

export default function CardManage() {
  const [cardId, setCardId] = useState(0);
  const { currentStep, goNextStep, goPrevStep, resetStep } = useStepper();

  const handleClickNextAddCardForm = (id: number) => {
    setCardId(id);
    goNextStep();
  };

  const handleClickNextCompletedCardForm = (id: number) => {
    setCardId(id);
    goNextStep();
    goNextStep();
  };

  useEffect(() => {
    if (STEPS[currentStep] === 'FINISH') {
      resetStep();
    }
  }, [currentStep]);

  if (STEPS[currentStep] === 'LIST') {
    return (
      <CardList
        goNextStep={goNextStep}
        handleClickNextCompletedCardForm={handleClickNextCompletedCardForm}
      />
    );
  }

  if (STEPS[currentStep] === 'ADD') {
    return (
      <AddCardForm
        handleClickNextAddCardForm={handleClickNextAddCardForm}
        goPrevStep={goPrevStep}
      />
    );
  }

  if (STEPS[currentStep] === 'COMPLETE') {
    return <CompletedCard goNextStep={goNextStep} cardId={cardId} />;
  }

  return null;
}
