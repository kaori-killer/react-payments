import { useEffect, useState } from 'react';
import AddCardForm from '../card-add/AddCardForm';
import CompletedCard from '../card-complete/CompletedCardForm';
import CardList from '../card-list/CardList';
import useStepper from '../hooks/useStepper';

export default function CardManage() {
  const [cardId, setCardId] = useState(0);
  const { currentStep, goNextStep, goPrevStep, resetStep } = useStepper();

  const handleClickAddCardFormNext = (id: number) => {
    setCardId(id);
    goNextStep();
  };

  useEffect(() => {
    if (currentStep === 3) {
      resetStep();
    }
  }, [currentStep]);

  if (currentStep === 0) {
    return <CardList goNextStep={goNextStep} />;
  }

  if (currentStep === 1) {
    return (
      <AddCardForm
        handleClickAddCardFormNext={handleClickAddCardFormNext}
        goPrevStep={goPrevStep}
      />
    );
  }

  if (currentStep === 2) {
    return <CompletedCard goNextStep={goNextStep} cardId={cardId} />;
  }

  return null;
}
