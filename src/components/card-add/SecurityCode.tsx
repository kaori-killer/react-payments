import React, { Dispatch, SetStateAction, useState } from 'react';

import Input from '../Input';

import updateValidValue from '../../utils/updateValidValue';

import { SECURITY_CODE_LIMIT } from '../../constants/cardLimit';

type SecurityCodeProps = {
  securityCode: string;
  setSecurityCode: Dispatch<SetStateAction<string>>;
};

export default function SecurityCode({
  securityCode,
  setSecurityCode,
}: SecurityCodeProps) {
  const [isHover, setIsHover] = useState(false);

  const handleChangeSecurityCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    
    updateValidValue({
      limit: SECURITY_CODE_LIMIT,
      setter: setSecurityCode,
      value,
      isMonth: false,
      isNumber: true,
    });
  };

  return (
    <div className="input-container">
      <span className="input-title">보안코드(CVC/CVV)</span>
      <div className="input-content">
        <Input
          variant="basic"
          className="w-25"
          type="password"
          value={securityCode}
          onChange={handleChangeSecurityCode}
        />
        <img
          src="src/assets/cvc_tooltip.png"
          className="w-10 ml-10"
          onClick={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        />
        {isHover && <p className='tooltip-text ml-10'>카드 뒷면의 3자리를 입력해주세요</p>}
      </div>
    </div>
  );
}
