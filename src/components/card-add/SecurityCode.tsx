import React, { Dispatch, SetStateAction } from 'react';

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
          src="src/assets/securityCode_description_icon.png"
          className="w-10 ml-10"
        />
      </div>
    </div>
  );
}
