import { useRef, useState } from 'react';

import Header from './AddCardHeader';
import CardBox from '../CardBox';
import Card from '../Card';
import CardNumber from './CardNumber';
import ExpirationDate from './ExpirationDate';
import OwnerName from './OwnerName';
import SecurityCode from './SecurityCode';
import CardPassword from './CardPassword';
import CardCompanyList from './CardCompanyList';
import Button from '../Button';

import type {
  CardNumberType,
  ExpirationDateType,
  CardPasswordNumberType,
} from '../../types/CardFormType';

import { useCardsContext } from '../hooks/useCardsContext';

import isFulledCardForm from '../../utils/isFulledCardForm';

const cardAlias = '';

type AddCardFormProps = {
  handleClickNextAddCardForm: (id: number) => void;
  goPrevStep: () => void;
};

export default function AddCardForm({
  handleClickNextAddCardForm,
  goPrevStep,
}: AddCardFormProps) {
  const id = useRef(Math.floor(Math.random() * 1_000_000)).current;

  const [cardNumber, setCardNumber] = useState<CardNumberType>({
    firstNumber: '',
    secondNumber: '',
    thirdNumber: '',
    fourthNumber: '',
  });

  const [expirationDate, setExpirationDate] = useState<ExpirationDateType>({
    month: '',
    year: '',
  });

  const [ownerName, setOwnerName] = useState('');

  const [securityCode, setSecurityCode] = useState('');

  const [cardPassword, setCardPassword] = useState<CardPasswordNumberType>({
    firstNumber: '',
    secondNumber: '',
  });

  const [cardCompany, setCardCompany] = useState('');

  const [cardCompanyColor, setCardCompanyColor] = useState('#e5e5e5');

  const { addCardInList } = useCardsContext();

  const isFormFilled = isFulledCardForm({
    cardNumber,
    cardPassword,
    securityCode,
    expirationDate,
  });

  const handleClickNext = () => {
    addCardInList({
      id,
      cardNumber,
      expirationDate,
      ownerName,
      securityCode,
      cardPassword,
      cardCompany,
      cardCompanyColor,
      cardAlias,
    });

    handleClickNextAddCardForm(id);
  };

  return (
    <div className="root">
      <div className="app">
        <Header goPrevStep={goPrevStep} />
        <CardBox backgroundColor={cardCompanyColor}>
          <Card
            variant="small"
            cardNumber={cardNumber}
            ownerName={ownerName}
            expirationDate={expirationDate}
            cardCompany={cardCompany}
          />
        </CardBox>
        <CardNumber cardNumber={cardNumber} setCardNumber={setCardNumber} />
        <ExpirationDate
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
        />
        <OwnerName ownerName={ownerName} setOwnerName={setOwnerName} />
        <SecurityCode
          securityCode={securityCode}
          setSecurityCode={setSecurityCode}
        />
        <CardPassword
          cardPassword={cardPassword}
          setCardPassword={setCardPassword}
        />
        <Button
          type="button"
          text="다음"
          disabled={!isFormFilled}
          onClick={handleClickNext}
        ></Button>
      </div>
      {!cardCompany && (
        <CardCompanyList
          setCardCompany={setCardCompany}
          setCardCompanyColor={setCardCompanyColor}
        />
      )}
    </div>
  );
}
