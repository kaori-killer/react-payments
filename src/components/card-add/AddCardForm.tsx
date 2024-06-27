import { useRef, useState } from 'react';

import Header from './AddCardHeader';
import CardContent from '../CardContent';
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
import CardBox from '../CardBox';
import { isValidDate } from '../../utils/Validation';

import { CARD_COMPANY_LIST } from './CardCompanyListRow';

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

  const [isShowCardCompanyList, setIsShowCardCompanyList] = useState(true);

  const { addCardInList } = useCardsContext();

  const changeCardCompany = () => {
    const firstNumber = Number(cardNumber.firstNumber);
    let companyName = '';

    if (firstNumber < 1249) {
      companyName = '포코';
    } else if (firstNumber < 2499) {
      companyName = '준';
    } else if (firstNumber < 3749) {
      companyName = '현석';
    } else if (firstNumber < 4999) {
      companyName = '윤호';
    } else if (firstNumber < 6249) {
      companyName = '환오';
    } else if (firstNumber < 7499) {
      companyName = '태은';
    } else if (firstNumber < 8749) {
      companyName = '준일';
    } else if (firstNumber < 9999) {
      companyName = '은규';
    }

    setCardCompany(companyName);
    setCardCompanyColor(
      CARD_COMPANY_LIST.filter((company) => company.name === companyName)[0]
        .backgroundColor
    );
  };

  const isFormFilled = isFulledCardForm({
    cardNumber,
    cardPassword,
    securityCode,
    expirationDate,
  });

  const handleClickNext = () => {
    // 어디로 빼야할까
    changeCardCompany();

    if (
      !isValidDate(Number(expirationDate.month), Number(expirationDate.year))
    ) {
      alert('유효기간을 확인해주세요');
      return;
    }

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
          <CardContent
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
      {!cardCompany && isShowCardCompanyList && (
        <CardCompanyList
          setCardCompany={setCardCompany}
          setCardCompanyColor={setCardCompanyColor}
          setIsShowCardCompanyList={setIsShowCardCompanyList}
        />
      )}
    </div>
  );
}
