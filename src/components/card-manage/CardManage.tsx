import { useEffect, useState } from 'react';

import AddCardForm from '../card-add/AddCardForm';
import CompletedCard from '../card-complete/CompletedCardForm';
import CardList from '../card-list/CardList';

import useStepper from '../hooks/useStepper';

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
    if (currentStep === 3) {
      resetStep();
    }
  }, [currentStep]);

  if (currentStep === 0) {
    return (
      <CardList
        goNextStep={goNextStep}
        handleClickNextCompletedCardForm={handleClickNextCompletedCardForm}
      />
    );
  }

  if (currentStep === 1) {
    return (
      <AddCardForm
        handleClickNextAddCardForm={handleClickNextAddCardForm}
        goPrevStep={goPrevStep}
      />
    );
  }

  if (currentStep === 2) {
    return <CompletedCard goNextStep={goNextStep} cardId={cardId} />;
  }

  return null;
}
